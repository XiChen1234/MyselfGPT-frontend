import axios from "axios";
import {ElLoading} from "element-plus";
import Message from "@/util/Message.js";

const instance = axios.create({
    baseURL: "/api",
    timeout: 10 * 1000
})

let loading = null // loading对象

// 请求前拦截器
instance.interceptors.request.use(
    config => {
        const {showLoading = false} = config
        // 加载loading
        if(showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: '加载中......',
                background: '#FFFFFFB6'
            })
        }

        return config
    }, error => {
        if (loading) {
            loading.close()
        }
        return Promise.reject(error)
    }
)

// 请求后拦截器
instance.interceptors.response.use(
    response => {
        const {showLoading = false, errorCallback} = response.config
        // 关闭loading
        if(showLoading && loading) {
            loading.close()
        }

        const data = response.data
        // 请求成功
        if(data.status === 200) {
            return data.data
        }

        // 请求不成功
        if(errorCallback) {
            errorCallback(data.message)
        }
        Message.error(data.message)
        return Promise.reject(data.message)
    },
    error => {
        if(loading) {
            loading.close()
        }
        Message.error("网络异常");
        return Promise.reject(error)
    }
)

/**
 * 导出的request封装
 * @param config 自定义的配置
 * 展开：
 * @config {string} url 请求路径
 * @config {string} method 请求方法
 * @config {json} params 参数
 * @config {json} data 请求体参数
 * @config {boolean} showLoading 显示loading的选项
 */
const request = (config) => {
    return instance({
        ...config,
        url: config.url,
        method: config.method || 'get',
        params: config.params || {},
        data: config.data || {},
        showLoading: config.showLoading
    })
}
export default request
