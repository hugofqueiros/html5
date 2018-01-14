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
import Quiz from '../components/animations/quiz/Quiz.vue';
import Resource from '../components/vue-resource/Resource.vue';

// import UserRoute from '../components/routing/basics/user/User.vue';
// import UserStartRoute from '../components/routing/basics/user/UserStart.vue';
// import UserDetailRoute from '../components/routing/basics/user/UserDetail.vue';
// import UserEditRoute from '../components/routing/basics/user/UserEdit.vue';
import HomeRoute from '../components/routing/basics/Home.vue';
import HeaderRoute from '../components/routing/basics/Header.vue';

// Lazy Loading - loading code that you need (good for bug apps)
// Limiting the number of http requests, but only for what you need
// webpack won't include it on the inicial bundle but will rather create multiple bundles
const UserRoute = (resolve) => {
  require.ensure(['../components/routing/basics/user/User.vue'], () => {
    // resolves like a promise (async) webpack it's only doing it if we really need it
    resolve(require('../components/routing/basics/user/User.vue'));
  }, 'user');
};

const UserStartRoute = (resolve) => {
  require.ensure(['../components/routing/basics/user/UserStart.vue'], () => {
    resolve(require('../components/routing/basics/user/UserStart.vue'));
  }, 'user');
};
const UserEditRoute = (resolve) => {
  require.ensure(['../components/routing/basics/user/UserEdit.vue'], () => {
    resolve(require('../components/routing/basics/user/UserEdit.vue'));
  }, 'user');
};
const UserDetailRoute = (resolve) => {
  require.ensure(['../components/routing/basics/user/UserDetail.vue'], () => {
    resolve(require('../components/routing/basics/user/UserDetail.vue'));
  }, 'user'); // 'user' is the group name, this will create a bundle for the user group, if we take that out it will create multiple
};

import State from '../components/state-management/State.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // default is hash but with history it doesn't have #
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // if the user clicks back it doesn't go the the hash position
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
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
    }, {
      path: '/resource',
      name: 'Resource',
      component: Resource,
    }, {
      path: '/routing',
      name: 'homeroute',
      components: {
        default: HomeRoute,
        'header-top': HeaderRoute,
      },
    }, {
      path: '/routing/user',
      name: 'userroute',
      props: { name: 'STARS' },
      components: {
        default: UserRoute,
        'header-bottom': HeaderRoute,
      },
      children: [
        { path: '', component: UserStartRoute },
        { path: ':id',
          component: UserDetailRoute,
          beforeEnter: (to, from, next) => {
            console.log('inside route setup');
            next();
          },
        }, {
          path: ':id/edit', component: UserEditRoute, name: 'userEdit' },
      ],
    }, {
      path: '/redirect-me',
      redirect: { name: 'homeroute' },
    }, {
      path: '*',
      redirect: '/',
    }, {
      path: '/state',
      name: 'State',
      component: State,
    },
  ],
});
