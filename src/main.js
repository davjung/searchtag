// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'
import math from 'mathjs'
import * as sch from './assets/schools.json'


Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(sch)
Vue.use(math)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
