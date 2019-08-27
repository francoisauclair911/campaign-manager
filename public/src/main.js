import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import lodash from 'lodash'


window.axios = axios
window._ = lodash


Vue.config.productionTip = false;
Vue.config.devtools = true;

document.addEventListener('DOMContentLoaded', () => {
  const shortcodeData = document.querySelector('#app');

  new Vue({
    router,
    store,
    render: h => h(App),
    data() {
      return {
        shortcodeAttributes: JSON.parse(shortcodeData.dataset.adra)
      }
    }
  }).$mount('#app');
});