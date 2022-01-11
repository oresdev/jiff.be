import Vue from 'vue'

import './registerServiceWorker'

import App from '@/App'

// app components
import router from '@/app/router'
import store from '@/app/store'
import i18n from '@/app/i18n'
import mixins from '@/app/mixins'
import filters from '@/app/filters'
import directives from '@/app/directives'
import { Utils, Formatter } from '@/app/services'

// some styles
import "@/assets/scss/main.scss"

// load app directives & mixins & filters
Object.keys(mixins).forEach(key =>
  Vue.mixin(mixins[key])
)
Object.keys(filters).forEach(key =>
  Vue.filter(key, filters[key])
)
Object.keys(directives).forEach(key =>
  Vue.use(directives[key])
)

Vue.use(Utils)
Vue.use(Formatter)

// create the app instance.
const app = new Vue({
  router,
  store,
  i18n,
  ...App,
	beforeCreate() {
    this.$store.commit('initialiseStore');
  }
})

// Mount them
app.$mount('#app')