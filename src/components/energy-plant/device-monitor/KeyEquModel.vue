<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 10:23:25
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-15 13:29:14
 * @FilePath: \tica-energy-plant\src\components\energy-plant\device-monitor\KeyEquModel.vue
 * @Description: 关键设备模型
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="key-equ-model">
        <div
            v-for="(item,index) in state.icons"
            :key="index"
            :class="`icon${index}`"
            class="icon"
        >
            <div
                :class="state.status.find(el=> el.eqName===item.title)?`img${index}-on`:`img${index}-off`"
                class="img"
                @mouseover="onOver(item,index)"
                @mouseout="onOut"
            ></div>
            <div class="info">
                <div
                    :class="[state.status.find(el=> el.eqName===item.title)?'on':'off',
                             state.status.find(el=> el.eqName===item.title)]"
                >
                </div>
                <div class="title">{{ item.title }}</div>
            </div>
        </div>
        <div class="text">
            <div class="on">
                <div class="sign"></div>
                <div class="label">运行中</div>
                <div class="value">{{ state.runningNum || '-' }}<span>台</span></div>
            </div>
            <div class="off">
                <div class="sign"></div>
                <div class="label">关机</div>
                <div class="value">{{ state.closeNum || '-' }}<span>台</span></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bus from '@/utils/bus'
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const state = reactive({
    icons: [
        {
            title: '喷漆房(容器)',
            nodeId: 'TJ000022',
            icons: '' },
        {
            title: '管板焊机',
            nodeId: 'TJ000021',
            icons: '' },
        {
            title: '立式加工中心850',
            nodeId: 'TJ000011',
            icons: '' },
        {
            title: '管板清洗机',
            nodeId: 'TJ000012',
            icons: '' },
        {
            title: '龙门加工中心216',
            nodeId: 'TJ000013',
            icons: '' },
        {
            title: '龙门加工中心4033',
            nodeId: 'TJ000014',
            icons: '' },
        {
            title: '筒体清洗机',
            nodeId: 'TJ000015',
            icons: '' },
        {
            title: '等离子切割机',
            nodeId: 'TJ000016',
            icons: '' },
        {
            title: '喷漆房(ORC)',
            nodeId: 'TJ000018',
            icons: '' },
        {
            title: '喷漆房(满液)',
            nodeId: 'TJ000019',
            icons: '' },
    ],
    closeNum: 0,
    runningNum: 0,
    status: [],
})

const { looping } = useEchart()

const onOver = (item, index) => {
    bus.emit('modal', { item, index })
}
const onOut = () => {
    bus.emit('closeModal')
}

const getData = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.equOverview)
    if (res.code === 200) {
        state.closeNum = res.data.offNum
        state.runningNum = res.data.runningNum
    }
}
const status = async () => {
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.keyEquStatusMonitor)
    if (res.code === 200) { 
        state.status = res.data.filter(el => el.status == true)
    }
}

looping(getData, window.ENERGYMONITOR.looping.equOverview)
looping(status, window.ENERGYMONITOR.looping.equOverview)
</script>

