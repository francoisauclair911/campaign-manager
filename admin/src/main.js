import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import lodash from 'lodash';
//tailwind
import "./assets/css/tailwind.css"

Vue.config.productionTip = false;

window._ = lodash;

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});