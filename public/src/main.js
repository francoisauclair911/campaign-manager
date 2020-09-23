import Vue from "vue";
import App from "./App.vue";
import axios from 'axios'


// import lodash from 'lodash'

import {
  checkLocalStorageExpiry
} from './helper'
import './assets/css/tailwind.css'

checkLocalStorageExpiry();

window.axios = axios
// window.lodash = lodash.noConflict();
import './assets/css/app.css'

Vue.config.productionTip = false;

Vue.config.devtools = (process.env.NODE_ENV === 'development')

document.addEventListener('DOMContentLoaded', () => {
  const shortcodeData = document.querySelector('#app');
  const adraData = shortcodeData.dataset.adra || '{"form_token": ""}'
  console.log('short', adraData);
  new Vue({
    render: h => h(App),
    data() {
      return {
        shortcodeAttributes: JSON.parse(adraData)
      }
    }
  }).$mount('#app');
});
