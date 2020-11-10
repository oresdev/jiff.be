import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/services/router'
import store from '@/services/store'
import i18n from '@/services/i18n'
import mixins from '@/services/mixins'
import filters from '@/services/filters'
import "@/assets/scss/main.scss"

Vue.config.productionTip = false

Object.keys(mixins).forEach(key =>
  Vue.mixin(mixins[key])
)

Object.keys(filters).forEach((key) =>
	Vue.filter(key, filters[key])
)

new Vue({
  router,
  store,
  i18n,
  ...App,
	beforeCreate() {
    this.$store.commit('initialiseStore');
  }
}).$mount('#app')
