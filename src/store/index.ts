import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: [] as Array<string | number>,
  },
  mutations: {
    formData(state, payload: Array<string | number>): void {
      debugger;
      state.formData = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
