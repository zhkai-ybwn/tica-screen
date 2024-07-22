/*
 * @Author: zhkai 2572429235@qq.com
 * @Date: 2023-09-25 09:58:44
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-05 16:44:56
 * @FilePath: \tica-energy-plant\public\config.js
 * @Description: 配置文件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
const baseUrlEnergy = 'https://blockchain.aiot-fuca.com:10001/energyBase'
// const baseUrlEnergy = 'http://192.168.0.24:8083/energyBase'
const baseUrlForecast = 'http://192.168.0.24:8088/loadForecast'
const baseUrlManage = 'http://192.168.1.116:8020/intelligentAlarm'

window.ENERGY = {
    showTool: true,
    urls: {
        quanchangnenghao: `${baseUrlEnergy}/dashboard/v1/holeFactEnergyConsumption`, // 全厂能耗
        guangfuzhiqufadian: `${baseUrlEnergy}/dashboard/v1/photovoltaicInfo`, // 光伏直驱发电
        kongtiaonenghaojiankong: `${baseUrlEnergy}/dashboard/v1/airconditionEC`, // 空调能耗监控
        weather: `${baseUrlEnergy}/weather/v1/getWeather`, // 天气
        guanjianshebeikaidonglv: `${baseUrlEnergy}/dashboard/v1/keyEquipmentAcRate`, // 关键设备开动率
        quyunenghao: `${baseUrlEnergy}/dashboard/v1/earaECProp`, // 区域能耗
        quanchangnenghaojiankong: `${baseUrlEnergy}/dashboard/v1/getHoleFactEcInfo`, // 全场能耗监控
    },
    looping: {
        quanchangnenghao: 900, // 全厂能耗数据刷新时间（秒）
        guangfuzhiqufadian: 900, // 光伏直驱发电数据刷新时间（秒）
        kongtiaonenghaojiankong: 900, // 空调能耗监控数据刷新时间（秒)
        weather: 900, // 天气数据刷新时间（秒)
        guanjianshebeikaidonglv: 900, // 关键设备开动率数据刷新时间（秒)
        quyunenghao: 900, // 区域能耗数据刷新时间（秒)
        quanchangnenghaojiankong: 900, // 全场能耗监控数据刷新时间（秒)
        nianyueri: 20000, // 全场能耗监控数据刷新时间（毫秒)
    },
    text: {
        weather: {
            unit: '℃',
        },
        quanchangnenghao: {
            day: {
                text: '今日全厂能耗',
                unit: 'kWh',
            },
            month: {
                text: '本月全厂能耗',
                unit: 'kWh',
            },
            year: {
                text: '今年全厂能耗',
                unit: 'kWh',
            },
        },
        quanchangnenghaoqushi: {
            moduleTitle: '全厂能耗监控',
            lineChartTitle: '全厂能耗趋势',
            legend1: '今日用能',
            legend2: '昨日用能',
            barChartTitle: '分区域能耗',
            legend3: '综合楼',
            legend4: '成品储运部',
            legend5: '其他',
            cirText1: '制造厂区',
            cirText2: '综合楼',
            cirText3: '测试中心',
        },
        guangfuzhiqufadian: {
            moduleTitle: '光伏直驱发电',
            dl: {
                text1: '今日发电量',
                unit1: 'kWh',
                text2: '累计发电量',
                unit2: 'kWh',
                text3: '主机用电量',
                unit3: 'kWh',
            },
            carbon: {
                text: '累计碳减排',
                unit: '吨',
            },
            gf: {
                text1: '当前功率',
                unit1: 'kW',
                text2: '背板温度',
                unit2: '℃',
                text3: '环境风速',
                unit3: 'm/s',
                text4: '环境温度',
                unit4: '℃',
                text5: '环境湿度',
                unit5: '%',
            },
        },
        kongtiaonenghaojiankong: {
            moduleTitle: '空调能耗监控',
            lineChartTitle: '',
            legend1: '今日能耗',
            legend2: '昨日能耗',
        },
        guanjianshebeikaidonglv: {
            moduleTitle: '关键设备开动率',
        },
        quyunenghao: {
            text1: '测试中心',
            unit1: 'kWh',
            text2: '思茂特生产',
            unit2: 'kWh',
            text3: '制造厂区',
            unit3: 'kWh',
            text4: '综合楼办公',
            unit4: 'kWh',
            text5: '展厅',
            unit5: 'kWh',
            text6: '食堂',
            unit6: 'kWh',
            btnText: '区域能耗',
        },
    },
    weather: {
        key: '83495d2853a5776af6d025591940589d',
        cityId: 320100,
    },
}
window.FORECAST = {
    titles: {
        upperTitle: '智慧',
        upperSubTitle: '负荷预测',
        middleTitle: '冷负荷预测',
        middleTitleEn: 'COOLING LOAD FORECAST',
        lowerTitle: '历史预测',
        lowerTitleEn: 'HISTORICAL FORECAST',
    },
    urls: {
        lengfuheyuce: `${baseUrlForecast}/predict/realTime`, // 冷负荷预测
        lishiyuce: `${baseUrlForecast}/predict/histPredict`, // 历史预测
        weather: `${baseUrlForecast}/weather/v1/getWeather`,
    },
    looping: {
        lengfuheyuce: 900, // 冷负荷预测数据刷新时间（秒）
        lishiyuce: 900, // 历史负荷预测数据刷新时间（秒）
    },
    text: {
        lengfuheyuce: {
            unitText: '单位：',
            unit: 'kW',
            legend1: '实际负荷',
            legend2: '预测负荷',
            infoText1: '当前负荷',
            infoUnit1: 'kW',
            infoText2: '预测负荷',
            infoUnit2: 'kW',
            infoText3: '精度',
            infoUnit3: '%',
            infoText4: '评价等级',
            infoUnit4: '',
            infoText5: '下小时预测',
            infoUnit5: 'kW',
            weatherText: '天气状态',
        },
        lishiyuce: {
            unitText: '单位：',
            unit: 'kW',
            legend1: '实际负荷',
            legend2: '预测负荷',
            title1: '昨日冷负荷预测',
            title2: '上周冷负荷预测',
            accText1: '昨日平均精度',
            accText2: '上周平均精度',
        },
    },
}
window.ENERGYMONITOR = {
    title: '天加能源基地',
    urls: {
        quanchangzongyongdianliang: `${baseUrlEnergy}/energyMonitor/v1/holeFactEnergyConsumption`, // 全厂总用电量概况
        // quanchangzongyongdianliang: '/fakerData/quanchangzongyongdianliang', // 全厂总用电量概况
        yongdianliangqushi: `${baseUrlEnergy}/energyMonitor/v1/holeFactECInfo`, // 用电量趋势分析
        // yongdianliangqushi: '/fakerData/yongdianliangqushi', // 用电量趋势分析
        quyuyongdianzhanbi: `${baseUrlEnergy}/energyMonitor/v1/areaEcProp`, // 区域用电量占比统计
        // quyuyongdianzhanbi: '/fakerData/quyuyongdianzhanbi', // 区域用电量占比统计
        guangfuzhiquyongdianliang: `${baseUrlEnergy}/energyMonitor/v1/photovoltaicEcTop3`, // 光伏直驱用电量统计排名TOP3
        // guangfuzhiquyongdianliang: '/fakerData/guangfuzhiquyongdianliang', // 光伏直驱用电量统计排名TOP3
        kongtiaoyongdianqushi: `${baseUrlEnergy}/energyMonitor/v1/airconditionEcInfo`, // 全厂空调用电量趋势分析
        // kongtiaoyongdianqushi: '/fakerData/kongtiaoyongdianqushi', // 全厂空调用电量趋势分析
        xingzhengzuzhiyongdian: `${baseUrlEnergy}/energyMonitor/v1/getAdmOrgECinfo`, // 行政组织用电量当月排名top5
        // xingzhengzuzhiyongdian: '/fakerData/xingzhengzuzhiyongdian', // 行政组织用电量当月排名top5
        guanjianshebeitongji: `${baseUrlEnergy}/energyMonitor/v1/keyEquipmentEC`, // 关键设备用电量排名统计
        // guanjianshebeitongji: '/fakerData/guanjianshebeitongji',
        tempDownload: `${baseUrlEnergy}/energyMonitor/v1/tempDownload`, // 行政组织用电情况上传模板下载
        admOrgECinfoUpload: `${baseUrlEnergy}/energyMonitor/v1/admOrgECinfoUpload`, // 行政组织用电情况上传
        equOverview: `${baseUrlEnergy}/keyequipment/v1/equOverview`, // 关键设备概况
        keyEquStatusMonitor: `${baseUrlEnergy}/keyequipment/v1/keyEquStatusMonitor`, // 关键设备状态监控
        lkeyEquInfo: `${baseUrlEnergy}/keyequipment/v1/keyEquInfo`, // 室内环境参数
        statusStatistics: `${baseUrlEnergy}/airConEquipment/v1/statusStatistics`, // 空调设备状态统计
        compBuildingECInfo: `${baseUrlEnergy}/airConEquipment/v1/compBuildingECInfo`, // 全厂空调用电量趋势分析
        shebeiyongdianliangtongji: `${baseUrlEnergy}/photovoltaic/v1/equipmentEC`, // 设备用电量统计
        eCTrendAnalysis: `${baseUrlEnergy}/photovoltaic/v1/eCTrendAnalysis`, // 光伏发电系统能耗趋势分析
        enviConditions: `${baseUrlEnergy}/photovoltaic/v1/enviConditions`, // 室外环境参数
        equipmentStatus: `${baseUrlEnergy}/photovoltaic/v1/equipmentStatus`, // 光伏设备状态查询
        onOffDetails: `${baseUrlEnergy}/airConEquipment/v1/on_OffDetails`, // 综合楼西区模型状态
        kongtiaoshebeixinxi: `${baseUrlEnergy}/airConEquipment/v1/overView`, // 空调设备信息
        last7DaysOpenRate: `${baseUrlEnergy}/airConEquipment/v1/last7DaysOpenRate`, // 关键设备7日内开动率
        keyEquipmentEcInfo: `${baseUrlEnergy}/keyequipment/v1/keyEquipmentEcInfo`, // 全厂关键设备用电量趋势分析
        keyEquECTop5: `${baseUrlEnergy}/keyequipment/v1/keyEquECTop5`, // 关键设备用电量排名Top5
        // 关键设备7日内开动率
        keyEquipmentAcRateHist: `${baseUrlEnergy}/keyequipment/v1/keyEquipmentAcRateHist`, 
        // 综合楼空调用电量统计
        compBuildingECStatistics: `${baseUrlEnergy}/airConEquipment/v1/compBuildingECStatistics`,
        eCStatistics: `${baseUrlEnergy}/photovoltaic/v1/eCStatistics`, // 光伏发电系统能耗统计
        pvOverview: `${baseUrlEnergy}/photovoltaic/v1/overView`, // 光伏系统概况
    },
    looping: {
        quanchangzongyongdianliang: 900, // 全厂总用电量概况（秒）
        yongdianliangqushi: 900, // 用电量趋势分析（秒）
        quyuyongdianzhanbi: 900, // 区域用电量占比统计（秒）
        guangfuzhiquyongdianliang: 900, // 光伏直驱用电量统计排名TOP3（秒）
        kongtiaoyongdianqushi: 900, // 全厂空调用电量趋势分析
        xingzhengzuzhiyongdian: 900, // 行政组织用电量当月排名top5
        guanjianshebeitongji: 900, // 关键设备用电量排名统计
        equOverview: 900, // 关键设备概况
        keyEquStatusMonitor: 900, // 关键设备状态监控
        lkeyEquInfo: 900, // 室内环境参数
        statusStatistics: 900, // 空调设备状态统计
        compBuildingECInfo: 900, // 全厂空调用电量趋势分析
        shebeiyongdianliangtongji: 900, // 设备用电量统计
        eCTrendAnalysis: 900, // 光伏发电系统能耗趋势分析
        enviConditions: 900, // 室外环境参数
        equipmentStatus: 900, // 光伏设备状态查询
        onOffDetails: 900, // 综合楼西区模型状态
        kongtiaoshebeixinxi: 900, // 空调设备信息
        last7DaysOpenRate: 900, // 关键设备7日内开动率
        keyEquipmentEcInfo: 900, // 全厂关键设备用电量趋势分析
        keyEquECTop5: 900, // 关键设备用电量排名Top5
        keyEquipmentAcRateHist: 900, // 关键设备7日内开动率
        compBuildingECStatistics: 900, // 综合楼空调用电量统计
        eCStatistics: 900, // 光伏发电系统能耗统计
        pvOverview: 900, // 光伏系统概况
    },
    text: {
        weather: {
            unit: '℃',
        },
        // 全厂总用电量概况
        quanchangzongyongdianliang: {
            title: '全厂总用电量概况',
            labelUnit: [
                { label: '今日全厂用电量', unit: 'kWh', width: '250px', type: 0 },
                { label: '本月全厂用电量', unit: 'kWh', width: '250px', type: 0 },
                { label: '全年全厂用电量', unit: 'kWh', width: '300px', type: 0 },
                { label: '全年CO2减排量', unit: 'kWh', width: '250px', type: 1 },
                { label: '全年节省费用', unit: '万元', width: '250px', type: 2 },
            ],
        },
        yongdianliangqushi: {
            title: '全厂用电量趋势分析',
        },
        quyuyongdianzhanbi: {
            title: '区域用电量占比统计',
            labelUnit: [
                { label: '能源制造厂区', unit: 'kWh' },
                { label: '思茂特生产', unit: 'kWh' },
                { label: '成品储运部', unit: 'kWh' },
                { label: '测试中心', unit: 'kWh' },
                { label: '综合楼', unit: 'kWh' },
            ],
        },
        quanchangkongtiaoyongdiantongji: {
            title: '光伏直驱用电量统计排名TOP3',
        },
        quanchangkongtiaoyongdianqushi: {
            title: '全厂空调用电量趋势分析',
        },
        guangfuyongdian: {
            title: '行政组织用电量占比排名top5',
        },
        guanjianshebeiyongdian: {
            title: '关键设备用电量排名统计',
        },
    },
}
window.MANAGE = {
    urls: {
        shishigaojingliebiao: `${baseUrlManage}/alarm/listRealAlarms`, // 查询实时告警列表
        // shishigaojingliebiao: '/fakerData/shishigaojingliebiao',
        chaxunquyu: `${baseUrlManage}/area/listAreaInfos`, // 查询区域
        chuligaojing: `${baseUrlManage}/alarm/dealAlarm`, // 处理告警
        getRealAlarmDetail: `${baseUrlManage}/alarm/getRealAlarmDetail`, // 查询实时告警详情
        lishigaojinglibiao: `${baseUrlManage}/alarm/listHisAlarms`, // 查询历史告警详情
    },
    looping: {
        shishigaojingliebiao: 300, // 查询实时告警列表刷新时间（秒）
    },
}
