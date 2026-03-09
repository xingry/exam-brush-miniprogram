Page({
  data: {
    nickName: '',
    avatarUrl: '',
    openid: '',
    totalQuestions: 0,
    correctRate: 0,
    streakDays: 0,
    totalMistakes: 0,
    weekData: [
      { day: '一', count: 15, height: 60 },
      { day: '二', count: 28, height: 100 },
      { day: '三', count: 10, height: 40 },
      { day: '四', count: 35, height: 120 },
      { day: '五', count: 22, height: 80 },
      { day: '六', count: 40, height: 140 },
      { day: '日', count: 18, height: 70 }
    ]
  },

  onLoad: function () {
    this.loadUserInfo()
    this.loadStats()
  },

  loadUserInfo: function () {
    const userInfo = wx.getStorageSync('userInfo')
    const openid = wx.getStorageSync('openid')
    
    if (userInfo) {
      this.setData({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      })
    }
    
    if (openid) {
      this.setData({ openid })
    }
  },

  loadStats: function () {
    // TODO: 从云数据库加载统计数据
    const totalQuestions = wx.getStorageSync('totalQuestions') || 188
    const totalMistakes = wx.getStorageSync('totalMistakes') || 23
    const correctRate = Math.round((1 - totalMistakes / totalQuestions) * 100) || 85
    const streakDays = wx.getStorageSync('streakDays') || 7

    this.setData({
      totalQuestions,
      correctRate,
      streakDays,
      totalMistakes
    })
  },

  shareApp: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  feedback: function () {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },

  about: function () {
    wx.showModal({
      title: '关于我们',
      content: '计算机考证刷题小程序 v1.0.0\n\n专为高职学生打造的刷题工具，帮助你高效备考计算机类专业证书。\n\n开发者：大圣工作室',
      showCancel: false
    })
  }
})
