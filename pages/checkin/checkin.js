const app = getApp()

Page({
  data: {
    currentYear: 2026,
    currentMonth: 3,
    streakDays: 0,
    totalDays: 0,
    monthDays: 31,
    isTodayChecked: false,
    isLoading: false,
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    calendarDays: []
  },

  onLoad: function () {
    this.initDate()
    this.checkLogin()
  },

  onShow: function () {
    if (app.globalData.openid) {
      this.loadCheckInStatus()
    }
  },

  // 初始化日期
  initDate: function () {
    const now = new Date()
    this.setData({
      currentYear: now.getFullYear(),
      currentMonth: now.getMonth() + 1,
      monthDays: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
    })
  },

  // 检查登录
  checkLogin: function () {
    if (!app.globalData.openid) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '需要登录后才能打卡',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            app.wxLogin((success) => {
              if (success) {
                that.loadCheckInStatus()
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
      this.loadCheckInStatus()
    }
  },

  // 加载打卡状态
  loadCheckInStatus: function () {
    const that = this
    wx.showLoading({ title: '加载中...' })

    wx.cloud.callFunction({
      name: 'checkIn',
      data: { action: 'getStatus' }
    }).then(res => {
      wx.hideLoading()
      if (res.result.success) {
        that.setData({
          streakDays: res.result.streakDays,
          totalDays: res.result.totalDays,
          isTodayChecked: res.result.isTodayChecked
        })
        that.generateCalendar(res.result.checkedDates)
      }
    }).catch(err => {
      wx.hideLoading()
      console.error('加载打卡状态失败:', err)
      wx.showToast({ title: '加载失败', icon: 'none' })
    })
  },

  // 生成日历
  generateCalendar: function (checkedDates = []) {
    const { currentYear, currentMonth } = this.data
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
    const firstDayWeek = new Date(currentYear, currentMonth - 1, 1).getDay()
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

    const calendarDays = []

    // 上个月的日期
    const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate()
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthDays - i,
        date: '',
        isOtherMonth: true,
        isToday: false,
        isChecked: false
      })
    }

    // 当前月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      calendarDays.push({
        day: i,
        date: dateStr,
        isOtherMonth: false,
        isToday: dateStr === todayStr,
        isChecked: checkedDates.includes(dateStr)
      })
    }

    // 下个月的日期
    const remainingCells = 42 - calendarDays.length // 6行7列
    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push({
        day: i,
        date: '',
        isOtherMonth: true,
        isToday: false,
        isChecked: false
      })
    }

    this.setData({ calendarDays })
  },

  // 执行打卡
  doCheckIn: function () {
    if (this.data.isTodayChecked || this.data.isLoading) return

    const that = this
    this.setData({ isLoading: true })

    wx.cloud.callFunction({
      name: 'checkIn',
      data: { action: 'checkIn' }
    }).then(res => {
      that.setData({ isLoading: false })
      
      if (res.result.success) {
        wx.showToast({
          title: res.result.isFirstCheckIn ? '打卡成功' : `连续${res.result.streakDays}天`,
          icon: 'success'
        })
        
        that.setData({
          isTodayChecked: true,
          streakDays: res.result.streakDays
        })
        
        // 刷新日历
        that.loadCheckInStatus()
        
        // 更新本地存储的连续天数
        wx.setStorageSync('streakDays', res.result.streakDays)
      } else {
        if (res.result.isAlreadyChecked) {
          that.setData({ isTodayChecked: true })
        }
        wx.showToast({ title: res.result.message, icon: 'none' })
      }
    }).catch(err => {
      that.setData({ isLoading: false })
      console.error('打卡失败:', err)
      wx.showToast({ title: '打卡失败', icon: 'none' })
    })
  },

  // 页面分享
  onShareAppMessage: function () {
    const { streakDays } = this.data
    return {
      title: streakDays > 0 
        ? `我已连续打卡${streakDays}天，坚持学习每一天！`
        : '每日打卡，养成学习习惯！',
      path: '/pages/checkin/checkin?from=share'
    }
  }
})
