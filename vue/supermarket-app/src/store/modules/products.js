import Vue from 'vue';
import {GET_PRODUCTS, MUTATE_INIT_PRODUCTS, INIT_PRODUCTS} from '../types';

const state = {
    products: []
};

const mutations = {
    MUTATE_INIT_PRODUCTS: (state, payload) => {
        state.products = payload;
    }
};

const actions = {
    fetchProducts: ({commit}) => {
        Vue.http.get('data.json')
            .then(response => response.json())
            .then((data) => {
                console.log('data:', data);
                commit('INIT_PRODUCTS', data);
                // return data;
            });
    }
};

const getters = {
    GET_PRODUCTS: (state) => {
        return state.products;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};

