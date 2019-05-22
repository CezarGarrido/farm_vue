import Vue from 'vue'
import './plugins/vuetify'
import router from "./router/index.js";
import App from './App.vue'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position.coords.longitude)
      console.log(position.coords.latitude)
      //do work work here
      /*
      $.post("url-here", {
          long: position.coords.longitude,
          lat: position.coords.latitude
      }).done(function (response) {
          alert(responsse)
      });
      */
    },
    function (error) {
      alert(error.message);
    }, {
      enableHighAccuracy: true
      , timeout: 5000
    }
  );
} else {
  alert("Geolocation is not supported by this browser.");
}
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
