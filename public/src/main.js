import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'


// import lodash from 'lodash'

import {checkLocalStorageExpiry} from './helper'

checkLocalStorageExpiry();

window.axios = axios
// window.lodash = lodash.noConflict();
import './assets/css/app.css'

Vue.config.productionTip = false;

Vue.config.devtools =  (process.env.NODE_ENV === 'development')

document.addEventListener('DOMContentLoaded', () => {
  const shortcodeData = document.querySelector('#app');

  new Vue({
    render: h => h(App),
    data() {
      return {
        shortcodeAttributes: JSON.parse(shortcodeData.dataset.adra)
      }
    }
  }).$mount('#app');
});