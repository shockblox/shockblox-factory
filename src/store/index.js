import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  supportCircular: true,
});

export default createStore({
  plugins: [vuexLocal.plugin],
  state: {
    userDID: null,
    userProfile: null,
    idx: null,
  },
  mutations: {
    setUserDID(state, data) {
      state.userDID = data;
    },
    setUserProfile(state, data) {
      state.userProfile = data;
    },
  },
  modules: {},
});
