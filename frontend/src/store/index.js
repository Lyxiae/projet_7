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
    STORE_SURNAME(state, surname) {
      state.surname = surname;
    },
    STORE_FIRSTNAME(state, firstname) {
      state.firstname = firstname;
    },
    STORE_IMAGE(state, image) {
      state.image = image;
    },
    STORE_USERDATA(state, userdata){
      state.userId = userdata.userId;
      state.roleId = userdata.roleId;
      state.token = userdata.token;
      state.surname = userdata.surname;
      state.firstname = userdata.firstname;
      state.image = userdata.image
    },
    UPDATE_USER(state, newdata){
      state.surname = newdata.surname;
      state.firstname = newdata.firstname;
      state.image = newdata.image;
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
    // updateToken(context, token) {
    //   context.commit('UPDATE_TOKEN', token)
    // },
    // storeUserId(context, userId) {
    //   context.commit('STORE_USERID', userId);
    // },
    // storeRoleId(context, roleId) {
    //   context.commit('STORE_ROLEID', roleId);
    // },
    updateUser(context, id){
      usersQueries.getOneUser(id)
      .then(response => {
        let newdata = {
          surname : response.data.surname,
          firstname : response.data.firstname,
          image : response.data.image
        }
        context.commit('UPDATE_USER', newdata);
      }
        
      )
      
    },
    resetState(context) {
      context.commit('RESET_STATE', defaultState)
    },
    login({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        usersQueries.login(data)
        .then(response => {
          console.log(response.data);
          let userdata = {
            token: response.data.token,
            userId: response.data.userId,
            roleId: response.data.roleId,
            surname: '',
            firstname: '',
            image: ''
          };
          sessionStorage.setItem('token', userdata.token);
          sessionStorage.setItem('userId', userdata.userId);
          sessionStorage.setItem('roleId', userdata.roleId);

          usersQueries.getOneUser(response.data.userId)
          .then(response => {
            console.log(response.data);
            userdata.surname = response.data.surname;
            userdata.firstname = response.data.firstname;
            userdata.image = response.data.image;
            commit('STORE_USERDATA', userdata);
            axios.defaults.headers.common['Authorization'] = 'Bearer' + userdata.token;
            resolve(response)
          })       
          
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

  },
  modules: {
  }
})
