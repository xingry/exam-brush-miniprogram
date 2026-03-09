Page({
  data: {
    current: 0,
    total: 10,
    questionType: '单选题',
    selected: -1,
    showAnswer: false,
    isCorrect: false,
    correctIndex: 0,
    currentQuestion: {
      question: 'OSI 七层模型中，负责路由选择的是哪一层？',
      options: ['物理层', '数据链路层', '网络层', '传输层'],
      explanation: '网络层（Network Layer）负责数据包的路由选择和转发，主要协议包括 IP、ICMP 等。'
    }
  },

  onLoad: function (options) {
    this.loadQuestion()
  },

  loadQuestion: function () {
    // TODO: 从云数据库加载题目
    // 这里是示例数据
    const questions = [
      {
        question: 'OSI 七层模型中，负责路由选择的是哪一层？',
        options: ['物理层', '数据链路层', '网络层', '传输层'],
        answer: 2,
        explanation: '网络层（Network Layer）负责数据包的路由选择和转发，主要协议包括 IP、ICMP 等。'
      },
      {
        question: 'TCP/IP 协议中，HTTP 协议默认使用的端口是？',
        options: ['21', '22', '80', '443'],
        answer: 2,
        explanation: 'HTTP 协议默认使用 80 端口，HTTPS 使用 443 端口。'
      },
      {
        question: '下列哪个 IP 地址属于 C 类地址？',
        options: ['10.0.0.1', '172.16.0.1', '192.168.1.1', '224.0.0.1'],
        answer: 2,
        explanation: 'C 类地址范围是 192.0.0.0 - 223.255.255.255，192.168.x.x 是常用的 C 类私有地址。'
      }
    ]

    const question = questions[this.data.current % questions.length]
    this.setData({
      currentQuestion: {
        question: question.question,
        options: question.options,
        explanation: question.explanation
      },
      correctIndex: question.answer
    })
  },

  selectOption: function (e) {
    if (this.data.showAnswer) return
    
    const index = e.currentTarget.dataset.index
    this.setData({ selected: index })
  },

  submitAnswer: function () {
    if (this.data.selected === -1) return

    const isCorrect = this.data.selected === this.data.correctIndex
    this.setData({
      showAnswer: true,
      isCorrect: isCorrect
    })

    // 保存答题记录
    this.saveProgress(isCorrect)
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
      this.loadQuestion()
    } else {
      wx.showModal({
        title: '练习完成',
        content: `本次练习完成！共答对 ${this.calculateScore()} 题`,
        showCancel: false,
        success: () => {
          wx.navigateBack()
        }
      })
    }
  },

  collectMistake: function () {
    // TODO: 收藏到错题本
    wx.showToast({
      title: '已加入错题本',
      icon: 'success'
    })
  },

  saveProgress: function (isCorrect) {
    // TODO: 保存到云数据库
    console.log('答题结果:', isCorrect ? '正确' : '错误')
  },

  calculateScore: function () {
    // TODO: 计算得分
    return 8
  }
})
