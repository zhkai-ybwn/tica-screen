<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-13 09:09:59
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-25 12:57:09
 * @FilePath: \tica-energy-plant\src\components\energy-plant\common\TripleLineChart.vue
 * @Description: 三折线图
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div ref="echartRef" :style="{ width: `${props.config.width}px`, height: `${props.config.height}px` }">
    </div>
</template>

<script setup>
import useEchart from '@/hooks/useEchart'
import moment from 'moment'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({
            mainEngry: [],
            onGrid: [],
            phoGenEc: [],
        }),
    },
    config: {
        type: Object,
        default: () => ({}),
    },
    label: {
        type: Array,
        default: () => ([]),
    },
    currentIndex: {
        type: Number,
        default: 0,
    },
})
const mainEngry = computed(() => props.data.mainEngry)
const onGrid = computed(() => props.data.onGrid)
const phoGenEc = computed(() => props.data.phoGenEc)
const getXLabel = (value) => {
    switch (props.currentIndex) {
        case 0:
            return moment(value).format('HH:mm')
        case 1:
            return moment(value).format('MM-DD')
        case 2:
            return `${moment(value).format('MM')}月`
    }
}
const seriesLabel = ['主机耗电量', '并网发电量', '光伏发电量']
const getSeries = () => {
    const series = []
    const mainEngryArr = []
    mainEngry.value.forEach((t) => {
        mainEngryArr.push([moment(Number(t.ts)).format(), t.v])
    })
    const onGridArr = []
    onGrid.value.forEach((t) => {
        onGridArr.push([moment(Number(t.ts)).format(), t.v])
    })
    const phoGenEcArr = []
    phoGenEc.value.forEach((t) => {
        phoGenEcArr.push([moment(Number(t.ts)).format(), t.v])
    })
    const mainEngrySeries = {
        name: props.label[0],
        type: 'line',
        smooth: props.config.smooth1,
        symbolSize: 22,
        z: 11,
        // eslint-disable-next-line max-len
        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        showSymbol: false,
        lineStyle: props.config.lineStyle[0],
        areaStyle: props.config.areaStyle[0],
        data: mainEngryArr,
    }
    const onGridSeries = {
        name: props.label[1],
        type: 'line',
        showSymbol: false,
        smooth: props.config.smooth1,
        symbolSize: 22,
        z: 11,
        // eslint-disable-next-line max-len
        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        connectNulls: true,
        lineStyle: props.config.lineStyle[1],
        areaStyle: props.config.areaStyle[1],
        data: onGridArr,
    }
    const phoGenEcSeries = {
        name: props.label[2],
        type: 'line',
        showSymbol: false,
        smooth: props.config.smooth1,
        symbolSize: 22,
        z: 11,
        // eslint-disable-next-line max-len
        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAABCpJREFUWEfVmduOVFUQhr9C5BCJ4iESBxXxMNFoSLwQghdeYIzhWuMb+ADEB0AeQMM1PoGJ3psYbkwIAW+IgciZ0WEwCIyJZw5S5m9rTfY03b13rd0zhpV0OuleVevftf9V9a9aRo/h7muBx4BHgY3Aw8CDgH7XuAP8Gd+/Ar8Ai2am36uG1Vi5u0C+ADwE3AYE5hbwF/APcDf8rgHWAQ8Am2K+vq8CV8zs5+z6KcDu/iTwcoASyMUGuK5r6yEeAZ4IgwtmttDVuBNgd9frfi2ipej80XWBlnl6Q88AfwMnzExvaOJoBezu24DtwHXgRpvDyv8VbdFszsx+mORjImB3fzEicCG4Womnk5k2q/bFvJmdH2cxFnCAnQEEtmyiTiv3mCTQz8WGHAl6JOD/CWx5TmWU58eBvgdwcFYGq0GDcS9DoF8CLg5zehngyAa7NHEVONvGHNFDm/14M3sMA34zisBKZYM2kMP/K3tsMLNvyx9LgN19KzALnM56XeH5oue5UhWbgN8S0adYFKb1HCouM2b2jRwOADdK7rlprTJlP4ry92a2WAC/DtwMNVW7lvj/LrAXeDqcnAJOAp8Al2sdh+4YcNncXbtxDyDnUlrZIUn5EfBhi+FnAVyiKTuU5lQFjwiwFNgg52W9hP79IoRRF3NF+/3IRF3mN+f8t/ncXXJxQ2jUrJMDHSI77FOR3p9dKGhxS4DfCO5mJaNk4bGKhWXyHnA0aSvqbRRgbZafQpNmfBwEPsgYNObWRFknl20C/DZwpmLDfQ28Wgl4HpAEyAxtvFkBVir6LmMZc1Vk+gxJ1+zYcV8CrqXE8UaByEZKOf+dpNESJaQhdI7SMT0zalJa8f85sC+zWPQ9togSKstqdmQr0G7gy+SiZfrOilKtfsbmUjhUnnUqzo6aKB8CPs4uBGxRo2YapVlR7pre+pRmaYmzRfyoeOgMt5LiR5H9tIJ6ehnacArK4SIvVZ7VfamhRXm7KtVSbXJcIq4C8VV8sqW4yRo1G9eZ2YkCWF2XVyoVWwUd0yZSk6d1TLofjkjKDk8tOyLpeXvq4nTIEgaSv2fMbCAFho/50+ByAkvrVB3zN5nZEv9HNVKU1OcqKl/r6skJkpNqpBwb20gJaqi9OjiOVKa5JK6R0wVWGCa3qoqpuytJq7Gic15Nbu4DujQDF8xMtWHZmNRuLaBrhFEt4Ilg79l0w6tEpJ+NSGfVXBZ0ocGPoyJbnHW9MlCTWRcwfSrhpAdQNngcuNTryqDBaV3KSIauD1n4ezZ8Y+arKEiFqet0ciqXMs2F3F3nMN176M1cCyGT3ZTiqbSBrr50BTYouV0D0EqJUY6iKiqLqGukfoYirm+BF9fLQwicPnpD0twCqVtSzT1vZroZTY0qwA2qNK9uy7WtwDWvbnVT+lucanpf3f4LCKpLgoLQOEQAAAAASUVORK5CYII=',
        connectNulls: true,
        lineStyle: props.config.lineStyle[2],
        areaStyle: props.config.areaStyle[2],
        data: phoGenEcArr,
    }
    series.push(mainEngrySeries)
    series.push(onGridSeries)
    series.push(phoGenEcSeries)
    return series
}
const getOptions = () => ({
    grid: props.config.grid,
    // 提示框组件
    tooltip: {
        backgroundColor: 'rgba(10, 20, 45, 0.55)',
        borderColor: 'rgba(255, 255, 255, 0.7)',
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#fff',
                type: 'solid',
            },
            z: 1,
        },
        extraCssText: 'backdrop-filter: blur(4px);',
        textStyle: {
            color: 'rgba(255, 255, 255, 0.90)',
        },
        formatter: (params) => {
            let tip = ''
            if (params != null && params.length > 0) {
                let date = new Date(params[0].value[0])
                let timeStr = ''
                if (props.currentIndex === 0) {
                    timeStr = `<span style="color: #fff">${moment(date).format('HH:mm')}</span>`
                } else if (props.currentIndex === 1) {
                    timeStr = `<span style="color: #fff">${moment(date).format('MM-DD')}</span>`
                } else {
                    timeStr = `<span style="color: #fff">${moment(date).format('YYYY-MM')}</span>`
                }
                tip += timeStr + '<br/>' + params[0].name
                for (let i = 0; i < params.length; i++) {
                    const marker1 = `<span style="display:inline-block;
                    margin-right:4px;width:10px;
                    height:10px;
                    background: ${props.config.tooltipColors[0]};"></span>`
                    const marker2 = `<span style="display:inline-block;margin-right:4px;
                    width:10px;height:10px;
                    background: ${props.config.tooltipColors[1]};"></span>`
                    const marker3 = `<span style="display:inline-block;margin-right:4px;
                    width:10px;height:10px;
                    background: ${props.config.tooltipColors[2]};"></span>`
                    const spaceSign = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                    const unit = '<span style="font-size: 10px;">&nbsp;kWh</span><br />'
                    tip += `${seriesLabel.indexOf(params[i].seriesName) === 0 ? marker1
                        : seriesLabel.indexOf(params[i].seriesName) === 1 ? marker2 : marker3}
                  ${params[i].seriesName}${spaceSign}${params[i].value[1]}${unit}`
                }
            }
            return tip
        },
    },
    xAxis: [
        {
            type: 'category', // x轴为 时间轴
            axisLabel: {
                color: 'rgba(255,255,255,0.85)',
                fontSize: 14,
                fontFamily: 'HarmonyOS-Regular',
                fontWeight: 400,
                formatter: (value) => getXLabel(value),
            },
            axisTick: { show: false },
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    width: 1,
                    color: 'transparent',
                },
            },
            splitLine: {
                show: true,
                lineStyle:
                {
                    width: 1,
                    color: 'rgba(255, 255, 255, 0.2)',
                    type: 'dashed',
                },
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
                    shadowOffsetX: 100,
                },
            },
        },
    ],
    legend: {
        show: true,
        top: 0,
        right: 0,
        itemGap: 40,
        itemWidth: 19,
        itemHeight: 8,
        data: [
            { icon: props.config.legendInfo[0], name: props.label[0] },
            { icon: props.config.legendInfo[1], name: props.label[1] },
            { icon: props.config.legendInfo[2], name: props.label[2] },
        ],
        textStyle: {
            color: '#FFF',
            fontFamily: 'SourceHanSansCN-Normal, sans-serif',
            fontSize: 14,
            fontWeight: 400,
        },
    },
    yAxis: [
        {
            name: '单位：kWh',
            nameTextStyle: {
                color: 'rgba(255, 255, 255, 0.84)',
                fontFamily: 'SourceHanSansCN-Normal, sans-serif',
                fontSize: 14,
            },
            type: 'value',
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                color: 'rgba(255,255,255,0.85)',
                fontSize: 14,
                fontFamily: 'SourceHanSansCN-Normal, sans-serif',
                fontWeight: 400,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: 'rgba(255, 255, 255, 0.2)',
                    type: 'dashed',
                },
            },
        },
    ],

    series: getSeries(),
})
const { echartRef, renderChart } = useEchart(getOptions, { isWatch: true, watchData: mainEngry })
renderChart(true, true)
</script>
