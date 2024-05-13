import axios from 'axios'

import {ElLoading} from "element-plus";

import Message from '@/util/Message'

const instance = axios.create({
    baseURL: "/api",
    timeout: 10 * 1000 // 超时时间 10s
})

let loading = null

// 请求前过滤器
instance.interceptors.request.use(
    (config) => {
        let {showLoading} = config
        if (showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: '加载中......',
                background: '#FFFFFFB6'
            })
        }

        return config
    },
    (error) => {
        if (loading) {
            loading.close()
        }
        Message.error("请求发送失败");
        return Promise.reject(error)
    }
);

// 请求后过滤器
instance.interceptors.response.use(
    (response) => {
        const {showLoading, errorCallback} = response.config
        if (showLoading && loading) {
            loading.close()
        }
        console.log(response)
        const data = response.data

        // 请求成功！
        if (data.status === 200) {
            return data
        }

        // 若他有自定义异常回调函数
        if (errorCallback) {
            errorCallback(data.message)
        }
        Message.error(data.message);
        return Promise.reject(data.message)
    },
    (error) => {
        if (loading) {
            loading.close()
        }
        Message.error("网络异常");
        return Promise.reject(error)
    }
);


/**
 * 请求封装
 * @param config 配置
 */
const request = (config) => {
    const {url, method, data, param, showLoading} = config
    switch (method) {
        case 'GET':
            return instance.get(url, param)
        case 'POST':
            return instance.post(url, data, {
                showLoading: showLoading
            })
    }
}


export default request
