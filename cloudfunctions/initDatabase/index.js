// 云函数：初始化数据库集合
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const collections = ['questions', 'users', 'mistakes', 'records', 'checkins', 'feedbacks']
  const results = []

  for (const name of collections) {
    try {
      // 尝试获取集合信息，如果不存在则创建
      await db.collection(name).limit(1).get()
      results.push({ name, status: '已存在' })
    } catch (err) {
      if (err.errCode === -1 || err.message.includes('collection not exist')) {
        // 集合不存在，尝试通过添加然后删除文档的方式来创建集合
        try {
          await db.createCollection(name)
          results.push({ name, status: '创建成功' })
        } catch (createErr) {
          results.push({ name, status: '创建失败', error: createErr.message })
        }
      } else {
        results.push({ name, status: '检查失败', error: err.message })
      }
    }
  }

  return {
    success: true,
    message: '数据库集合初始化完成',
    results
  }
}
