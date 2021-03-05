import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

// 在main.js注册mescroll-body的全局组件 (mescroll-uni用的比较少,且遵循 easycom 规范,会自动按需引入)
// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
