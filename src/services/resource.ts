// 资源相关请求模块
import request from '@/utils/request'

export const getResourcePages = (data: any) => {
    return request({
        method: 'POST',
        data,
        url: '/boss/resource/getResourcePages',
    })
}

export const getAllResources = () => {
    return request({
        method: 'GET',
        url: '/boss/resource/getAll',
    })
}

export const getAllResourceType = () => {
    return request({
        method: 'GET',
        url: '/boss/resource/category/getAll',
    })
}

export const allocateRoleResources = (data: any) => {
    return request({
        method: 'POST',
        url: '/boss/resource/allocateRoleResources',
        data,
    })
}

export const getRoleResources = (roleId: string | number) => {
    return request({
        method: 'GET',
        url: '/boss/resource/getRoleResources',
        params: {
            roleId,
        },
    })
}
