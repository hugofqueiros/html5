import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    value: 0,
  },
  getters,
  mutations, // must run sync
  actions,   // extra functions to run async tasks (commit mutations only when async action is done: e.g. fetch to a server)
  // actions: {
  //   increment: context => {
  //     context.commit('increment'),
  //   },
  //   asyncIncrement: ({commit}) => {
  //     setTimeout(() => {
  //       commit('increment');
  //     }, 1000);
  //   },
  // }
  modules: {
    counter,
  },
});
