<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 10:26:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-02 13:09:10
 * @FilePath: \tica-energy-plant\src\components\manage\common\DateTime.vue
 * @Description: 日期组件
-->
<template>
    <div class="time-group">
        <!-- 年月日 -->
        <span>{{ year }}-{{ fixZero(transformMonth) }}-{{ fixZero(date) }}</span>
        <!-- 时间 -->
        <div class="time">
            <span>{{ fixZero(hour) }}</span>
            <span class="flash">:</span>
            <span>{{ fixZero(minute) }}</span>
            <span class="flash">:</span>
            <span>{{ fixZero(seconds) }}</span>
        </div>
    </div>
</template>

<script setup>

const time = new Date()
const year = ref(time.getFullYear())
const month = ref(time.getMonth())
const date = ref(time.getDate())
const day = ref(time.getDay())
const hour = ref(time.getHours())
const minute = ref(time.getMinutes())
const seconds = ref(time.getSeconds())
const transformMonth = computed(() => month.value + 1)
const fixZero = (num) => {
    if (num < 10) {
        return `0${num}`
    }
    return `${num}`
}

const updateDate = () => {
    const newTime = new Date()
    year.value = newTime.getFullYear()
    month.value = newTime.getMonth()
    date.value = newTime.getDate()
    day.value = newTime.getDay()
    hour.value = newTime.getHours()
    minute.value = newTime.getMinutes()
    seconds.value = newTime.getSeconds()
}

let timer = ref()

onMounted(() => {
    timer.value = setInterval(() => {
        updateDate()
    }, 1000)
})

onUnmounted(() => {
    if (timer.value) {
        clearInterval(timer.value)
    }
})
</script>

<style lang="scss" scoped>
    .time-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 220px;
        height: 24px;
        font-family: HarmonyOS-Regular, serif;
        font-size: 20px;
        font-weight: 400;
        color: rgb(255 255 255 / 90%);
        -webkit-background-clip: text;

        > span {
            &:nth-of-type(1) {
                position: relative;
                font-family: HarmonyOS-Regular, serif;
                font-size: 20px;
                font-weight: 400;
                color: rgb(255 255 255 / 60%);
                letter-spacing: 1.9px;
            }
        }

        .time {
            font-family: HarmonyOS-Regular, serif;
            font-size: 20px;
            font-weight: 500;
            color: rgb(255 255 255 / 90%);
        }
    }

    .flash {
        position: relative;
        top: -2px;
    }
</style>
