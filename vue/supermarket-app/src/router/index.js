import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home';
import Products from '../components/products/Products';

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/products',
        name: 'products',
        component: Products
    }],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) return { selector: to.hash };
        return { x: 0, y: 0 };
    }
});
