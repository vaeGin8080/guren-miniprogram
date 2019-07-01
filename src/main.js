import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
import store from './store/store'
Vue.prototype.$fly = fly
Vue.prototype.$store = store
Vue.prototype.$host = "https://www.51yst.cn"
Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  traceUser: true
})

const app = new Vue(App)
app.$mount()
