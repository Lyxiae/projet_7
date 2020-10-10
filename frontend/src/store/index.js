import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state'
import usersQueries from "../services/usersQueries"
import axios from "axios";

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
    SESSION_ROLEID(state, roleId) {
      state.roleId = roleId;
    },
    SESSION_USERID(state, userId) {
      state.userId = userId;
    },
    SESSION_TOKEN(state, token) {
      state.token = token;
    },
    RESET_STATE(state) {
      Object.assign(state, defaultState)
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token){
      state.status = 'success',
      state.token = token
    },
    auth_error(state){
      state.status = 'error'
    },
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
    },
    updateSession(context) {
      console.log(sessionStorage.getItem('userId'));
      context.commit('SESSION_USERID', sessionStorage.getItem('userId'));
      context.commit('SESSION_ROLEID', sessionStorage.getItem('roleId'));
      context.commit('SESSION_TOKEN', sessionStorage.getItem('token'));
      console.log(this.state.userId);
      console.log(this.state.roleId);
    },
    login({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        usersQueries.login(data)
        .then(response => {
          console.log(response.data);
          const token = response.data.token;
          const userId = response.data.userId;
          const roleId = response.data.roleId;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('roleId', roleId);
          commit('auth_success', token);
          commit('STORE_ROLEID', roleId);
          commit('STORE_USERID', userId);
          axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          sessionStorage.removeItem('token')
          reject(err)
        })
      })
    },

  },
  getters: {
    authStatus: state => state.status,
    getUserId: state => state.userId,
    getRoleId: state => state.roleId
  },
  modules: {
  }
})
