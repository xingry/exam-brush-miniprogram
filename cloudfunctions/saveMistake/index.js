// 云函数：保存错题
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { questionId, question, selectedAnswer, correctAnswer } = event
  const { OPENID } = cloud.getWXContext()

  if (!OPENID) {
    return {
      success: false,
      message: '用户未登录'
    }
  }

  try {
    // 检查是否已存在该错题
    const existResult = await db.collection('mistakes')
      .where({
        _openid: OPENID,
        questionId: questionId
      })
      .get()

    if (existResult.data && existResult.data.length > 0) {
      // 已存在，更新错误次数
      await db.collection('mistakes').doc(existResult.data[0]._id).update({
        data: {
          wrongCount: _.inc(1),
          lastWrongTime: db.serverDate(),
          selectedAnswer: selectedAnswer
        }
      })
      return {
        success: true,
        message: '错题已更新'
      }
    } else {
      // 不存在，新增错题
      await db.collection('mistakes').add({
        data: {
          _openid: OPENID,
          questionId: questionId,
          question: question,
          selectedAnswer: selectedAnswer,
          correctAnswer: correctAnswer,
          category: question.category || 'network',
          wrongCount: 1,
          isMastered: false,
          createTime: db.serverDate(),
          lastWrongTime: db.serverDate()
        }
      })
      return {
        success: true,
        message: '错题已保存'
      }
    }
  } catch (err) {
    console.error('保存错题失败:', err)
    return {
      success: false,
      message: '保存错题失败',
      error: err.message
    }
  }
}
