import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state'
import usersQueries from "../services/usersQueries"
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return { ...defaultState }
  },
  mutations: {
    STORE_USERDATA(state, userdata) {
      state.userId = userdata.userId;
      state.roleId = userdata.roleId;
      state.token = userdata.token;
      state.surname = userdata.surname;
      state.firstname = userdata.firstname;
      state.image = userdata.image
    },
    UPDATE_USER(state, newdata) {
      state.surname = newdata.surname;
      state.firstname = newdata.firstname;
      state.image = newdata.image;
    },
    RESET_STATE(state) {
      Object.assign(state, defaultState)
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success',
        state.token = token
    },
    auth_error(state) {
      state.status = 'error'
    },
  },
  actions: {
    updateUser(context, id) {
      usersQueries.getOneUser(id)
        .then(response => {
          let newdata = {
            surname: response.data.surname,
            firstname: response.data.firstname,
            image: response.data.image
          }
          context.commit('UPDATE_USER', newdata);
        })
    },
    resetState(context) {
      context.commit('RESET_STATE', defaultState)
    },
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        usersQueries.login(data)
        .then(response => {
          console.log(response.data);
          let userdata = {
            token: response.data.token,
            userId: response.data.userId,
            roleId: response.data.roleId,
            surname: response.data.userObject.surname,
            firstname: response.data.userObject.firstname,
            image: response.data.userObject.image
          };
          //Store info in sessionStorage
          sessionStorage.setItem('token', userdata.token);
          sessionStorage.setItem('userId', userdata.userId);
          sessionStorage.setItem('roleId', userdata.roleId);
          commit('STORE_USERDATA', userdata);
          axios.defaults.headers.common['Authorization'] = 'Bearer' + userdata.token;
          resolve(response)
        })
        .catch(err => {
          alert('Les informations fournies ne permettent pas de vous authentifier !')
          commit('auth_error')
          sessionStorage.removeItem('token')
          reject(err)
        })
      })
    },

  },
  getters: {

  },
  modules: {
  }
})
