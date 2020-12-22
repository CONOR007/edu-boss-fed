// 用户相关请求模块
import request from '@/utils/request'

interface Menu {
    id?: number;
    parentId: number;
    name: string;
    href: string;
    icon: string;
    orderNum: number;
    description: string;
    shown: boolean;
}

export const saveOrUpdate = (data: Menu) => {
    return request({
        method: 'POST',
        data,
        url: '/boss/menu/saveOrUpdate',
    })
}

export const getEditMenuInfo = (id = -1) => {
    return request({
        method: 'get',
        // url: '/boss/menu/getEditMenuInfo?id=' + id,
        url: '/boss/menu/getEditMenuInfo',
        params: {
            id,
        },
    })
}

export const getAllMenu = () => {
    return request({
        method: 'get',
        url: '/boss/menu/getAll',
    })
}

export const deleteMenu = (id: number) => {
    return request({
        method: 'delete',
        url: `/boss/menu/${id}`,
    })
}

export const getMenuById = (id: number | string) => {
    return request({
        method: 'get',
        url: `/boss/menu/${id}`,
    })
}
