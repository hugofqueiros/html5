// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';

import './startup';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// import {routes} from './routes';
// Vue.use(VueRouter);
// const router = new VueRouter({
//   routes
// })

router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next();
});

Vue.use(VueResource);
Vue.http.options.root = 'https://vuejs-http-da09f.firebaseio.com';
Vue.http.interceptors.push((request, next) => {
  console.log(request);
  if (request.method == 'POST') {
    request.method = 'PUT';
  }
  next((response) => {
    response.json = () => {
      return { messages: response.body };
    };
  });
});


// Managing state (should use vuex)
export const eventBus = new Vue({
  methods: {
    changeAge(age) {
      this.$emit('ageWasEdited', age);
    },
  },
});

Vue.directive('highlight', {
  bind(el, binding, vnode) {
    // el.style.backgroundColor = 'green';
    // el.style.backgroundColor = binding.value;

    let delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 3000;
    }
    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    }, delay);
  },
});

Vue.filter('to-lowercase', function(value) {
  return value.toLowerCase();
});

Vue.mixin({
  created() {
    console.log('Global Mixin - Created Hook'); // is used in every component that's why it is called so many times
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App), // best way to write your template, it doesnt have
  // to be a string for example (more flexibility)
  // template: '<App/>',
  // components: { App }
});
