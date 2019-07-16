// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import core from '@/core/core.config'
import 'lib-flexible/flexible.js'
import testCommon from '@/components/testCommon/testCommon'

//引入图标字体库
import 'font-awesome/css/font-awesome.css'
import store from "@/core/store/index"
//引入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/laz.jpg')
})
//引入title
Vue.use(require('vue-wechat-title'))

Vue.use(core)
Vue.use(testCommon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
