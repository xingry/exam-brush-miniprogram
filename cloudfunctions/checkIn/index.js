// 云函数：每日打卡
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 获取今天的日期字符串 (YYYY-MM-DD)
function getTodayString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 获取昨天日期
function getYesterdayString() {
  const now = new Date()
  now.setDate(now.getDate() - 1)
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 获取本月打卡记录
function getMonthDates() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const dates = []
  
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`)
  }
  return dates
}

exports.main = async (event, context) => {
  const { action } = event
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return { success: false, message: '用户未登录' }
  }

  // 查询用户信息
  const userResult = await db.collection('users').where({ _openid: OPENID }).get()
  if (!userResult.data || userResult.data.length === 0) {
    return { success: false, message: '用户不存在' }
  }

  const user = userResult.data[0]
  const userId = user._id
  const today = getTodayString()
  const yesterday = getYesterdayString()

  // 获取打卡记录
  if (action === 'getStatus') {
    // 查询今日是否已打卡
    const todayRecord = await db.collection('checkins')
      .where({
        _openid: OPENID,
        date: today
      })
      .get()

    // 查询本月打卡记录
    const monthDates = getMonthDates()
    const monthRecords = await db.collection('checkins')
      .where({
        _openid: OPENID,
        date: _.in(monthDates)
      })
      .get()

    const checkedDates = monthRecords.data.map(r => r.date)
    const isTodayChecked = todayRecord.data.length > 0

    // 计算连续打卡天数
    let streakDays = user.stats?.checkInDays || 0
    const lastCheckIn = user.stats?.lastCheckInDate

    // 如果昨天没打卡且今天没打卡，重置连续天数
    if (lastCheckIn !== yesterday && lastCheckIn !== today && !isTodayChecked) {
      streakDays = 0
    }

    return {
      success: true,
      isTodayChecked,
      streakDays,
      totalDays: checkedDates.length,
      checkedDates,
      monthDates
    }
  }

  // 执行打卡
  if (action === 'checkIn') {
    // 检查今天是否已打卡
    const todayRecord = await db.collection('checkins')
      .where({
        _openid: OPENID,
        date: today
      })
      .get()

    if (todayRecord.data.length > 0) {
      return {
        success: false,
        message: '今天已经打卡过了',
        isAlreadyChecked: true
      }
    }

    // 添加打卡记录
    await db.collection('checkins').add({
      data: {
        _openid: OPENID,
        date: today,
        createTime: db.serverDate(),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      }
    })

    // 计算新的连续天数
    let streakDays = user.stats?.checkInDays || 0
    const lastCheckIn = user.stats?.lastCheckInDate

    if (lastCheckIn === yesterday || lastCheckIn === today) {
      // 连续打卡
      if (lastCheckIn !== today) {
        streakDays += 1
      }
    } else {
      // 重新开始
      streakDays = 1
    }

    // 更新用户统计
    await db.collection('users').doc(userId).update({
      data: {
        'stats.checkInDays': streakDays,
        'stats.lastCheckInDate': today
      }
    })

    return {
      success: true,
      message: '打卡成功',
      streakDays,
      isFirstCheckIn: streakDays === 1
    }
  }

  return { success: false, message: '未知操作' }
}
