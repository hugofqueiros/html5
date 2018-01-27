import {GET_PRODUCTS, MUTATE_INIT_PRODUCTS, INIT_PRODUCTS} from '../types';

const state = {
    products: [],
};

const mutations = {
    MUTATE_INIT_PRODUCTS: (state, payload) => {
        state.products = payload;
    },
};

const actions = {
    INIT_PRODUCTS: ({commit}, products) => {
        commit('INIT_PRODUCTS', products);
    },
};

const getters = {
    GET_PRODUCTS: (state) => {
        return state.products;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};

