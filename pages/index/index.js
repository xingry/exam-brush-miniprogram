const app = getApp()

Page({
  data: {
    nickName: '',
    today: '',
    progress: 0,
    finishedCount: 0,
    targetCount: 20,
    isLoggedIn: false
  },

  onLoad: function () {
    this.initDate()
    this.checkLoginStatus()
    this.loadProgress()
  },

  onShow: function() {
    // 每次显示页面时刷新进度
    this.loadProgress()
    this.checkLoginStatus()
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

  // 检查登录状态
  checkLoginStatus: function() {
    const openid = wx.getStorageSync('openid')
    const userInfo = wx.getStorageSync('userInfo')
    
    if (openid && userInfo) {
      this.setData({
        isLoggedIn: true,
        nickName: userInfo.nickName || '微信用户'
      })
    } else {
      this.setData({
        isLoggedIn: false,
        nickName: '未登录'
      })
    }
  },

  // 微信登录
  wxLogin: function() {
    const that = this
    app.wxLogin((success) => {
      if (success) {
        that.checkLoginStatus()
      }
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
    // 检查登录状态
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '需要登录后才能刷题',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            this.wxLogin()
          }
        }
      })
      return
    }

    const type = e.currentTarget.dataset.type || 'random'
    wx.navigateTo({
      url: `/pages/practice/practice?type=${type}`
    })
  },

  goToMistakes: function () {
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '需要登录后才能查看错题本',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            this.wxLogin()
          }
        }
      })
      return
    }

    wx.navigateTo({
      url: '/pages/mistakes/mistakes'
    })
  },

  goToDailyCheck: function () {
    if (!this.data.isLoggedIn) {
      wx.showModal({
        title: '提示',
        content: '需要登录后才能打卡',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            this.wxLogin()
          }
        }
      })
      return
    }

    wx.navigateTo({
      url: '/pages/checkin/checkin'
    })
  },

  goToProfile: function () {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  },

  // 分享到朋友圈/好友
  onShareAppMessage: function () {
    return {
      title: '高职计算机考证刷题神器，免费高效！',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.png' // 分享封面图
    }
  },

  onShareTimeline: function () {
    return {
      title: '我在用计算机考证刷题小程序，一起备考吧！',
      query: 'from=timeline'
    }
  }
})
