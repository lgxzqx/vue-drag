// 注册组件
import Vue from 'vue'
const components = [
    'Picture',
    'VText',
    'VButton',
    'VBanner01',
    'VBanner02',
    'VListtext01',
    'VListimage01',
    'VListtextarea01',
    'VTitle01'
]

components.forEach(key => {
    Vue.component(key, () => import(`@/custom-component/${key}`))
})