import testFn from '@/components/testCommon/testCommon'
import apis from '@/core/api/index'
import directive from '@/core/directive/index.js'
import global from '@/core/api/index'
import fliter from "@/core/fliter/index"
import $ from 'jquery';
export default (Vue) => {
testFn(Vue)
directive(Vue)
fliter(Vue)
Vue.prototype.$global=global;
Vue.prototype.$apis=apis;
Vue.prototype.$eventHub=new Vue();
Vue.prototype.$=$;
}