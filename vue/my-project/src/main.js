// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import './startup';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

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
