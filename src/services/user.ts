// 用户相关请求模块
import qs from 'qs'
import axios from 'axios'
import request from '@/utils/request'

interface User {
    phone: string;
    password: string;
}

interface RefreshToken {
    refreshtoken: string;
}

export const login = (data: User) => {
    return request({
        method: 'POST',
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // 如果data是普通对象, 则headers默认是Content-Type是application/json
        // 如果data是FormData对象, 则headers是Content-Type 是multipart/form-data
        // 如果data是qs.stringify(data) 转换之后数据是 key=value&key=value, 则headers是Content-Type 是application/x-www-form-urlencoded
        data: qs.stringify(data),
        url: '/front/user/login',
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/front/user/getInfo',
    })
}

export const getRefreshToken = (data: RefreshToken) => {
    // 使用axios.create是为了防止 这个请求也报错401 进入死循环
    return axios.create()({
        method: 'POST',
        data: qs.stringify(data),
        url: '/front/user/refresh_token',
    })
}
