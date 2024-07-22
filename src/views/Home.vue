<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 09:15:01
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-05 16:41:56
 * @FilePath: \tica-energy-plant\src\views\Home.vue
-->
<template>
    <ScaleBox
        :width="1920"
        :height="1080"
        bgc="transparent"
        :delay="100"
        :is-flat="true"
    >
        <div :class="['home-bg', showTool ? 'home-qian' : 'home-shen']">
            <DateTime v-if="showTool" class="locate time"></DateTime>
            <WeatherInfo v-if="showTool" class="locate weather"></WeatherInfo>
            <div v-if="showTool" class="locate home-title">
                <div class="logo"></div>
                <div class="title-text1" text="能源管理平台">能源管理平台</div>
                <div class="title-text2" text="能源管理平台">能源管理平台</div>
            </div>
            <div class="locate left-content">
                <QuanChangNengHao></QuanChangNengHao>
                <QuanChangNengHaoJianKong class="qcnhjk"></QuanChangNengHaoJianKong>
            </div>
            <div class="locate center-content">
                <QuYuNengHao class="qynh"></QuYuNengHao>
                <GuangFuZhiQuFaDian class="gfzqfd"></GuangFuZhiQuFaDian>
            </div>
            <div class="locate right-content">
                <KongTiaoNengHaoJianKong class="ktnhjk"></KongTiaoNengHaoJianKong>
                <GuanJianSheBeiKaiDongLv class="gjsbkdl"></GuanJianSheBeiKaiDongLv>
            </div>
        </div>
    </ScaleBox>
</template>
<script setup>
import WeatherInfo from '@/components/home/common/WeatherInfo.vue'
import DateTime from '@/components/home/common/DateTime.vue'
import QuanChangNengHao from '@/components/home/left/QuanChangNengHao.vue'
import QuanChangNengHaoJianKong from '@/components/home/left/QuanChangNengHaoJianKong.vue'
import GuangFuZhiQuFaDian from '@/components/home/center/GuangFuZhiQuFaDian.vue'
import KongTiaoNengHaoJianKong from '@/components/home/right/KongTiaoNengHaoJianKong.vue'
import GuanJianSheBeiKaiDongLv from '@/components/home/right/GuanJianSheBeiKaiDongLv.vue'
import QuYuNengHao from '@/components/home/center/QuYuNengHao.vue'
import ScaleBox from 'vue3-scale-box'

const showTool = ref(window.ENERGY.showTool)

</script>

<style lang="scss" scoped>
.home-shen {
    @include set-back("@/assets/imgs/home/home_shen.png");
}

.home-qian {
    @include set-back("@/assets/imgs/home/home_qian.png");
}

.home-bg {
    position: relative;
    width: 1920px;
    height: 1080px;

    // @include set-back("../assets/imgs/home/home.png");

    .locate {
        position: absolute;
    }

    .time {
        top: 46px;
        left: 30px;
    }

    .weather {
        top: 38px;
        right: 30px;
    }

    .home-title {
        top: 0;
        left: 0;
        width: 1920px;
        height: 117px;

        @include set-back("../assets/imgs/home/home-title.png");

        .logo {
            position: absolute;
            top: 23px;
            left: 779px;
            width: 120px;
            height: 31px;

            @include set-back("../assets/imgs/home/logo.png");
        }

        .title-text1 {
            position: absolute;
            top: 10px;
            left: 903px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-size: 40px;
            font-style: normal;
            font-weight: 400;
            line-height: 142.2%; /* 56.88px */
            letter-spacing: 2.4px;
            background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
            filter: blur(2px);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .title-text1::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 4px 3px rgb(0 123 255 / 50%);
            content: attr(text);
        }

        .title-text2 {
            position: absolute;
            top: 10px;
            left: 903px;
            font-family: YouSheBiaoTiHei, sans-serif;
            font-size: 40px;
            font-style: normal;
            font-weight: 400;
            line-height: 142.2%;
            letter-spacing: 2.4px;
            background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .title-text2::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 4px rgb(43 102 255 / 80%);
            content: attr(text);
        }
    }

    .left-content {
        top: 130px;
        left: 30px;

        .qcnhjk {
            position: absolute;
            top: 150px;
            left: 0;
        }
    }

    .center-content {
        .gfzqfd {
            position: absolute;
            top: 760px;
            left: 562px;
        }

        .qynh {
            position: absolute;
            top: 130px;
            left: 562px;
        }
    }

    .right-content {
        top: 130px;
        right: 30px;

        .ktnhjk {
            position: absolute;
            top: 0;
            right: 0;
        }

        .gjsbkdl {
            position: absolute;
            top: 342px;
            right: 0;
        }
    }
}
</style>
