<!-- 综合楼东区2d -->
<template>
    <div class="back">
        <div class="floor">
            <div v-if="floor===1" class="one">
                <div
                    v-for="num in numbers1"
                    :key="num"
                    :class="[`${state.floors[num]}`=='true'?'on':'off',`one${num}`,
                             `${state.floors[num]}`] "
                >
                </div>
            </div>
            <div v-if="floor===2" class="two">
                <div
                    v-for="num in numbers2"
                    :key="num"
                    :class="[`${state.floors[num]}`=='true'?'on':'off',`two${num}`,
                             `${state.floors[num]}`] "
                >
                </div>
            </div>
            <div v-if="floor===3" class="three">
                <div
                    v-for="num in numbers3"
                    :key="num"
                    :class="[`${state.floors[num]}`=='true'?'on':'off',`three${num}`,
                             `${state.floors[num]}`] "
                >
                </div>
            </div>
        </div>
        <div class="text">
            <div class="on">
                <div class="sign"></div>
                <div class="label">运行中</div>
                <div class="value">{{ state.on || '-' }}<span>台</span></div>
            </div>
            <div class="off">
                <div class="sign"></div>
                <div class="label">关机</div>
                <div class="value">{{ state.off || '-' }}<span>台</span></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import axiosAPI from '@/axios/index'
import useEchart from '@/hooks/useEchart'
import { useStore } from '@/store/index'

const region = computed(() => useStore().region)
const floor = computed(() => useStore().floor)

const { looping } = useEchart()

const state = reactive({
    floors: [],
    on: 0,
    off: 0,
})

const numbers1 = Array.from({ length: 5 }, (_, index) => 158 + index)
numbers1.push(...Array.from({ length: 27 }, (_, index) => 180 + index))
numbers1.push(...Array.from({ length: 20 }, (_, index) => 1 + index))

const numbers2 = Array.from({ length: 12 }, (_, index) => 207 + index)
numbers2.push(...Array.from({ length: 27 }, (_, index) => 222 + index))
numbers2.push(...Array.from({ length: 1 }, (_, index) => 1 + index))

const numbers3 = Array.from({ length: 10 }, (_, index) => 259 + index)
numbers3.push(...Array.from({ length: 20 }, (_, index) => 273 + index))
numbers3.push(...Array.from({ length: 1 }, (_, index) => 1 + index))

const getData = async () => {
    state.floors = []
    const formData = new FormData()
    formData.append('location', getParam())
    const res = await axiosAPI.post(window.ENERGYMONITOR.urls.onOffDetails, formData)
    if (res.code === 200) {
        state.floors = res.data.on_OffDetails
        state.off = res.data.offNum
        state.on = res.data.onNum
    } 
}

const formatRegionFloor = (s) => {
    const regionFloorMap = {
        west_f1: '天加能源基地-综合楼-综合楼西区-一楼',
        west_f2: '天加能源基地-综合楼-综合楼西区-二楼',
        west_f3: '天加能源基地-综合楼-综合楼西区-三楼',
        east_f1: '天加能源基地-综合楼-综合楼东区-一楼',
        east_f2: '天加能源基地-综合楼-综合楼东区-二楼',
        east_f3: '天加能源基地-综合楼-综合楼东区-三楼',
    }
    return regionFloorMap[s] || ''
}

const getParam = () => {
    const regionStr = region.value === 0 ? 'east' : 'west'
    return formatRegionFloor(`${regionStr}_f${floor.value}`)
}

watch(floor, (newValue1, oldValue1) => {
    if (newValue1 !== oldValue1) {
        getData() 
    }
})

