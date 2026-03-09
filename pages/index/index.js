Page({
  data: {
    nickName: '',
    today: '',
    progress: 0,
    finishedCount: 0,
    targetCount: 20
  },

  onLoad: function () {
    this.initDate()
    this.loadUserInfo()
    this.loadProgress()
  },

  initDate: function () {
    const today = new Date()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    const weekday = weekdays[today.getDay()]
    this.setData({
      today: `${month}月${date}日 周${weekday}`
    })
  },

  loadUserInfo: function () {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ nickName: userInfo.nickName })
    }
  },

  loadProgress: function () {
    const finished = wx.getStorageSync('todayFinished') || 0
    const progress = Math.min((finished / this.data.targetCount) * 100, 100)
    this.setData({
      finishedCount: finished,
      progress: progress
    })
  },

  goToPractice: function (e) {
    const type = e.currentTarget.dataset.type || 'random'
    wx.navigateTo({
      url: `/pages/practice/practice?type=${type}`
    })
  },

  goToMistakes: function () {
    wx.navigateTo({
      url: '/pages/mistakes/mistakes'
    })
  },

  goToDailyCheck: function () {
    wx.showToast({
      title: '功能开发中...',
      icon: 'none'
    })
  },

  goToProfile: function () {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  }
})
