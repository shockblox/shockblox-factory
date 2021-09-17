import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    userDID: null,
    idx: null,
  },
  mutations: {
    setUserDID(state, data) {
      state.userDID = data;
    },
    setIDX(state, data) {
      state.idx = data;
    },
  },
  actions: {},
  modules: {},
});
