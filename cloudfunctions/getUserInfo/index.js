// 云函数：获取或创建用户信息
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

exports.main = async (event, context) => {
  const { userInfo, code } = event
  const { OPENID, APPID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '获取用户标识失败'
    }
  }
  
  console.log('登录请求:', { openid: OPENID, appid: APPID, hasCode: !!code, hasUserInfo: !!userInfo })

  try {
    // 查询用户是否已存在
    const userResult = await db.collection('users')
      .where({
        _openid: OPENID
      })
      .get()

    if (userResult.data && userResult.data.length > 0) {
      // 用户已存在，更新登录时间
      const user = userResult.data[0]
      await db.collection('users').doc(user._id).update({
        data: {
          lastLoginTime: db.serverDate(),
          loginCount: db.command.inc(1)
        }
      })
      
      return {
        success: true,
        openid: OPENID,
        userInfo: {
          ...user,
          lastLoginTime: new Date()
        },
        isNew: false
      }
    } else {
      // 新用户，创建记录
      const newUser = {
        _openid: OPENID,
        nickName: userInfo?.nickName || '微信用户',
        avatarUrl: userInfo?.avatarUrl || '',
        createTime: db.serverDate(),
        lastLoginTime: db.serverDate(),
        loginCount: 1,
        stats: {
          totalQuestions: 0,
          correctCount: 0,
          wrongCount: 0,
          totalMistakes: 0,
          masteredMistakes: 0,
          checkInDays: 0,
          lastCheckInDate: null
        }
      }
      
      const addResult = await db.collection('users').add({
        data: newUser
      })

      return {
        success: true,
        openid: OPENID,
        userInfo: {
          ...newUser,
          _id: addResult._id
        },
        isNew: true
      }
    }
  } catch (err) {
    console.error('获取用户信息失败:', err)
    return {
      success: false,
      message: '获取用户信息失败',
      error: err.message
    }
  }
}
