import { createStore } from 'vuex'

export default createStore({
  state: {
    userDID: null
  },
  mutations: {
    setUserDID(state, data) {
      state.userDID = data
    }
  },
  actions: {
  },
  modules: {
  }
})
