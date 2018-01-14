import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.use(VueResource);

Vue.http.options.root = 'https://vue-js-stock-trader-7fe39.firebaseio.com/';

Vue.filter('currency', (value) => {
  return `$ + ${value.toLocaleString()}`;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
