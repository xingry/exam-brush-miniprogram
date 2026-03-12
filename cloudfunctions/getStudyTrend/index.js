// 云函数：获取学习趋势数据
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 获取最近7天的日期数组
function getLast7Days() {
  const days = []
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    days.push({
      date: `${year}-${month}-${day}`,
      day: weekdays[date.getDay()],
      dateObj: date
    })
  }
  
  return days
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '用户未登录'
    }
  }

  try {
    const last7Days = getLast7Days()
    const dateList = last7Days.map(d => d.date)

    // 查询最近7天的答题记录
    const records = await db.collection('records')
      .where({
        _openid: OPENID,
        createTime: _.gte(new Date(last7Days[0].dateObj.getTime()))
      })
      .get()

    // 按日期统计答题数量
    const dailyStats = {}
    dateList.forEach(date => {
      dailyStats[date] = { count: 0, correct: 0 }
    })

    records.data.forEach(record => {
      const date = record.createTime.toISOString().split('T')[0]
      if (dailyStats[date]) {
        dailyStats[date].count++
        if (record.isCorrect) {
          dailyStats[date].correct++
        }
      }
    })

    // 构建返回数据
    const trendData = last7Days.map((dayInfo, index) => {
      const stats = dailyStats[dayInfo.date]
      const count = stats.count
      // 计算柱状图高度（最大140rpx）
      const maxCount = Math.max(...Object.values(dailyStats).map(s => s.count), 10)
      const height = count > 0 ? Math.round((count / maxCount) * 140) : 0

      return {
        day: dayInfo.day,
        date: dayInfo.date,
        count: count,
        correct: stats.correct,
        height: height,
        isToday: index === 6
      }
    })

    // 计算本周统计数据
    const weekTotal = trendData.reduce((sum, d) => sum + d.count, 0)
    const weekCorrect = trendData.reduce((sum, d) => sum + d.correct, 0)
    const avgDaily = Math.round(weekTotal / 7)

    return {
      success: true,
      data: trendData,
      summary: {
        weekTotal,
        weekCorrect,
        avgDaily,
        accuracy: weekTotal > 0 ? Math.round((weekCorrect / weekTotal) * 100) : 0
      }
    }
  } catch (err) {
    console.error('获取学习趋势失败:', err)
    return {
      success: false,
      message: '获取学习趋势失败',
      error: err.message
    }
  }
}
