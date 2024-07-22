/*
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-02-21 14:22:08
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2023-11-06 16:20:44
 * @FilePath: \tica-energy-plant\.stylelintrc.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
module.exports = {
    extends: [
        'stylelint-config-standard-scss', 
        'stylelint-config-recommended-vue/scss',
        'stylelint-config-recess-order',
    ],
    // customSyntax: 'postcss-html',
    // plugins: ["stylelint-scss", "stylelint-order"],
    rules: {
        'indentation': 4,
        'property-no-vendor-prefix': null,
        'at-rule-no-vendor-prefix': null,
        // 'selector-pseudo-element-no-unknown': [
        //     true,
        //     {
        //         ignorePseudoElements: ['v-deep']
        //     }
        // ],
        'number-leading-zero': 'never',
        // 'no-descending-specificity': null,
        // 'font-family-no-missing-generic-family-keyword': null,
        // 'selector-type-no-unknown': null,
        // 'at-rule-no-unknown': null,
        // 'no-duplicate-selectors': null,
        // 'no-empty-source':null,
        // 'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }]
    }
}