looping(getData, window.ENERGYMONITOR.looping.onOffDetails)
</script>
<style lang="scss" scoped>
.back {
    position: relative;
    width: 1388px;
    height: 552px;

    @include set-back("@/assets/imgs/energy-plant/east-back@2x.png");

    .floor {
        position: absolute;

        .on {
            width: 27px;
            height: 27px;

            @include set-back("@/assets/imgs/energy-plant/east-on@2x.png");
        }

        .off {
            width: 27px;
            height: 27px;

            @include set-back("@/assets/imgs/energy-plant/east-off@2x.png");
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

    .one {
        .one158 {
            position: absolute;
            top: 311px;
            left: 1046px;
        }

        .one159 {
            position: absolute;
            top: 339px;
            left: 1025px;
        }

        .one160 {
            position: absolute;
            top: 372px;
            left: 1010px;
        }

        .one161 {
            position: absolute;
            top: 401px;
            left: 987px;
        }

        .one162 {
            position: absolute;
            top: 291px;
            left: 1096px;
        }

        .one180 {
            position: absolute;
            top: 181px;
            left: 509px;
        }

        .one181 {
            position: absolute;
            top: 145px;
            left: 509px;
        }

        .one182 {
            position: absolute;
            top: 134px;
            left: 557px;
        }

        .one183 {
            position: absolute;
            top: 190px;
            left: 557px;
        }

        .one184 {
            position: absolute;
            top: 237px;
            left: 244px;
        }

        .one185 {
            position: absolute;
            top: 237px;
            left: 293px;
        }

        .one186 {
            position: absolute;
            top: 237px;
            left: 342px;
        }

        .one187 {
            position: absolute;
            top: 237px;
            left: 386px;
        }

        .one188 {
            position: absolute;
            top: 237px;
            left: 430px;
        }

        .one189 {
            position: absolute;
            top: 237px;
            left: 479px;
        }

        .one190 {
            position: absolute;
            top: 274px;
            left: 518px;
        }

        .one191 {
            position: absolute;
            top: 247px;
            left: 557px;
        }

        .one192 {
            position: absolute;
            top: 217px;
            left: 509px;
        }

        .one193 {
            position: absolute;
            top: 312px;
            left: 980px;
        }

        .one194 {
            position: absolute;
            top: 298px;
            left: 925px;
        }

        .one195 {
            position: absolute;
            top: 291px;
            left: 876px;
        }

        .one196 {
            position: absolute;
            top: 250px;
            left: 889px;
        }

        .one197 {
            position: absolute;
            top: 247px;
            left: 940px;
        }

        .one198 {
            position: absolute;
            top: 197px;
            left: 630px;
        }

        .one199 {
            position: absolute;
            top: 233px;
            left: 630px;
        }

        .one200 {
            position: absolute;
            top: 268px;
            left: 630px;
        }

        .one201 {
            position: absolute;
            top: 260px;
            left: 703px;
        }

        .one202 {
            position: absolute;
            top: 280px;
            left: 759px;
        }

        .one203 {
            position: absolute;
            top: 300px;
            left: 816px;
        }

        .one204 {
            position: absolute;
            top: 332px;
            left: 867px;
        }

        .one205 {
            position: absolute;
            top: 345px;
            left: 915px;
        }

        .one206 {
            position: absolute;
            top: 352px;
            left: 967px;
        }

        .one1 {
            position: absolute;
            top: 133px;
            left: 603px;
        }

        .one2 {
            position: absolute;
            top: 125px;
            left: 658px;
        }

        .one3 {
            position: absolute;
            top: 122px;
            left: 713px;
        }

        .one4 {
            position: absolute;
            top: 119px;
            left: 768px;
        }

        .one5 {
            position: absolute;
            top: 116px;
            left: 823px;
        }

        .one6 {
            position: absolute;
            top: 113px;
            left: 879px;
        }

        .one7 {
            position: absolute;
            top: 183px;
            left: 689px;
        }

        .one8 {
            position: absolute;
            top: 221px;
            left: 689px;
        }

        .one9 {
            position: absolute;
            top: 193px;
            left: 739px;
        }

        .one10 {
            position: absolute;
            top: 231px;
            left: 739px;
        }

        .one11 {
            position: absolute;
            top: 203px;
            left: 789px;
        }

        .one12 {
            position: absolute;
            top: 241px;
            left: 789px;
        }

        .one13 {
            position: absolute;
            top: 213px;
            left: 839px;
        }

        .one14 {
            position: absolute;
            top: 251px;
            left: 839px;
        }

        .one15 {
            position: absolute;
            top: 297px;
            left: 1223px;
        }

        .one16 {
            position: absolute;
            top: 317px;
            left: 1263px;
        }

        .one17 {
            position: absolute;
            top: 347px;
            left: 1243px;
        }

        .one18 {
            position: absolute;
            top: 422px;
            left: 1070px;
        }

        .one19 {
            position: absolute;
            top: 422px;
            left: 1110px;
        }

        .one20 {
            position: absolute;
            top: 433px;
            left: 1159px;
        }
    }

    .two {
        .two1 {
            position: absolute;
            top: 254px;
            left: 534px;
        }

        .two207 {
            position: absolute;
            top: 250px;
            left: 475px;
        }

        .two208 {
            position: absolute;
            top: 221px;
            left: 482px;
        }

        .two209 {
            position: absolute;
            top: 221px;
            left: 418px;
        }

        .two210 {
            position: absolute;
            top: 250px;
            left: 411px;
        }

        .two211 {
            position: absolute;
            top: 278px;
            left: 399px;
        }

        .two212 {
            position: absolute;
            top: 277px;
            left: 342px;
        }

        .two213 {
            position: absolute;
            top: 248px;
            left: 352px;
        }

        .two214 {
            position: absolute;
            top: 221px;
            left: 361px;
        }

        .two215 {
            position: absolute;
            top: 221px;
            left: 300px;
        }

        .two216 {
            position: absolute;
            top: 248px;
            left: 285px;
        }

        .two217 {
            position: absolute;
            top: 234px;
            left: 611px;
        }

        .two218 {
            position: absolute;
            top: 277px;
            left: 272px;
        }

        .two222 {
            position: absolute;
            top: 203px;
            left: 614px;
        }

        .two223 {
            position: absolute;
            top: 173px;
            left: 614px;
        }

        .two224 {
            position: absolute;
            top: 159px;
            left: 563px;
        }

        .two225 {
            position: absolute;
            top: 190px;
            left: 558px;
        }

        .two226 {
            position: absolute;
            top: 221px;
            left: 553px;
        }

        .two227 {
            position: absolute;
            top: 250px;
            left: 568px;
        }

        .two228 {
            position: absolute;
            top: 279px;
            left: 523px;
        }

        .two229 {
            position: absolute;
            top: 279px;
            left: 461px;
        }

        .two230 {
            position: absolute;
            top: 237px;
            left: 850px;
        }

        .two231 {
            position: absolute;
            top: 226px;
            left: 813px;
        }

        .two232 {
            position: absolute;
            top: 207px;
            left: 759px;
        }

        .two233 {
            position: absolute;
            top: 185px;
            left: 673px;
        }

        .two234 {
            position: absolute;
            top: 197px;
            left: 710px;
        }

        .two235 {
            position: absolute;
            top: 250px;
            left: 758px;
        }

        .two236 {
            position: absolute;
            top: 278px;
            left: 729px;
        }

        .two237 {
            position: absolute;
            top: 293px;
            left: 695px;
        }

        .two238 {
            position: absolute;
            top: 286px;
            left: 654px;
        }

        .two239 {
            position: absolute;
            top: 238px;
            left: 707px;
        }

        .two240 {
            position: absolute;
            top: 331px;
            left: 884px;
        }

        .two241 {
            position: absolute;
            top: 323px;
            left: 844px;
        }

        .two242 {
            position: absolute;
            top: 311px;
            left: 804px;
        }

        .two243 {
            position: absolute;
            top: 300px;
            left: 761px;
        }

        .two244 {
            position: absolute;
            top: 269px;
            left: 801px;
        }

        .two245 {
            position: absolute;
            top: 276px;
            left: 844px;
        }

        .two246 {
            position: absolute;
            top: 286px;
            left: 882px;
        }

        .two247 {
            position: absolute;
            top: 299px;
            left: 919px;
        }

        .two248 {
            position: absolute;
            top: 246px;
            left: 909px;
        }
    }

    .three {
        .three1 {
            position: absolute;
            top: 215px;
            left: 805px;
        }

        .three259 {
            position: absolute;
            top: 227px;
            left: 334px;
        }

        .three260 {
            position: absolute;
            top: 227px;
            left: 382px;
        }

        .three261 {
            position: absolute;
            top: 227px;
            left: 430px;
        }

        .three262 {
            position: absolute;
            top: 237px;
            left: 493px;
        }

        .three263 {
            position: absolute;
            top: 278px;
            left: 609px;
        }

        .three264 {
            position: absolute;
            top: 277px;
            left: 669px;
        }

        .three265 {
            position: absolute;
            top: 272px;
            left: 406px;
        }

        .three266 {
            position: absolute;
            top: 272px;
            left: 362px;
        }

        .three267 {
            position: absolute;
            top: 272px;
            left: 315px;
        }

        .three268 {
            position: absolute;
            top: 271px;
            left: 264px;
        }

        .three273 {
            position: absolute;
            top: 227px;
            left: 281px;
        }

        .three274 {
            position: absolute;
            top: 290px;
            left: 809px;
        }

        .three275 {
            position: absolute;
            top: 267px;
            left: 726px;
        }

        .three276 {
            position: absolute;
            top: 237px;
            left: 744px;
        }

        .three277 {
            position: absolute;
            top: 202px;
            left: 764px;
        }

        .three278 {
            position: absolute;
            top: 198px;
            left: 664px;
        }

        .three279 {
            position: absolute;
            top: 195px;
            left: 612px;
        }

        .three280 {
            position: absolute;
            top: 191px;
            left: 555px;
        }

        .three281 {
            position: absolute;
            top: 152px;
            left: 555px;
        }

        .three282 {
            position: absolute;
            top: 143px;
            left: 493px;
        }

        .three283 {
            position: absolute;
            top: 187px;
            left: 493px;
        }

        .three284 {
            position: absolute;
            top: 323px;
            left: 786px;
        }

        .three285 {
            position: absolute;
            top: 322px;
            left: 852px;
        }

        .three286 {
            position: absolute;
            top: 335px;
            left: 911px;
        }

        .three287 {
            position: absolute;
            top: 343px;
            left: 972px;
        }

        .three288 {
            position: absolute;
            top: 297px;
            left: 980px;
        }

        .three289 {
            position: absolute;
            top: 289px;
            left: 921px;
        }

        .three290 {
            position: absolute;
            top: 282px;
            left: 868px;
        }

        .three291 {
            position: absolute;
            top: 254px;
            left: 829px;
        }

        .three292 {
            position: absolute;
            top: 221px;
            left: 854px;
        }
    }
}
</style>
