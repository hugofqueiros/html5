import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Home from '@/components/Home';
import Servers from '@/components/servers/Servers';
import User from '@/components/user/User';
import AppQuote from '@/components/quote/AppQuote';
import WonderfulQuote from '@/components/wonderfulQuote/WonderfulQuote';
import Form from '@/components/forms/Form';
import Directives from '@/components/directives/Directives';
import Filter from '@/components/filter/Filter';
import Mixins from '@/components/mixins/Mixins';
import Animations from '../components/animations/Animations.vue';
import Quiz from '../components/animations/Quiz.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
    }, {
      path: '/servers',
      name: 'Servers',
      component: Servers,
    }, {
      path: '/user',
      name: 'User',
      component: User,
    }, {
      // passing content with slots, dynamic components
      path: '/quote',
      name: 'AppQuote',
      component: AppQuote,
    }, { // slots, passing data round
      path: '/wq',
      name: 'WonderfulQuote',
      component: WonderfulQuote,
    }, { // working with forms
      path: '/form',
      name: 'Form',
      component: Form,
    }, {
      path: '/directives',
      name: 'Directives',
      component: Directives,
    }, {
      path: '/filter',
      name: 'Filter',
      component: Filter,
    }, {
      path: '/mixins',
      name: 'Mixins',
      component: Mixins,
    }, {
      path: '/animations',
      name: 'Animations',
      component: Animations,
    }, {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz,
    },
  ],
});
