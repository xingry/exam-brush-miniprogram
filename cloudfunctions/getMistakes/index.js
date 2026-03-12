// 云函数：获取用户错题列表
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { category = 'all', limit = 50, skip = 0 } = event
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '用户未登录'
    }
  }

  try {
    let whereCondition = {
      _openid: OPENID
    }

    if (category && category !== 'all') {
      whereCondition.category = category
    }

    const { data } = await db.collection('mistakes')
      .where(whereCondition)
      .orderBy('lastWrongTime', 'desc')
      .skip(skip)
      .limit(limit)
      .get()

    // 获取统计信息
    const totalCount = await db.collection('mistakes')
      .where({ _openid: OPENID })
      .count()

    const masteredCount = await db.collection('mistakes')
      .where({
        _openid: OPENID,
        isMastered: true
      })
      .count()

    return {
      success: true,
      data: data,
      stats: {
        total: totalCount.total,
        mastered: masteredCount.total
      },
      message: '获取成功'
    }
  } catch (err) {
    console.error('获取错题失败:', err)
    return {
      success: false,
      message: '获取错题失败',
      error: err.message
    }
  }
}
