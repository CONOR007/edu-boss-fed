import axios from 'axios'
import Store from '@/store'

const request = axios.create({
// 配置选项

})
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
    // 对请求错误做些什么
    return Promise.reject(error)
})
// 响应拦截器
export default request
