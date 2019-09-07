import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {

    authUser(state, authData) {
      state.idToken = authData.token;
      state.userId = authData.userId;
    }

  },
  actions: {

    signup({ commit }, authData) {
      axios
        .post("/accounts:signUp?key=[API_KEY]", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
        .catch(error => console.log(error));
    },

    login({ commit }, authData) {
      axios
        .post("/accounts:signInWithPassword?key=[API_KEY]", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

  },
  getters: {

  }
})