<style lang="scss" scoped>
.key-equ-model {
    position: relative;
    width: 1478px;
    height: 550px;

    @include set-back("@/assets/imgs/energy-plant/key_equ_model.png");

    .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .title {
            margin-left: 5px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-weight: 400;
            line-height: 28px;
            color: #fff;
            text-shadow: 0 0 4px #004a80;
        }

        .on {
            width: 5px;
            height: 5px;

            @include set-back("@/assets/imgs/energy-plant/key-on@2x.png");
        }

        .off {
            width: 5px;
            height: 5px;

            @include set-back("@/assets/imgs/energy-plant/key-off@2x.png");
        }

        .img {
            cursor: pointer;
        }
    }

    .icon0 {
        position: absolute;
        top: 117px;
        left: 267px;

        .info {
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon1 {
        position: absolute;
        top: 191px;
        left: 491px;

        .info {
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon2 {
        .img {
            position: absolute;
            top: 195px;
            left: 792px;
        }

        .info {
            position: absolute;
            top: 171px;
            left: 661px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon3 {
        .img {
            position: absolute;
            top: 143px;
            left: 813px;
        }

        .info {
            position: absolute;
            top: 120px;
            left: 777px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon4 {
        .img {
            position: absolute;
            top: 196px;
            left: 843px;
        }

        .info {
            position: absolute;
            top: 171px;
            left: 854px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon5 {
        .img {
            position: absolute;
            top: 198px;
            left: 903px;
        }

        .info {
            position: absolute;
            top: 239px;
            left: 904px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon6 {
        .img {
            position: absolute;
            top: 178px;
            left: 993px;
        }

        .info {
            position: absolute;
            top: 154px;
            left: 993px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon7 {
        .img {
            position: absolute;
            top: 128px;
            left: 1178px;
        }

        .info {
            position: absolute;
            top: 110px;
            left: 1170px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon8 {
        .img {
            position: absolute;
            top: 413px;
            left: 269px;
        }

        .info {
            position: absolute;
            top: 389px;
            left: 243px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .icon9 {
        .img {
            position: absolute;
            top: 409px;
            left: 298px;
        }

        .info {
            position: absolute;
            top: 419px;
            left: 370px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 28px;
            padding: 0 15px;
            font-size: 13px;

            @include set-back("@/assets/imgs/energy-plant/key-back.png");
        }
    }

    .img0-on,
    .img7-on,
    .img9-on {
        width: 76px;
        height: 76px;

        @include set-back("@/assets/imgs/energy-plant/key-on-big@2x.png");

        &:hover {
            @include set-back("@/assets/imgs/energy-plant/light-on-big@2x.png");
        }
    }

    .img1-on,
    .img2-on,
    .img3-on,
    .img4-on,
    .img5-on,
    .img6-on,
    .img8-on {
        width: 44px;
        height: 44px;

        @include set-back("@/assets/imgs/energy-plant/key-on-small@2x.png");

        &:hover {
            @include set-back("@/assets/imgs/energy-plant/light-on-small@2x.png");
        }
    }

    .img0-off,
    .img7-off,
    .img9-off {
        width: 76px;
        height: 76px;

        @include set-back("@/assets/imgs/energy-plant/key-off-big@2x.png");

        &:hover {
            @include set-back("@/assets/imgs/energy-plant/light-off-big@2x.png");
        }
    }

    .img1-off,
    .img2-off,
    .img3-off,
    .img4-off,
    .img5-off,
    .img6-off,
    .img8-off {
        width: 44px;
        height: 44px;

        @include set-back("@/assets/imgs/energy-plant/key-off-small@2x.png");

        &:hover {
            @include set-back("@/assets/imgs/energy-plant/light-off-small@2x.png");
        }
    }

    .text {
        position: absolute;
        top: 530px;
        display: flex;
        justify-content: center;
        width: 100%;

        .label {
            margin-left: 8px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-weight: 350;
            line-height: normal;
            color: #fff;
        }

        .on {
            display: flex;
            align-items: center;

            .sign {
                width: 10px;
                height: 10px;
                background: rgb(0 255 240 / 80%);
                border: 1px solid #00fff0;
            }

            .value {
                margin-left: 8px;
                font-family: Barlow-Italic, sans-serif;
                font-size: 20px;
                font-style: italic;
                font-weight: 600;
                line-height: normal;
                color: #00fff0;

                span {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 350;
                    line-height: normal;
                    color: #fff;
                }
            }
        }

        .off {
            display: flex;
            align-items: center;

            .sign {
                width: 10px;
                height: 10px;
                margin-left: 48px;
                background: rgb(255 184 0 / 80%);
                border: 1px solid #ffb800;
            }

            .value {
                margin-left: 8px;
                font-family: Barlow-Italic, sans-serif;
                font-size: 20px;
                font-style: italic;
                font-weight: 600;
                line-height: normal;
                color: #ffb800;

                span {
                    font-family: SourceHanSansCN-Normal, sans-serif;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 350;
                    line-height: normal;
                    color: #fff;
                }
            }
        }
    }
}
</style>
