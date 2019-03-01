import Vue from 'vue'
import App from './App'
import handleHttp from '@/http'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import '@/asset/css/common.less'
import '@/asset/css/value.less'
Vue.use(MpvueRouterPatch)
Vue.prototype.$http = handleHttp
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
