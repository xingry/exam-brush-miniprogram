App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-0g2wucle222c5442', // 云环境 ID
        traceUser: true,
      })
    }

    // 检查登录状态
    this.checkLoginStatus()
    this.globalData = {}
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
      console.log('已登录，openid:', openid)
    }
  },

  // 微信登录 - 必须在按钮点击的同步上下文中调用 wx.getUserProfile
  wxLogin: function(callback) {
    const that = this
    
    // 注意：wx.getUserProfile 必须在同步上下文中调用，不能放在任何回调中
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (userRes) => {
        const userInfo = userRes.userInfo
        wx.showLoading({ title: '登录中...', mask: true })
        
        // 获取登录凭证
        wx.login({
          success: (res) => {
            if (res.code) {
              console.log('获取到登录 code:', res.code)
              // 调用云函数获取/创建用户信息
              wx.cloud.callFunction({
                name: 'getUserInfo',
                data: { 
                  userInfo: userInfo,
                  code: res.code  // 传递 code 给云函数
                }
              }).then(result => {
                wx.hideLoading()
                console.log('云函数返回:', result)
                if (result.result && result.result.success) {
                  const { openid, userInfo: cloudUserInfo, isNew } = result.result
                  that.globalData.openid = openid
                  that.globalData.userInfo = cloudUserInfo
                  wx.setStorageSync('openid', openid)
                  wx.setStorageSync('userInfo', cloudUserInfo)
                  
                  wx.showToast({
                    title: isNew ? '登录成功' : '欢迎回来',
                    icon: 'success'
                  })
                  
                  if (callback) callback(true, result.result)
                } else {
                  const msg = result.result ? result.result.message : '登录失败'
                  wx.showToast({ title: msg, icon: 'none' })
                  if (callback) callback(false)
                }
              }).catch(err => {
                wx.hideLoading()
                console.error('云函数调用失败:', err)
                wx.showToast({ title: '登录失败', icon: 'none' })
                if (callback) callback(false)
              })
            } else {
              wx.hideLoading()
              console.error('wx.login 失败:', res)
              wx.showToast({ title: '登录失败', icon: 'none' })
              if (callback) callback(false)
            }
          },
          fail: (err) => {
            wx.hideLoading()
            console.error('wx.login 调用失败:', err)
            wx.showToast({ title: '登录失败', icon: 'none' })
            if (callback) callback(false)
          }
        })
      },
      fail: (err) => {
        console.error('获取用户信息失败:', err)
        // 用户拒绝授权
        if (err.errMsg && err.errMsg.includes('deny')) {
          wx.showToast({ title: '请授权登录以使用完整功能', icon: 'none' })
        } else {
          wx.showToast({ title: '请授权登录', icon: 'none' })
        }
        if (callback) callback(false)
      }
    })
  },

  // 备用登录方式 - 使用 getUserInfo（基础版本，新用户可能无法使用）
  wxLoginLegacy: function(callback) {
    const that = this
    wx.showLoading({ title: '登录中...', mask: true })
    
    wx.login({
      success: res => {
        if (res.code) {
          // 尝试使用 getUserInfo（可能返回匿名数据）
          wx.getUserInfo({
            success: userRes => {
              const userInfo = userRes.userInfo
              that.completeLogin(userInfo, callback)
            },
            fail: () => {
              // 使用默认信息登录
              that.completeLogin({
                nickName: '微信用户',
                avatarUrl: ''
              }, callback)
            }
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({ title: '登录失败', icon: 'none' })
        if (callback) callback(false)
      }
    })
  },

  // 完成登录流程
  completeLogin: function(userInfo, callback) {
    const that = this
    
    wx.cloud.callFunction({
      name: 'getUserInfo',
      data: { userInfo }
    }).then(result => {
      wx.hideLoading()
      if (result.result.success) {
        const { openid, userInfo: cloudUserInfo, isNew } = result.result
        that.globalData.openid = openid
        that.globalData.userInfo = cloudUserInfo
        wx.setStorageSync('openid', openid)
        wx.setStorageSync('userInfo', cloudUserInfo)
        
        wx.showToast({
          title: isNew ? '登录成功' : '欢迎回来',
          icon: 'success'
        })
        
        if (callback) callback(true, result.result)
      } else {
        wx.showToast({ title: '登录失败', icon: 'none' })
        if (callback) callback(false)
      }
    }).catch(err => {
      wx.hideLoading()
      console.error('云函数调用失败:', err)
      wx.showToast({ title: '登录失败', icon: 'none' })
      if (callback) callback(false)
    })
  },

  globalData: {
    userInfo: null,
    openid: null
  }
})
