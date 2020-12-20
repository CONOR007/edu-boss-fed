import axios from 'axios'
import Store from '@/store'
import Router from '@/router'
import { Message } from 'element-ui'
import { getRefreshToken } from '@/services/user.ts'

const request = axios.create({
// 配置选项

})

// 跳转到登录页面
function redirectLogin () {
    Router.push({
        name: 'login',
        query: {
            redirect: Router.currentRoute.fullPath,
        },
    })
}

// 添加请求拦截器
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // console.log('在发送请求之前做些什么', config)
    const { user } = Store.state
    if (user && user.access_token) {
        config.headers.Authorization = user.access_token
    }
    return config
}, (error) => {
    console.log(error)
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
let isRfreshing = false // 控制刷新token的状态
interface FunArray { // 定义一个元素是箭头函数的数组
    (): void;
}
let requests: FunArray[] = [] // 在刷新完token之前 存储请求 让这些请求等刷新完token之后 再执行
request.interceptors.response.use((response) => {
    // 状态码为2开头,对响应数据做点什么
    // 如果后台有自定义错误码,那么错误处理写在这里
    // console.log('请求响应成功', response)
    return response
}, async (error) => {
    // 状态码不为2开头,对响应错误做点什么
    // 如果后台错误码走的是http错误码,那么错误处理写在这里
    // console.dir(error)
    if (error.response) {
        // 请求发出去了并收到响应 状态码超出了2xx的范围
        const { status } = error.response
        if (status === 400) {
            Message({ type: 'error', message: '请求参数错误' })
        } else if (status === 401) {
            // 主要处理token失效时 页面进行接口请求时的异常情况
            if (!Store.state.user) {
                redirectLogin()
            } else {
                if (isRfreshing) {
                    // 刷新token在进行中时,把其余请求挂起放到requests数组中
                    return new Promise((resolve) => {
                        requests.push(() => {
                            resolve(request(error.config))
                        })
                    })
                } else {
                    // getRefreshToken 登录后只能使用一次
                    isRfreshing = true
                    return getRefreshToken({ refreshtoken: Store.state.user.refresh_token })
                        .then(res => {
                            const { data } = res
                            if (data.success) {
                                // 返回成功 重新更新容器
                                Store.commit('setUser', data.content)
                                // 重新请求之前校验失败的接口 并返回给真正拿数据的地方
                                requests.forEach(cb => cb())
                                // 重置数组
                                requests = []
                                return request(error.config)
                            } else {
                                // state不等于1 等同失败 清除登录状态
                                throw new Error('刷新token失败!')
                            }
                        }).catch(error => {
                            // 清除登录状态
                            Store.commit('setUser', null)
                            Message({ type: 'error', message: error.message })
                            redirectLogin()
                        }).finally(() => {
                            // 不管是成功还是失败 不能影响下一次刷新token的流程
                            isRfreshing = false
                        })
                }
            }
        } else if (status === 403) {
            Message({ type: 'error', message: '没有权限,请联系管理员' })
        } else if (status === 404) {
            Message({ type: 'error', message: '请求资源不存在' })
        } else if (status >= 500) {
            Message({ type: 'error', message: '服务端错误,请联系管理员' })
        }
    } else if (error.request) {
        // 请求发出去没有收到响应
        Message({ type: 'error', message: '请求超时' })
        console.log(error.request)
    } else {
        // 在设置请求的时候发生了一些事情,触发了错误
        Message({ type: 'error', message: '请求失败' + error.message })
    }
    // 抛出异常给调用者
    return Promise.reject(error)
})

export default request
