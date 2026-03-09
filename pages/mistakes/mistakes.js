Page({
  data: {
    filter: 'all',
    totalMistakes: 0,
    masteredCount: 0,
    reviewToday: 0,
    mistakes: []
  },

  onLoad: function () {
    this.loadMistakes()
  },

  onShow: function () {
    this.loadMistakes()
  },

  loadMistakes: function () {
    // TODO: 从云数据库加载错题
    // 这里是示例数据
    const mockMistakes = [
      {
        id: 1,
        type: '网络基础',
        question: 'OSI 七层模型中，负责路由选择的是哪一层？',
        wrongCount: 2,
        date: '2026-03-09',
        mastered: false
      },
      {
        id: 2,
        type: '网络基础',
        question: 'TCP/IP 协议中，HTTP 协议默认使用的端口是？',
        wrongCount: 1,
        date: '2026-03-09',
        mastered: false
      },
      {
        id: 3,
        type: '数据库',
        question: 'SQL 中，用于查询数据的关键字是？',
        wrongCount: 3,
        date: '2026-03-08',
        mastered: false
      }
    ]

    const total = mockMistakes.length
    const mastered = mockMistakes.filter(m => m.mastered).length
    const today = mockMistakes.filter(m => m.date === '2026-03-09').length

    this.setData({
      mistakes: mockMistakes,
      totalMistakes: total,
      masteredCount: mastered,
      reviewToday: today
    })
  },

  setFilter: function (e) {
    const filter = e.currentTarget.dataset.type
    this.setData({ filter })
    this.loadMistakes()
  },

  viewDetail: function (e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/practice/practice?reviewId=${item.id}`
    })
  },

  reviewNow: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/practice/practice?reviewId=${id}`
    })
  },

  removeMistake: function (e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这道错题吗？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 从数据库删除
          this.loadMistakes()
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  reviewAll: function () {
    wx.navigateTo({
      url: '/pages/practice/practice?mode=review'
    })
  }
})
