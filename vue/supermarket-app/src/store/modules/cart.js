import {GET_CART, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART} from '../types';

const mutations = {
    [ADD_PRODUCT_TO_CART](state, payload) {
        state.listOfCart.push(payload);
    },
    [REMOVE_PRODUCT_FROM_CART](state, payload) {
        state.listOfCart = payload;
    }
};

const actions = {
    addProductToCard({commit}, product) {
        commit(ADD_PRODUCT_TO_CART, product);
    },
    removeProductFromCard({state, commit}, productId) {
        const list = state.listOfCart.filter(item => item.id !== productId);
        commit(REMOVE_PRODUCT_FROM_CART, list);
    }
};

const getters = {
    [GET_CART]({listOfCart}) { return listOfCart; }
};

export default {
    state: {
        listOfCart: [] // list of products IDs
    },
    mutations,
    actions,
    getters
};
