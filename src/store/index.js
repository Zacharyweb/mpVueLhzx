// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import counter from './modules/counter'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    counter
  }
})

// 循环获取modules下面的js文件并注册到store.modules里，同一个个引入注册
// const storeContext = require.context('@/store/modules', true, /\.js$/)
// storeContext.keys().forEach((modules) => {
//   store.registerModule(modules.replace(/(^\.\/)|(\.js$)/g, ''), storeContext(modules).default)
// })

Vue.prototype.$store = store
export default store
