/*
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 10:40:39
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-12-27 12:56:09
 * @FilePath: \tica-energy-plant\src\mock\index.js
 * @Description: mock数据
 */
import Mock from 'mockjs'
// 主页mock数据开始
// 全厂能耗
import quanchangnenghao from '#/mock/home/quanchangnenghao.json'
// 光伏直驱发电
import guangfuzhiqufadian from '#/mock/home/guangfuzhiqufadian.json'
// 空调能耗监控
import kongtiaonenghaojiankong from '#/mock/home/kongtiaonenghaojiankong.json'
// 天气
import weather from '#/mock/home/weather.json'
// 关键设备开动率
import guanjianshebeikaidonglv from '#/mock/home/guanjianshebeikaidonglv.json'
// 区域能耗
import quyunenghao from '#/mock/home/quyunenghao.json'
// 全场能耗监控
import quanchangnenghaojiankong from '#/mock/home/quanchangnenghaojiankong.json'

// 负荷预测mock数据开始
// 冷负荷预测
import lengfuheyuce from '#/mock/load-forecast/lengfuheyuce.json'
// 历史预测
import lishiyuce from '#/mock/load-forecast/lishiyuce.json'

// 全厂能源监控mock数据开始
// 全厂总用电量概况
import quanchangzongyongdianliang from '#/mock/energy-plant/quanchangzongyongdianliang.json'
// 用电量趋势分析
import yongdianliangqushi from '#/mock/energy-plant/yongdianliangqushi.json'
// 区域用电量占比统计
import quyuyongdianzhanbi from '#/mock/energy-plant/quyuyongdianzhanbi.json'
// 光伏直驱用电量统计排名TOP3
import guangfuzhiquyongdianliang from '#/mock/energy-plant/guangfuzhiquyongdianliang.json'
// 全厂空调用电量趋势分析
import kongtiaoyongdianqushi from '#/mock/energy-plant/kongtiaoyongdianqushi.json'
// 行政组织用电量当月排名top5
import xingzhengzuzhiyongdian from '#/mock/energy-plant/xingzhengzuzhiyongdian.json'
// 关键设备用电量排名统计
import guanjianshebeitongji from '#/mock/energy-plant/guanjianshebeitongji.json'
// 设备态势监控mock数据开始
// 关键设备概况
import equOverview from '#/mock/energy-plant/equOverview.json'
// 关键设备状态监控
import keyEquStatusMonitor from '#/mock/energy-plant/keyEquStatusMonitor.json'
// 室内环境参数
import keyEquInfo from '#/mock/energy-plant/keyEquInfo.json'
// 空调设备状态统计
import statusStatistics from '#/mock/energy-plant/statusStatistics.json'
// 全厂空调用电量趋势分析
import compBuildingECInfo from '#/mock/energy-plant/compBuildingECInfo.json'
// 设备用电量统计
import shebeiyongdianliangtongji from '#/mock/energy-plant/shebeiyongdianliangtongji.json'
// 光伏发电系统能耗趋势分析
import eCTrendAnalysis from '#/mock/energy-plant/eCTrendAnalysis.json'
// 室外环境参数
import enviConditions from '#/mock/energy-plant/enviConditions.json'
// 光伏设备状态查询
import equipmentStatus from '#/mock/energy-plant/equipmentStatus.json'
// 综合楼西区模型状态
import onOffDetails from '#/mock/energy-plant/onOffDetails.json'
// 空调设备信息
import kongtiaoshebeixinxi from '#/mock/energy-plant/kongtiaoshebeixinxi.json'
// 关键设备7日内开动率
import last7DaysOpenRate from '#/mock/energy-plant/last7DaysOpenRate.json'
// 全厂关键设备用电量趋势分析
import keyEquipmentEcInfo from '#/mock/energy-plant/keyEquipmentEcInfo.json'

// 智能运维mock数据开始
// 查询实时告警列表
import shishigaojingliebiao from '#/mock/manage/alarm/shishigaojingliebiao.json'

