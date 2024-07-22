<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-01 08:38:53
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-27 13:32:41
 * @FilePath: \tica-energy-plant\src\components\manage\common\Layout.vue
 * @Description: 左侧菜单栏布局组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="bg">
        <div class="manage-container">
            <a-layout class="layout-box">
                <a-layout-header class="header">
                    <Header></Header>
                </a-layout-header>
                <a-layout>
                    <a-layout-sider
                        width="288"
                        collapsible
                        :collapsed="state.isCollapsed"
                        :trigger="null"
                        class="sider"
                        @collapse="onCollapse"
                    >
                        <a-menu
                            :selected-keys="state.selectedKeys"
                            :open-keys="state.openKeys"
                            mode="inline"
                            theme="dark"
                        >
                            <a-sub-menu key="device">
                                <template #title>
                                    <img
                                        class="sider-menu-sign" 
                                        src="../../../assets/imgs/manage/sider-menu-sign.png"
                                    />
                                    设备运行
                                </template>
                                <a-menu-item key="refrigeration" @click="changeMenu('/refrigeration')">
                                    制冷机房
                                </a-menu-item>
                                <a-menu-item key="chiller" @click="changeMenu('/chiller')">
                                    冷水机组
                                </a-menu-item>
                                <a-menu-item key="pump" @click="changeMenu('/pump')">
                                    冷水泵、冷却水泵
                                </a-menu-item>
                                <a-menu-item key="coolingtower" @click="changeMenu('/coolingtower')">
                                    冷却塔
                                </a-menu-item>
                                <a-menu-item key="airconditioner" @click="changeMenu('/airconditioner')">
                                    柜式空调
                                </a-menu-item>
                                <a-menu-item key="fan" @click="changeMenu('/fan')">风机</a-menu-item>
                            </a-sub-menu>
                            <a-sub-menu key="alarm">
                                <template #title>
                                    <img
                                        class="sider-menu-sign" 
                                        src="../../../assets/imgs/manage/sider-menu-sign.png"
                                    />
                                    报警管理
                                </template>
                                <a-menu-item key="realtime" @click="changeMenu('/realtime')">
                                    实时报警
                                </a-menu-item>
                                <a-menu-item key="history" @click="changeMenu('/history')">
                                    历史报警
                                </a-menu-item>
                            </a-sub-menu>
                        </a-menu>
                    </a-layout-sider>
                    <a-layout-content style="padding: 24px;">
                        <router-view></router-view>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Header from '../header/Header.vue'

const router = useRouter()

const state = reactive({
    isCollapsed: false,
    selectedKeys: router.currentRoute.value.name === 'manage' ? ['realtime'] : [router.currentRoute.value.name],
    openKeys: ['device', 'alarm'],
})

const onCollapse = () => {
    state.isCollapsed.value = !state.isCollapsed.value
}

// 默认展开设备运行和报警管理
onBeforeMount(() => {
    state.openKeys = ['device', 'alarm']
    if (router.currentRoute.value.path === '/manage') {
        changeMenu('/realtime')
    }
})

const changeMenu = (path) => {
    if (router.path !== path) {
        router.push(path)
    }
}

watch(() => router.currentRoute.value, (to) => {
    const path = to.path
    const pathArr = path.split('/')
    state.selectedKeys = ([pathArr[pathArr.length - 1]]) 
})
</script>

<style lang="scss" scoped>
.bg {
    height: 100%;
    background:
        linear-gradient(
            90deg,
            #202434 .27%,
            #1b253b 19.42%,
            #1a2439 44.26%,
            #1d283e 64.96%,
            #222f45 99.64%,
            #1b273c 99.64%
        );

    .manage-container {
        height: 100%;

        @include set-back("../../../assets/imgs/manage/layout-bg.png");

        .layout-box {
            height: 100%;
        }

        .header {
            height: 80px;
            padding-inline: 0;
        }

        .sider-menu-sign {
            width: 16px;
            height: 16px;
            margin: 0 0 5px;
        }

        ::v-deep(.ant-layout) {
            background: transparent;
        }

        ::v-deep(.ant-layout-sider) {
            background: transparent;
        }

        ::v-deep(.ant-layout-sider .ant-layout-sider-children) {
            background: transparent;
        }

        ::v-deep(.ant-menu .ant-menu-sub) {
            background: transparent;
        }

        ::v-deep(.ant-menu-item) {
            &:hover {
                background: linear-gradient(270deg, rgb(81 109 157 / 5.2%) 0%, rgb(53 81 145 / 26%) 100%);
                border-radius: 4px;
            }
        }

        ::v-deep(.ant-menu-dark) {
            color: rgb(255 255 255 / 80%);
            background: transparent;
        }

        ::v-deep(.ant-menu-dark .ant-menu-item-selected) {
            color: rgb(255 255 255 / 80%);
            background: linear-gradient(270deg, rgb(81 109 157 / 16%) 0%, rgb(53 81 145 / 80%) 100%);
            border-radius: 4px;
        }
    }
}

</style>
