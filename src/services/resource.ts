// 资源相关请求模块
import request from '@/utils/request'

export const getResourcePages = (data: any) => {
    return request({
        method: 'POST',
        data,
        url: '/boss/resource/getResourcePages',
    })
}

export const getAllResourceType = () => {
    return request({
        method: 'GET',
        url: '/boss/resource/category/getAll',
    })
}
