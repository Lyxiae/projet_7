import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {...defaultState} 
  },
  mutations: {
    UPDATE_TOKEN(state, token) {
      state.token = token;
    },
    STORE_USERID(state, userId) {
      state.userId = userId;
    },
    STORE_ROLEID(state, roleId) {
      state.roleId = roleId;
    },
    RESET_STATE(state) {
      Object.assign(state, defaultState)
    }
  },
  actions: {
    updateToken(context, token) {
      context.commit('UPDATE_TOKEN', token)
    },
    storeUserId(context, userId) {
      context.commit('STORE_USERID', userId);
    },
    storeRoleId(context, roleId) {
      context.commit('STORE_ROLEID', roleId);
    },
    resetState(context) {
      context.commit('RESET_STATE', defaultState)
    }
  },
  modules: {
  }
})
