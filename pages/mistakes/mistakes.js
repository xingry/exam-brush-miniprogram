const app = getApp()

Page({
  data: {
    filter: 'all',
    totalMistakes: 0,
    masteredCount: 0,
    reviewToday: 0,
    mistakes: [],
    isLoading: false,
    categoryMap: {
      'network': '网络基础',
      'database': '数据库',
      'security': '网络安全',
      'system': '操作系统',
      'server': '服务器配置'
    }
  },

  onLoad: function () {
    this.checkLogin()
  },

  onShow: function () {
    if (app.globalData.openid) {
      this.loadMistakes()
    }
  },

  // 检查登录状态
  checkLogin: function() {
    if (!app.globalData.openid) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '需要登录后才能查看错题本',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            app.wxLogin((success) => {
              if (success) {
                that.loadMistakes()
              } else {
                wx.navigateBack()
              }
            })
          } else {
            wx.navigateBack()
          }
        }
      })
    } else {
      this.loadMistakes()
    }
  },

  // 从云数据库加载错题
  loadMistakes: function () {
    const that = this
    this.setData({ isLoading: true })

    wx.showLoading({ title: '加载中...' })

    const category = this.data.filter === 'all' ? 'all' : this.data.filter

    wx.cloud.callFunction({
      name: 'getMistakes',
      data: { 
        category: category,
        limit: 100
      }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success) {
        const mistakes = res.result.data.map(item => ({
          id: item._id,
          questionId: item.questionId,
          type: that.data.categoryMap[item.category] || item.category || '网络基础',
          category: item.category || 'network',
          question: item.question?.question || '题目加载失败',
          wrongCount: item.wrongCount || 1,
          date: that.formatDate(item.lastWrongTime),
          mastered: item.isMastered || false
        }))

        const stats = res.result.stats
        const todayStr = new Date().toISOString().split('T')[0]
        const todayCount = mistakes.filter(m => m.date === todayStr).length

        that.setData({
          mistakes: mistakes,
          totalMistakes: stats.total,
          masteredCount: stats.mastered,
          reviewToday: todayCount,
          isLoading: false
        })
      } else {
        that.setData({ isLoading: false })
        wx.showToast({ title: '加载失败', icon: 'none' })
      }
    }).catch(err => {
      wx.hideLoading()
      console.error('加载错题失败:', err)
      that.setData({ isLoading: false })
      wx.showToast({ title: '加载失败', icon: 'none' })
    })
  },

  // 格式化日期
  formatDate: function(dateObj) {
    if (!dateObj) return ''
    const date = new Date(dateObj)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  setFilter: function (e) {
    const filter = e.currentTarget.dataset.type
    this.setData({ filter })
    this.loadMistakes()
  },

  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item
    // 跳转到刷题页，只复习这道错题
    wx.navigateTo({
      url: `/pages/practice/practice?reviewId=${item.questionId}`
    })
  },

  reviewNow: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/practice/practice?reviewId=${id}`
    })
  },

  // 删除错题
  removeMistake: function (e) {
    const id = e.currentTarget.dataset.id
    const that = this

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这道错题吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中...' })

          wx.cloud.callFunction({
            name: 'deleteMistake',
            data: { mistakeId: id }
          }).then(res => {
            wx.hideLoading()
            if (res.result.success) {
              wx.showToast({ title: '已删除', icon: 'success' })
              // 刷新列表
              that.loadMistakes()
            } else {
              wx.showToast({ title: '删除失败', icon: 'none' })
            }
          }).catch(err => {
            wx.hideLoading()
            console.error('删除失败:', err)
            wx.showToast({ title: '删除失败', icon: 'none' })
          })
        }
      }
    })
  },

  // 复习全部错题
  reviewAll: function () {
    const { totalMistakes } = this.data
    if (totalMistakes === 0) {
      wx.showToast({ title: '暂无错题', icon: 'none' })
      return
    }

    wx.navigateTo({
      url: '/pages/practice/practice?type=mistakes'
    })
  }
})
