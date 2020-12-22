import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formData: {} as Record<string, string | number | Array<string | number>>,
  },
  mutations: {
    mutateFormData(state, payload: Record<string, string | number | Array<string | number>>): void {
      state.formData = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
