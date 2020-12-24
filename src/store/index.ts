import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    formData: {} as Record<string, string | number | Array<string | number>>,
  },
  mutations: {
    mutateFormData(
      state: { formData: Record<string, string | number | (string | number)[]>; },
      payload: Record<string, string | number | Array<string | number>>,
    ): void {
      state.formData = payload;
    },
  },
  actions: {
  },
  modules: {
  },
});
