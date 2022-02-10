import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/main.scss';

Vue.config.productionTip = false;

import Explorer from './Explorer';
Vue.prototype.$explorer = new Explorer();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
