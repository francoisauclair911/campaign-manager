import Vue from "vue";
import App from "./App.vue";

import lodash from 'lodash';
import "./assets/css/tailwind.css"

Vue.config.productionTip = false;
Vue.config.devtools =  (process.env.NODE_ENV === 'development')


window.lodash = lodash.noConflict();

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    render: h => h(App)
  }).$mount('#app');
});