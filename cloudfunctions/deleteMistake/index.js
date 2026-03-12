// 云函数：删除错题
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { mistakeId } = event
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '用户未登录'
    }
  }

  if (!mistakeId) {
    return {
      success: false,
      message: '错题ID不能为空'
    }
  }

  try {
    // 验证该错题属于当前用户
    const mistake = await db.collection('mistakes').doc(mistakeId).get()
    
    if (!mistake.data || mistake.data._openid !== OPENID) {
      return {
        success: false,
        message: '无权删除该错题'
      }
    }

    await db.collection('mistakes').doc(mistakeId).remove()

    return {
      success: true,
      message: '删除成功'
    }
  } catch (err) {
    console.error('删除错题失败:', err)
    return {
      success: false,
      message: '删除错题失败',
      error: err.message
    }
  }
}
