/*
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-02-21 14:22:08
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-04 09:20:13
 * @FilePath: \tica-energy-plant\src\router\index.js
 * @Description: 路由管理
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/manage/common/Layout.vue'

const routes = [
    {
        path: '/manage',
        component: Layout,
        name: 'manage',
        children: [
            {
                path: '/refrigeration',
                name: 'refrigeration',
                component: () => import('../views/device/Refrigeration.vue'),
            },
            {
                path: '/chiller',
                name: 'chiller',
                component: () => import('../views/device/Chiller.vue'),
            },
            {
                path: '/pump',
                name: 'pump',
                component: () => import('../views/device/Pump.vue'),
            },
            {
                path: '/coolingtower',
                name: 'coolingtower',
                component: () => import('../views/device/CoolingTower.vue'),
            },
            {
                path: '/airconditioner',
                name: 'airconditioner',
                component: () => import('../views/device/AirConditioner.vue'),
            },
            {
                path: '/fan',
                name: 'fan',
                component: () => import('../views/device/Fan.vue'),
            },
            {
                path: '/realtime',
                name: 'realtime',
                component: () => import('../views/alarm/RealtimeAlarm.vue'),
            },
            {
                path: '/history',
                name: 'history',
                component: () => import('../views/alarm/HistoryAlarm.vue'),
            },
        ],
    },
    {
        path: '/',
        name: 'home', // 首页
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/load-forecast', // 负荷预测
        name: 'loadForecast',
        component: () => import('../views/LoadForecast.vue'),
    },
    {
        path: '/energy-plant', // 全厂能源监控
        name: 'energyMonitor',
        component: () => import('../views/EnergyPlant.vue'),
    },
    {
        path: '/file-operate',
        name: '/file-operate',
        component: () => import('../views/FileOperation.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
