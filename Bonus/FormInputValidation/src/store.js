import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios';

import router from './router';

Vue.use(Vuex)

const storeAppData = (authUser, expiresIn) => {
  localStorage.setItem('authUser', JSON.stringify(authUser));
  localStorage.setItem('authDate', new Date());
  localStorage.setItem('expirationDate', new Date(new Date().getTime() + (+expiresIn * 1000)));
};

const clearStoredAppData = () => {
  localStorage.removeItem('authUser');
  localStorage.removeItem('expirationDate');
}

const getAuthUserFromLocalStorage = () => {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    return JSON.parse(authUser);
  }
  return null;
}

const getExpirationDateFromLocalStorage = () => {
  return new Date(localStorage.getItem('expirationDate'));
}

const getExpiresInFromLocalStorage = () => {
  const expirationDate = getExpirationDateFromLocalStorage();
  if (!expirationDate)
    return 0;
  return Math.floor((expirationDate.getTime() - new Date().getTime()) / 1000);
}

const vstore = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {

    authUser(state, authData) {
      state.idToken = authData.token;
      state.userId = authData.userId;
    },

    storeUser(state, user) {
      state.user = user;
    },

    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
      state.user = null;
      clearStoredAppData();
    }

  },
  actions: {

    setLogoutTimer({ commit }, expiresIn) {
      setTimeout(() => {
        commit('clearAuthData');
      }, expiresIn * 1000);
    },

    signup({ commit, dispatch }, authData) {
      axios
        .post("/accounts:signUp?key=[API_KEY]", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);

          const authUser = {
            token: res.data.idToken,
            userId: res.data.localId
          };

          commit('authUser', authUser);
          dispatch('setLogoutTimer', res.data.expiresIn);
          dispatch('storeUser', authData);

          storeAppData(authUser, res.data.expiresIn);
        })
        .catch(error => console.log(error));
    },

    tryAutoLogin({ commit, dispatch }) {

      const authUser = getAuthUserFromLocalStorage();
      if (!authUser || !authUser.token) {
        return
      }

      const expiresIn = getExpiresInFromLocalStorage();
      if (expiresIn <= 0) {
        return;
      }

      commit('authUser', authUser);
      dispatch('setLogoutTimer', expiresIn);

    },

    login({ commit, dispatch }, authData) {
      axios
        .post("/accounts:signInWithPassword?key=[API_KEY]", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          const authUser = {
            token: res.data.idToken,
            userId: res.data.localId
          };

          commit('authUser', authUser);
          dispatch('setLogoutTimer', res.data.expiresIn);
          dispatch('storeUser', authData);

          storeAppData(authUser, res.data.expiresIn);

        })
        .catch(err => {
          console.log(err);
        });
    },

    logout({ commit }) {
      commit('clearAuthData');
      router.replace('/signin');
    },

    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios.post('/users.json?auth=' + state.idToken, userData)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .get("/users.json?auth=" + state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }
          console.log(users);
          commit('storeUser', users[0]);
        })
        .catch(error => console.error(error));
    }


  },

  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }

});

vstore.dispatch('tryAutoLogin');

export default vstore;