export function initMock() {
    // if (!window.MOCK || window.MOCK === 'production') return Promise.resolve()
    // 主页mock数据开始
    // #region 
    // 全厂能耗
    Mock.mock(/fakerData\/quanchangnenghao/, () => Mock.mock(quanchangnenghao))
    // 光伏直驱发电
    Mock.mock(/fakerData\/guangfuzhiqufadian/, () => Mock.mock(guangfuzhiqufadian))
    // 空调能耗监控
    Mock.mock(/fakerData\/kongtiaonenghaojiankong/, () => Mock.mock(kongtiaonenghaojiankong))
    // 天气
    Mock.mock(/fakerData\/weather/, () => Mock.mock(weather))
    // 关键设备开动率
    Mock.mock(/fakerData\/guanjianshebeikaidonglv/, () => Mock.mock(guanjianshebeikaidonglv))
    // 区域能耗
    Mock.mock(/fakerData\/quyunenghao/, () => Mock.mock(quyunenghao))
    // 全场能耗监控
    Mock.mock(/fakerData\/jiankongquanchangnenghao/, () => Mock.mock(quanchangnenghaojiankong))
    // #endregion
    // 负荷预测mock数据开始
    // #region
    // 冷负荷预测
    Mock.mock(/fakerData\/lengfuheyuce/, () => Mock.mock(lengfuheyuce))
    // 历史预测
    Mock.mock(/fakerData\/lishiyuce/, () => Mock.mock(lishiyuce))
    // #endregion
    // 全厂能源监控mock数据开始
    // 全厂总用电量概况
    Mock.mock(/fakerData\/quanchangzongyongdianliang/, () => Mock.mock(quanchangzongyongdianliang))
    // 用电量趋势分析
    Mock.mock(/fakerData\/yongdianliangqushi/, () => Mock.mock(yongdianliangqushi))
    // 区域用电量占比统计
    Mock.mock(/fakerData\/quyuyongdianzhanbi/, () => Mock.mock(quyuyongdianzhanbi))
    // 光伏直驱用电量统计排名TOP3
    Mock.mock(/fakerData\/guangfuzhiquyongdianliang/, () => Mock.mock(guangfuzhiquyongdianliang))
    // 全厂空调用电量趋势分析
    Mock.mock(/fakerData\/kongtiaoyongdianqushi/, () => Mock.mock(kongtiaoyongdianqushi))
    // 行政组织用电量当月排名top5
    Mock.mock(/fakerData\/xingzhengzuzhiyongdian/, () => Mock.mock(xingzhengzuzhiyongdian))
    // 关键设备用电量排名统计
    Mock.mock(/fakerData\/guanjianshebeitongji/, () => Mock.mock(guanjianshebeitongji))
    // 关键设备概况
    Mock.mock(/fakerData\/equOverview/, () => Mock.mock(equOverview))
    // 关键设备状态监控
    Mock.mock(/fakerData\/keyEquStatusMonitor/, () => Mock.mock(keyEquStatusMonitor))
    // 室内环境参数
    Mock.mock(/fakerData\/lkeyEquInfo/, () => Mock.mock(keyEquInfo))
    // 空调设备状态统计
    Mock.mock(/fakerData\/statusStatistics/, () => Mock.mock(statusStatistics))
    // 全厂空调用电量趋势分析
    Mock.mock(/fakerData\/compBuildingECInfo/, () => Mock.mock(compBuildingECInfo))
    // 设备用电量统计
    Mock.mock(/fakerData\/shebeiyongdianliangtongji/, () => Mock.mock(shebeiyongdianliangtongji))
    // 光伏发电系统能耗趋势分析
    Mock.mock(/fakerData\/eCTrendAnalysis/, () => Mock.mock(eCTrendAnalysis))
    // 室外环境参数
    Mock.mock(/fakerData\/enviConditions/, () => Mock.mock(enviConditions))
    // 光伏设备状态查询
    Mock.mock(/fakerData\/equipmentStatus/, () => Mock.mock(equipmentStatus))
    // 综合楼西区模型状态
    Mock.mock(/fakerData\/onOffDetails/, () => Mock.mock(onOffDetails))
    // 空调设备信息
    Mock.mock(/fakerData\/kongtiaoshebeixinxi/, () => Mock.mock(kongtiaoshebeixinxi))
    // 关键设备7日内开动率
    Mock.mock(/fakerData\/last7DaysOpenRate/, () => Mock.mock(last7DaysOpenRate))
    // 全厂关键设备用电量趋势分析
    Mock.mock(/fakerData\/keyEquipmentEcInfo/, () => Mock.mock(keyEquipmentEcInfo))
    // 智能运维mock数据开始
    // 查询实时告警列表
    Mock.mock(/fakerData\/shishigaojingliebiao/, () => Mock.mock(shishigaojingliebiao))
}
