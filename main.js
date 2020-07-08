import Vue from 'vue'
import App from './App'
import isLogin from './util/isLogin.js'

Vue.config.productionTip = false
Vue.prototype.$islogin = isLogin;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
