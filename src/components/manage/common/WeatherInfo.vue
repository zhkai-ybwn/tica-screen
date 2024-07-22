<template>
    <div class="weather-info-container">
        <!-- 天气图标 -->
        <img class="icon" :src="getIconByWeather(state.weather)" />
        <!-- 温度 -->
        <div class="value-unit">
            <div class="value">{{ state.temperature }}</div>
            <div class="unit">{{ state.unit }}</div>
        </div>
    </div>
</template>

<script setup>
// 天气图标静态资源
import qing from '@/assets/imgs/home/weather/qing.png'
import yin from '@/assets/imgs/home/weather/yin.png'
import duoyun from '@/assets/imgs/home/weather/duoyun.png'
import xiaoyu from '@/assets/imgs/home/weather/xiaoyu.png'
import xiaxue from '@/assets/imgs/home/weather/xiaxue.png'
import dafeng from '@/assets/imgs/home/weather/dafeng.png'
import dawu from '@/assets/imgs/home/weather/dawu.png'
import shachenbao from '@/assets/imgs/home/weather/shachenbao.png'

// 工具相关
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'

const { looping } = useEchart()

const getIconByWeather = (weather) => {
    const weatherIconList = [qing, yin, duoyun, xiaoyu, xiaxue, dafeng, dawu, shachenbao]
    if (weather.includes('晴')) return weatherIconList[0]
    if (weather.includes('阴')) return weatherIconList[1]
    if (weather.includes('多云')) return weatherIconList[2]
    if (weather.includes('雨')) return weatherIconList[3]
    if (weather.includes('雪')) return weatherIconList[4]
    if (weather.includes('风')) return weatherIconList[5]
    if (weather.includes('雾')) return weatherIconList[6]
    if (weather.includes('沙')) return weatherIconList[7]
    return weatherIconList[6]
}

const state = reactive({
    weather: '晴',
    temperature: 0,
    unit: window.ENERGY.text.weather.unit,
})

const getData = async () => {
    const res = await axiosAPI.get(window.ENERGY.urls.weather, 
        { key: window.ENERGY.weather.key, cityId: window.ENERGY.weather.cityId })
    if (res.info === 'OK' && res.lives) {
        state.weather = res.lives[0].weather
        state.temperature = res.lives[0].temperature
    }
}

looping(getData, window.ENERGY.looping.quanchangnenghao)
</script>

<style lang="scss" scoped>
.weather-info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 74px;
    height: 24px;

    .icon {
        width: 24px;
        height: 24px;
    }

    .divider {
        width: 2px;
        height: 26px;
        background: rgb(255 255 255 / 60%);
    }

    .value-unit {
        display: flex;

        .value {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            color: rgb(255 255 255 / 90%);
        }

        .unit {
            font-family: HarmonyOS-Regular, sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            color: rgb(255 255 255 / 90%);
        }
    }

    .text {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        color: rgb(255 255 255 / 90%);
    }
}
</style>
