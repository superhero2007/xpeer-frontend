import Vue from 'vue'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import PortalVue from 'portal-vue'

import App from './App'

import './setup/router'
import './setup/axios'
import './assets/scss/style.scss'

import router from './router'
import store from './store'

Vue.component('v-icon', Icon)
Vue.use(PortalVue)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})
