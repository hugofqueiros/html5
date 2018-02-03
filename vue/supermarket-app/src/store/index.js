import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import cart from './modules/cart';
import products from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        value: 0
    },
    getters,
    mutations,
    actions,
    modules: {
        cart,
        products
    }
});
