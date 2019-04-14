import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

window.addEventListener('load', function () {
  /* eslint-disable no-new */
  window.mainVue = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
  })
})
