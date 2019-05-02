import Vue from 'vue'
import './plugins/vuetify'
import router from "./router/index.js";
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
