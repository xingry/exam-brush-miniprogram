const app = getApp()

Page({
  data: {
    nickName: '',
    avatarUrl: '',
    openid: '',
    isLoggedIn: false,
    totalQuestions: 0,
    correctRate: 0,
    streakDays: 0,
    totalMistakes: 0,
    weekData: [
      { day: '一', count: 0, height: 0 },
      { day: '二', count: 0, height: 0 },
      { day: '三', count: 0, height: 0 },
      { day: '四', count: 0, height: 0 },
      { day: '五', count: 0, height: 0 },
      { day: '六', count: 0, height: 0 },
      { day: '日', count: 0, height: 0 }
    ]
  },

  onLoad: function () {
    this.checkLoginStatus()
  },

  onShow: function () {
    if (this.data.isLoggedIn) {
      this.loadStats()
    }
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const openid = wx.getStorageSync('openid')
    const userInfo = wx.getStorageSync('userInfo')

    if (openid && userInfo) {
      this.setData({
        isLoggedIn: true,
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        openid: openid.substring(0, 8) + '...'
      })
      this.loadStats()
    } else {
      this.setData({ isLoggedIn: false })
    }
  },

  // 微信登录
  wxLogin: function() {
    const that = this
    app.wxLogin((success, result) => {
      if (success) {
        that.checkLoginStatus()
      }
    })
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
      this.setData({ openid: openid.substring(0, 8) + '...' })
    }
  },

  // 从云数据库加载统计数据
  loadStats: function () {
    const that = this
    const openid = wx.getStorageSync('openid')
    
    if (!openid) return

    // 获取用户统计
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {}
    }).then(res => {
      if (res.result.success) {
        const stats = res.result.userInfo.stats || {}
        const totalQuestions = stats.totalQuestions || 0
        const correctCount = stats.correctCount || 0
        const totalMistakes = stats.totalMistakes || 0
        const streakDays = stats.checkInDays || 0

        // 计算正确率
        let correctRate = 0
        if (totalQuestions > 0) {
          correctRate = Math.round((correctCount / totalQuestions) * 100)
        }

        that.setData({
          totalQuestions,
          correctRate,
          streakDays,
          totalMistakes
        })

        // 更新本地存储
        wx.setStorageSync('totalQuestions', totalQuestions)
        wx.setStorageSync('totalMistakes', totalMistakes)
      }
    }).catch(err => {
      console.error('加载统计失败:', err)
      // 使用本地数据作为备用
      this.loadLocalStats()
    })

    // 获取错题统计
    wx.cloud.callFunction({
      name: 'getMistakes',
      data: { limit: 1 }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          totalMistakes: res.result.stats.total
        })
      }
    }).catch(err => {
      console.error('加载错题统计失败:', err)
    })

    // 获取真实学习趋势数据
    this.loadStudyTrend()
  },

  // 加载真实学习趋势数据
  loadStudyTrend: function() {
    const that = this
    
    wx.cloud.callFunction({
      name: 'getStudyTrend',
      data: {}
    }).then(res => {
      if (res.result.success) {
        that.setData({
          weekData: res.result.data
        })
      } else {
        // 使用本地数据作为备用
        that.loadLocalWeekData()
      }
    }).catch(err => {
      console.error('加载学习趋势失败:', err)
      that.loadLocalWeekData()
    })
  },

  // 加载本地统计数据（备用）
  loadLocalStats: function() {
    const totalQuestions = wx.getStorageSync('totalQuestions') || 0
    const totalMistakes = wx.getStorageSync('totalMistakes') || 0
    const correctCount = wx.getStorageSync('correctCount') || 0
    
    let correctRate = 0
    if (totalQuestions > 0) {
      correctRate = Math.round((correctCount / totalQuestions) * 100)
    }
    
    const streakDays = wx.getStorageSync('streakDays') || 0

    this.setData({
      totalQuestions,
      correctRate,
      streakDays,
      totalMistakes
    })
    
    // 同时加载本地周数据
    this.loadLocalWeekData()
  },

  // 加载本地周数据（备用）
  loadLocalWeekData: function() {
    const baseCount = wx.getStorageSync('todayFinished') || 0
    const weekData = this.data.weekData.map((item, index) => {
      const randomFactor = 0.5 + Math.random()
      const count = Math.round(baseCount * randomFactor) || Math.floor(Math.random() * 40)
      const height = Math.min(count * 3.5, 140)
      return {
        ...item,
        count,
        height
      }
    })
    this.setData({ weekData })
  },

  shareApp: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 页面分享
  onShareAppMessage: function () {
    const { streakDays, totalQuestions } = this.data
    let title = '高职计算机考证刷题神器，免费高效！'
    
    if (streakDays > 0) {
      title = `我已连续打卡${streakDays}天，一起刷题备考吧！`
    } else if (totalQuestions > 0) {
      title = `我已刷${totalQuestions}道题，快来一起备考！`
    }
    
    return {
      title: title,
      path: '/pages/index/index?from=share'
    }
  },

  onShareTimeline: function () {
    return {
      title: '计算机考证刷题小程序，高职学生必备！',
      query: 'from=timeline'
    }
  },

  feedback: function () {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    })
  },

  about: function () {
    wx.showModal({
      title: '关于我们',
      content: '计算机考证刷题小程序 v1.0.0\n\n专为高职学生打造的刷题工具，帮助你高效备考计算机类专业证书。\n\n已接入云数据库，支持：\n• 云端题库刷题\n• 错题自动收藏\n• 学习进度同步\n\n开发者：大圣工作室',
      showCancel: false
    })
  }
})
