// 云函数：更新用户答题统计
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { questionId, isCorrect, category = 'network' } = event
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '用户未登录'
    }
  }

  try {
    // 查询用户
    const userResult = await db.collection('users')
      .where({ _openid: OPENID })
      .get()

    if (!userResult.data || userResult.data.length === 0) {
      return {
        success: false,
        message: '用户不存在'
      }
    }

    const userId = userResult.data[0]._id

    // 更新用户统计
    const updateData = {
      'stats.totalQuestions': _.inc(1)
    }

    if (isCorrect) {
      updateData['stats.correctCount'] = _.inc(1)
    } else {
      updateData['stats.wrongCount'] = _.inc(1)
    }

    await db.collection('users').doc(userId).update({
      data: updateData
    })

    // 记录答题历史
    await db.collection('records').add({
      data: {
        _openid: OPENID,
        questionId: questionId,
        isCorrect: isCorrect,
        category: category,
        createTime: db.serverDate()
      }
    })

    return {
      success: true,
      message: '统计更新成功'
    }
  } catch (err) {
    console.error('更新统计失败:', err)
    return {
      success: false,
      message: '更新统计失败',
      error: err.message
    }
  }
}
