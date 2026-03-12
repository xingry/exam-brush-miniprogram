const app = getApp()

Page({
  data: {
    feedbackTypes: [
      { value: 'bug', label: '功能异常', icon: '🐛' },
      { value: 'feature', label: '功能建议', icon: '💡' },
      { value: 'content', label: '内容问题', icon: '📝' },
      { value: 'ui', label: '界面优化', icon: '🎨' },
      { value: 'performance', label: '性能问题', icon: '⚡' },
      { value: 'other', label: '其他反馈', icon: '📌' }
    ],
    selectedType: 'bug',
    content: '',
    contact: '',
    canSubmit: false,
    isSubmitting: false,
    faqOpen: [false, false, false]
  },

  onLoad: function () {
    this.checkLogin()
  },

  // 检查登录
  checkLogin: function () {
    if (!app.globalData.openid) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '需要登录后才能提交反馈',
        confirmText: '去登录',
        success: res => {
          if (res.confirm) {
            app.wxLogin((success) => {
              if (!success) {
                wx.navigateBack()
              }
            })
          } else {
            wx.navigateBack()
          }
        }
      })
    }
  },

  // 选择反馈类型
  selectType: function (e) {
    this.setData({
      selectedType: e.currentTarget.dataset.value
    })
  },

  // 输入反馈内容
  onContentInput: function (e) {
    const content = e.detail.value
    this.setData({
      content: content,
      canSubmit: content.trim().length > 0
    })
  },

  // 输入联系方式
  onContactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  // 提交反馈
  submitFeedback: function () {
    if (!this.data.canSubmit || this.data.isSubmitting) return

    const that = this
    this.setData({ isSubmitting: true })

    wx.showLoading({ title: '提交中...', mask: true })

    wx.cloud.callFunction({
      name: 'submitFeedback',
      data: {
        type: this.data.selectedType,
        content: this.data.content,
        contact: this.data.contact
      }
    }).then(res => {
      wx.hideLoading()
      that.setData({ isSubmitting: false })

      if (res.result.success) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({
          title: res.result.message || '提交失败',
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      that.setData({ isSubmitting: false })
      console.error('提交反馈失败:', err)
      wx.showToast({
        title: '提交失败，请稍后重试',
        icon: 'none'
      })
    })
  },

  // 展开/收起 FAQ
  toggleFaq: function (e) {
    const index = e.currentTarget.dataset.index
    const faqOpen = this.data.faqOpen
    faqOpen[index] = !faqOpen[index]
    this.setData({ faqOpen })
  }
})
