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

export function getTalkList(userId) {
    return request({
        url: api.talk,
        params: {userId: userId}
    })
}
