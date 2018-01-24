import Vue from 'vue';
import App from './App';
import router from './router';

import './startup';
import './resource';
import './filters';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
