<!--
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-10-12 09:29:59
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-23 14:43:18
 * @FilePath: \tica-energy-plant\src\components\load-forecast\middle\WeatherInfoItem.vue
 * @Description: 冷负荷预测-天气状态单个
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="weather-info-item">
        <a-tooltip placement="right" :title="data.skycon">
            <img class="icon" :src="getIconByWeather(data.skycon)" />
        </a-tooltip>
        <a-tooltip placement="right" title="温度">
            <div
                class="tem-value value"
            >
                {{ data.temperatureMax ? `${data.temperatureMin}°/${data.temperatureMax}°` 
                    : `${data.temperatureMin}℃` }}
            </div>
        </a-tooltip>
        <a-tooltip placement="right" title="湿度">
            <div class="hum-value value">
                {{ data.humidityAvg }}
                <span>%</span>
            </div>
        </a-tooltip>
    </div>
</template>

<script setup>
// 天气图标静态资源
import qing from '@/assets/imgs/load-forecast/weather/qing.png'
import yin from '@/assets/imgs/load-forecast/weather/yin.png'
import duoyun from '@/assets/imgs/load-forecast/weather/duoyun.png'
import xiaoyu from '@/assets/imgs/load-forecast/weather/xiaoyu.png'
import xiaxue from '@/assets/imgs/load-forecast/weather/xiaxue.png'
import dafeng from '@/assets/imgs/load-forecast/weather/dafeng.png'
import dawu from '@/assets/imgs/load-forecast/weather/dawu.png'
import shachenbao from '@/assets/imgs/load-forecast/weather/shachenbao.png'

defineProps({
    data: {
        type: Object,
        default: () => ({
            skycon: '',
            temperatureMin: 0,
            temperatureMax: 0,
            humidityAvg: 0,
        }),
    },
})

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

</script>

<style lang="scss" scoped>
.weather-info-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
        width: 36px;
        height: 36px;
    }

    .value {
        font-family: HarmonyOS-Regular, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        color: #e1e2e7;

        span {
            font-size: 10px;
        }
    }
}
</style>
