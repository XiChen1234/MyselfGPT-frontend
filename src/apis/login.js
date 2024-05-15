import request from '@/util/Request.js'

export function login(username, password) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            username: username,
            password: password
        },
    })
}
