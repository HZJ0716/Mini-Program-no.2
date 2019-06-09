import Vue from "vue"
import App from "./app.vue"
import store from "./pages/store/store.js"
import Fly from "flyio/dist/npm/wx"
// 设置vue提示功能关闭
Vue.config.productionTip= false;

// 声明当前组件类型
App.mpType = "app" //应用

// 生成应用实例
const app = new Vue(App)

// 将store对象放置Vue的原型上,使每个实例都可以使用
Vue.prototype.$store = store

let fly = new Fly
Vue.prototype.$fly = fly
// 挂载整个应用
app.$mount()