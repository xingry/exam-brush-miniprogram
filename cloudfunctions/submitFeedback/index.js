// 云函数：提交意见反馈
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { type, content, contact } = event
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '用户未登录'
    }
  }

  if (!content || content.trim().length === 0) {
    return {
      success: false,
      message: '反馈内容不能为空'
    }
  }

  if (content.length > 500) {
    return {
      success: false,
      message: '反馈内容不能超过500字'
    }
  }

  try {
    // 获取用户信息
    const userResult = await db.collection('users').where({ _openid: OPENID }).get()
    const userInfo = userResult.data && userResult.data[0] ? userResult.data[0] : {}

    await db.collection('feedbacks').add({
      data: {
        _openid: OPENID,
        type: type || 'other',
        content: content.trim(),
        contact: contact || '',
        userInfo: {
          nickName: userInfo.nickName || '',
          avatarUrl: userInfo.avatarUrl || ''
        },
        status: 'pending', // pending, processing, resolved
        createTime: db.serverDate(),
        updateTime: db.serverDate(),
        reply: '',
        replyTime: null
      }
    })

    return {
      success: true,
      message: '反馈提交成功，我们会尽快处理'
    }
  } catch (err) {
    console.error('提交反馈失败:', err)
    return {
      success: false,
      message: '提交失败，请稍后重试',
      error: err.message
    }
  }
}
