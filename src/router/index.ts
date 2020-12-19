import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import Store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName:'login' */'@/views/login/index.vue'),
    },
    {
        path: '/',
        component: Layout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '', // 默认子路由
                name: 'home',
                // import(url) 路由懒加载,打包到名为home的文件中去
                component: () => import(/* webpackChunkName:'home' */'@/views/home/index.vue'),

            },
            {
                path: '/role',
                name: 'role',
                component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),

            },
            {
                path: '/menu',
                name: 'menu',
                component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),

            },
            {
                path: '/resource',
                name: 'resource',
                component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),

            },
            {
                path: '/course',
                name: 'course',
                component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),

            },
            {
                path: '/user',
                name: 'user',
                component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),

            },
            {
                path: '/advert',
                name: 'advert',
                component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),

            },
            {
                path: '/advert-space',
                name: 'advert-space',
                component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'),

            },
        ],
    },
    {
    // VueRouter 匹配规则是从上往下 建议把*放最后
        path: '*',
        name: '404',
        component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue'),
    },
]

const router = new VueRouter({
    routes,
})

// 全局前置守卫 拦截访问未登录时的页面
router.beforeEach((to, from, next) => {
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    console.log(to, from)
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (Store.state.user) next()
        else {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath,
                },
            })
        }
    } else {
        next()
    }
})

export default router
