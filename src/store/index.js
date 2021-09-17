import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    userDID: null,
  },
  mutations: {
    setUserDID(state, data) {
      state.userDID = data;
    },
  },
  actions: {},
  modules: {},
});
