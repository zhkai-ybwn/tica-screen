<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 13:17:25
 * @LastEditors: zhangkai 2572429235@qq.com
 * @LastEditTime: 2023-09-21 11:21:36
 * @FilePath: \tica-energy-plant\src\components\common\ProgressBar.vue
 * @Description: 进度条
-->
<!-- 进度条 -->
<template>
    <div class="progress-container">
        <!-- 进度条外部框 -->
        <div class="progress-bar animation">
            <!-- 进度条内部框 -->
            <div
                class="inner"
                :style="{
                    '--progress': `${percent}%`,
                    '--colors2': colors[0],
                    '--colors3': colors[1],
                }"
            >
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    percent: {
        type: Number,
        default: 0,
    },
    colors: {
        type: Array,
        default: () => [
            'rgba(24, 144, 255, 1)',
            'rgba(24, 144, 255, 0.2)',
        ],
    },
    config: {
        type: Object,
        default: () => ({
            width: 126,
            height: 9,
        }),
    },
})
const widthx = `${props.config.width}px`
const heightx = `${props.config.height}px`
</script>
<style lang="scss" scoped>
@keyframes loading {
    from {
        width: 0;
    }

    to {
        width: var(--progress);
    }
}

.progress-container {
    position: relative;
    width: v-bind("widthx");
    height: v-bind("heightx");
    background: rgb(255 255 255 / 10%);

    .progress-bar {
        position: relative;
        width: v-bind("widthx");
        height: v-bind("heightx");

        .inner {
            position: relative;
            display: block;
            width: var(--progress);
            height: v-bind("heightx");
            content: "";
            background:
                linear-gradient(
                    270deg,
                    var(--colors2) 0%,
                    var(--colors3) 100%
                );
            animation: loading .5s linear;
        }
    }
}
</style>
