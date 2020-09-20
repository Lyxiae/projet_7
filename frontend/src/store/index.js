import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userId:0
  },
  mutations: {
    UPDATE_TOKEN(state, token) {
      state.token = token;
    },
    STORE_USERID(state, userId) {
      state.userId = userId;
    }
  },
  actions: {
    updateToken(context, token) {
      context.commit('UPDATE_TOKEN', token)
    },
    storeUserId(context, userId) {
      context.commit('STORE_USERID', userId);
    }
  },
  modules: {
  }
})
