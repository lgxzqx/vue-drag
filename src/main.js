import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/custom-component'

import App from './App.vue'

import '@/styles/animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/component.css'
// import '@/styles/quill.css'

Vue.use(ElementUI, { size: 'small'})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
