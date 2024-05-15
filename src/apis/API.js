import request from '@/util/Request.js'

const api = {
    login: '/login',
    talk: '/chat/talk'
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
        data: {userId: userId}
    })
}