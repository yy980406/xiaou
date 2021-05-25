import Vue from "vue"
import axios from "axios"
import qs from "qs"
import { errorAlert } from "../utils/alert"

// 环境配置
// 开发环境
if (process.env.NODE_ENV == "development") {
    Vue.prototype.$pre = "http://localhost:3000"
}
// 生产环境
if (process.env.NODE_ENV == "production") {
    Vue.prototype.$pre = ""
}

// 请求拦截
axios.interceptors.request.use(config => {
    // 不确定
    return config
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.log("请求地址：" + res.config.url);
    console.log(res);
    
    
    //统一弹失败信息
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }

    return res
})

// 封装get请求
export let get = (url, params = {}) => {
    return new Promise((reslove, reject) => {
        axios.get(url, {
            params
        }).then(res => {
            reslove(res)
        })
    })
}

// 封装post请求
export let post = (url, params, isFile = false) => {
    let data = null
    if (isFile) {
        data = new FormData()
        for (let i in params) {
            data.append(i, params[i])
        }
    } else {
        data = qs.stringify(params)
    }

    return new Promise((reslove, reject) => {
        axios.post(url, data).then(res => {
            reslove(res)
        })
    })
}