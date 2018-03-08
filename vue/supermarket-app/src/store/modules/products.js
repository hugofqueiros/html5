import Vue from 'vue';
import {SET_PRODUCTS, SET_PRODUCTS_LOADING, ERROR_FETCH_PRODUCTS, GET_PRODUCTS} from '../types';

const mutations = {
    SET_PRODUCTS: (state, payload) => {
        state.products = payload;
    },
    SET_PRODUCTS_LOADING(state, payload) {
        state.loading = payload;
    },
    ERROR_FETCH_PRODUCTS(state, payload) {
        state.error = payload;
    }
};

const actions = {
    fetchProducts: ({commit, dispatch}) => {
        Vue.http.get('products.json')
            .then(response => response.json())
            .then((data) => {
                if (!data) {
                    dispatch('errorFetching', 'no data');
                }
                commit(SET_PRODUCTS, data);
                commit(SET_PRODUCTS_LOADING, false);
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
    [GET_PRODUCTS]: ({products}) => products
};

export default {
    state: {
        products: [],
        error: false,
        loading: false
    },
    mutations,
    actions,
    getters
};

