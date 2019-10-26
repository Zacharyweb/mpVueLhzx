import Vue from 'vue'
import App from './App'
import handleHttp from '@/http'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import '@/asset/css/common.less'
import '@/asset/css/value.less'
import T from './utils/i18n.js';
import locales from './utils/locales.js';
T.registerLocale(locales);
Vue.prototype.$t = T;
Vue.use(MpvueRouterPatch)
Vue.prototype.$http = handleHttp
Vue.prototype.showToast = function(txt,duration){
    wx.showToast({
        title: txt,
        icon: 'none',
        duration: duration || 1500
    })
};
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
