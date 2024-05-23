import request from '@/util/Request.js'

const api = {
    login: '/login',
    talk: '/talk',
    message: '/talk/message'
}

/**
 * 登录接口
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {boolean} 登录是否成功
 */
export function login(username, password) {
    return request({
        url: api.login,
        method: 'post',
        showLoading: true,
        data: {
            username: username,
            password: password
        },
    })
}

/**
 * 获取talk列表
 * @param {string} userId 用户id
 * @returns {Array<Object>} talk列表
 */
export function getTalkList(userId) {
    return request({
        url: api.talk,
        params: {userId: userId}
    })
}

/**
 * 创建新的talk，发送至服务器
 * @param {string} userId 用户id
 * @returns {boolean} 创建结果
 */
export function creatNewTalk(userId) {
    return request({
        url: api.talk,
        method: 'post',
        data: {
            id: userId
        }
    })
}

/**
 * 删除所有非示例对话
 * @param {string} userId 用户id
 * @returns {number} 删除结果
 */
export function deleteAllTalk(userId) {
    return request({
        url: api.talk,
        method: 'delete',
        data: {
            id: userId
        }
    })
}

/**
 * 将发送的新消息进行保存
 * @param message_index message的index
 * @param question 用户发送的问题
 * @param talk_index talk的index
 */
export function creatNewMessage(message_index, question, talk_index) {
    return request({
        url: api.message,
        method: 'post',
        data: {
            index: message_index,
            talkIndex: talk_index,
            question: question
        }
    })
}

/**
 * 将结果保存到数据库中
 * @param {string} userId 用户id
 * @param {number} talkIndex 会话索引
 * @param {string} answer 回答的结果
 */
export function saveAnswer(userId, talkIndex, answer) {
    return request({
        url: api.message,
        method: 'put',
        data: {
            userId: userId,
            talkIndex: talkIndex,
            answer: answer
        }
    })
}

