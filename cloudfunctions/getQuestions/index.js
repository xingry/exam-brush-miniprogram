// 云函数：获取题目列表
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { type = 'all', limit = 20, skip = 0, ids = [] } = event

  try {
    let whereCondition = {}
    
    // 如果指定了题目ID列表，则按ID查询
    if (ids && ids.length > 0) {
      whereCondition = {
        _id: _.in(ids)
      }
    } else if (type && type !== 'all') {
      // 按科目类型筛选
      whereCondition = {
        category: type
      }
    }

    const { data } = await db.collection('questions')
      .where(whereCondition)
      .skip(skip)
      .limit(limit)
      .get()

    // 如果没有数据，返回空数组
    if (!data || data.length === 0) {
      return {
        success: true,
        data: [],
        total: 0,
        message: '暂无题目数据'
      }
    }

    // 获取总数
    const countResult = await db.collection('questions')
      .where(whereCondition)
      .count()

    return {
      success: true,
      data: data,
      total: countResult.total,
      message: '获取成功'
    }
  } catch (err) {
    console.error('获取题目失败:', err)
    return {
      success: false,
      message: '获取题目失败',
      error: err.message
    }
  }
}
