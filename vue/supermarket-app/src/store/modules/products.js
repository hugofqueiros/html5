import Vue from 'vue';
import {GET_PRODUCTS, SET_PRODUCTS, SET_PRODUCTS_LOADING, ERROR_FETCH_PRODUCTS, INIT_PRODUCTS} from '../types';

const state = {
    products: [],
    error: false,
    loading: false
};

const mutations = {
    SET_PRODUCTS: (state, payload) => {
        console.log('woo:', payload);

        state.products = payload;
    },
    SET_PRODUCTS_LOADING(state, payload) {
        state.loading = payload;
    },
    ERROR_FETCH_PRODUCTS(state, payload) {
        console.error('ERROR: ', payload);
        state.error = true;
    }
};

const actions = {
    fetchProducts: ({commit, dispatch}) => {
        Vue.http.get('products.json')
            .then(response => response.json())
            .then((data) => {
                console.log('data:', data);
                if (!data) {
                    dispatch('errorFetching', 'no data');
                }
                commit(SET_PRODUCTS, data);
                commit(SET_PRODUCTS_LOADING, false);
                // return data;
            })
            .catch((err) => {
                dispatch('errorFetching', err);
            });
    },
    errorFetching({commit}) {
        commit(ERROR_FETCH_PRODUCTS);
    }
};

const getters = {
    getProducts: ({products}) => products
};

export default {
    state,
    mutations,
    actions,
    getters
};

