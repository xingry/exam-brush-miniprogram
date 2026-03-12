const app = getApp()

Page({
  data: {
    current: 0,
    total: 20,
    questionType: '单选题',
    selected: -1,
    showAnswer: false,
    isCorrect: false,
    correctIndex: 0,
    questions: [],
    currentQuestion: {
      question: '',
      options: [],
      explanation: ''
    },
    correctCount: 0,
    wrongCount: 0,
    isLoading: true,
    practiceType: 'random'
  },

  onLoad: function (options) {
    const type = options.type || 'random'
    this.setData({ practiceType: type })
    
    // 检查登录状态
    if (!app.globalData.openid) {
      this.handleLogin(() => {
        this.loadQuestions(type)
      })
    } else {
      this.loadQuestions(type)
    }
  },

  // 处理登录
  handleLogin: function(callback) {
    const that = this
    wx.showModal({
      title: '提示',
      content: '需要登录后才能刷题',
      confirmText: '去登录',
      success: res => {
        if (res.confirm) {
          app.wxLogin((success) => {
            if (success && callback) {
              callback()
            } else if (!success) {
              wx.navigateBack()
            }
          })
        } else {
          wx.navigateBack()
        }
      }
    })
  },

  // 从云数据库加载题目
  loadQuestions: function(type) {
    const that = this
    this.setData({ isLoading: true })

    wx.showLoading({ title: '加载中...' })

    // 如果是错题复习模式
    if (type === 'mistakes') {
      this.loadMistakeQuestions()
      return
    }

    // 调用云函数获取题目
    wx.cloud.callFunction({
      name: 'getQuestions',
      data: {
        type: type === 'random' ? 'all' : type,
        limit: this.data.total
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success && res.result.data.length > 0) {
        const questions = res.result.data
        that.setData({
          questions: questions,
          total: questions.length,
          isLoading: false
        }, () => {
          that.loadCurrentQuestion()
        })
      } else {
        // 如果没有题目数据，提示先导入题库
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '题库暂无数据，是否导入示例题库？',
          success: res => {
            if (res.confirm) {
              that.importQuestions()
            } else {
              wx.navigateBack()
            }
          }
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.error('加载题目失败:', err)
      wx.showToast({ title: '加载失败', icon: 'none' })
      that.setData({ isLoading: false })
    })
  },

  // 加载错题
  loadMistakeQuestions: function() {
    const that = this
    wx.cloud.callFunction({
      name: 'getMistakes',
      data: { limit: 50 }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success && res.result.data.length > 0) {
        const questions = res.result.data.map(item => ({
          _id: item.questionId,
          ...item.question,
          mistakeId: item._id
        }))
        that.setData({
          questions: questions,
          total: questions.length,
          isLoading: false
        }, () => {
          that.loadCurrentQuestion()
        })
      } else {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '暂无错题，先去刷题吧~',
          showCancel: false,
          success: () => {
            wx.navigateBack()
          }
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.error('加载错题失败:', err)
      that.setData({ isLoading: false })
    })
  },

  // 导入示例题库
  importQuestions: function() {
    const that = this
    wx.showLoading({ title: '导入中...', mask: true })
    
    wx.cloud.callFunction({
      name: 'batchImportQuestions'
    }).then(res => {
      wx.hideLoading()
      if (res.result.success) {
        wx.showToast({
          title: res.result.message,
          icon: 'none',
          duration: 2000
        })
        // 重新加载题目
        setTimeout(() => {
          that.loadQuestions(that.data.practiceType)
        }, 1500)
      } else {
        wx.showToast({ title: '导入失败', icon: 'none' })
      }
    }).catch(err => {
      wx.hideLoading()
      console.error('导入失败:', err)
      wx.showToast({ title: '导入失败', icon: 'none' })
    })
  },

  // 加载当前题目
  loadCurrentQuestion: function() {
    const { questions, current } = this.data
    if (questions.length === 0) return

    const question = questions[current]
    this.setData({
      currentQuestion: {
        _id: question._id,
        question: question.question,
        options: question.options,
        explanation: question.analysis || question.explanation
      },
      correctIndex: question.correctAnswer !== undefined ? question.correctAnswer : question.answer,
      selected: -1,
      showAnswer: false
    })
  },

  selectOption: function (e) {
    if (this.data.showAnswer) return
    
    const index = e.currentTarget.dataset.index
    this.setData({ selected: index })
  },

  submitAnswer: function () {
    if (this.data.selected === -1) {
      wx.showToast({ title: '请先选择答案', icon: 'none' })
      return
    }

    const isCorrect = this.data.selected === this.data.correctIndex
    this.setData({
      showAnswer: true,
      isCorrect: isCorrect
    })

    // 更新统计
    if (isCorrect) {
      this.setData({ correctCount: this.data.correctCount + 1 })
    } else {
      this.setData({ wrongCount: this.data.wrongCount + 1 })
      // 自动收藏错题
      this.collectMistake()
    }

    // 保存进度到云端
    this.saveProgress(isCorrect)
    this.updateLocalStats(isCorrect)
  },

  nextQuestion: function () {
    const finished = wx.getStorageSync('todayFinished') || 0
    wx.setStorageSync('todayFinished', finished + 1)

    if (this.data.current < this.data.total - 1) {
      this.setData({
        current: this.data.current + 1,
        selected: -1,
        showAnswer: false
      })
      this.loadCurrentQuestion()
    } else {
      // 练习完成
      this.showResult()
    }
  },

  // 显示练习结果
  showResult: function() {
    const { correctCount, total } = this.data
    const accuracy = Math.round((correctCount / total) * 100)
    
    wx.showModal({
      title: '练习完成',
      content: `共答${total}题，答对${correctCount}题，正确率${accuracy}%`,
      showCancel: false,
      success: () => {
        wx.navigateBack()
      }
    })
  },

  // 自动收藏错题
  collectMistake: function () {
    const { currentQuestion, selected, correctIndex } = this.data
    
    wx.cloud.callFunction({
      name: 'saveMistake',
      data: {
        questionId: currentQuestion._id,
        question: {
          question: currentQuestion.question,
          options: currentQuestion.options,
          category: this.data.practiceType === 'mistakes' ? 'network' : this.data.practiceType
        },
        selectedAnswer: selected,
        correctAnswer: correctIndex
      }
    }).then(res => {
      if (res.result.success) {
        console.log('错题已保存:', res.result.message)
      }
    }).catch(err => {
      console.error('保存错题失败:', err)
    })
  },

  // 保存答题进度到云端
  saveProgress: function (isCorrect) {
    const { currentQuestion, practiceType } = this.data
    
    wx.cloud.callFunction({
      name: 'updateUserStats',
      data: {
        questionId: currentQuestion._id,
        isCorrect: isCorrect,
        category: practiceType
      }
    }).then(res => {
      console.log('统计更新:', res.result)
    }).catch(err => {
      console.error('更新统计失败:', err)
    })
  },

  // 更新本地统计
  updateLocalStats: function(isCorrect) {
    const totalKey = 'totalQuestions'
    const correctKey = 'correctCount'
    
    const total = wx.getStorageSync(totalKey) || 0
    const correct = wx.getStorageSync(correctKey) || 0
    
    wx.setStorageSync(totalKey, total + 1)
    if (isCorrect) {
      wx.setStorageSync(correctKey, correct + 1)
    }
  },

  calculateScore: function () {
    const { correctCount, total } = this.data
    return Math.round((correctCount / total) * 100)
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: `我在刷计算机考证题，正确率${this.data.correctCount}/${this.data.current + 1}！`,
      path: '/pages/index/index'
    }
  }
})
