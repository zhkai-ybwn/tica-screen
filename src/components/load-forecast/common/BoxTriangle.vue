<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-23 10:35:27
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-10-24 09:24:40
 * @FilePath: \tica-energy-plant\src\components\load-forecast\common\BoxTriangle.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
    <div class="box-triangle-container">
        <div class="left-triangle"></div>
        <div class="right-triangle"></div>
    </div>
</template>

<style lang="scss" scoped>
.box-triangle-container {
    .left-triangle {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 20px;
        height: 20px;

        @include set-back("../../../assets/imgs/load-forecast/left-triangle.png");
    }

    .right-triangle {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;

        @include set-back("../../../assets/imgs/load-forecast/right-triangle.png");
    }
}
</style>
