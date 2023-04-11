import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false
Vue.use(VueCarousel);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
