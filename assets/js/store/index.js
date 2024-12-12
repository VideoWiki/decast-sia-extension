import { createStore } from 'vuex';
import moduleRoom from './room/moduleRoom';
import moduleCast from './cast/moduleCast';
import moduleAuth from './auth/moduleAuth';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      accessToken: null,
      userInfo: {},
      showModal: false,
      errorMessage: '',
      siaMinutes: 0,
      siaFreeGiven: false,
      swarmMinutes: 0,
      swarmFreeGiven: false,
    };
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserMinutes(state, { siaMinutes, siaFreeGiven, swarmMinutes, swarmFreeGiven }) {
      state.siaMinutes = siaMinutes;
      state.siaFreeGiven = siaFreeGiven;
      state.swarmMinutes = swarmMinutes;
      state.swarmFreeGiven = swarmFreeGiven;
    },
    setErrorModal(state, { errorMessage }) {
      state.showModal = true;
      state.errorMessage = errorMessage;
    },
    closeErrorModal(state) {
      state.showModal = false;
      state.errorMessage = '';
    },
    
  },
  actions: {
    setErrorModal({ commit }, { errorMessage }) {
      commit('setErrorModal', { errorMessage });
    },
    closeErrorModal({ commit }) {
      commit('closeErrorModal');
    },
    async fetchUserMinutes({ commit, state }) {
      try {
        const response = await axios.get('https://api.cast.decast.live/api/decast/get/user/minutes/', {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        });
        const { sia_minutes, sia_free_given, swarm_minutes, swarm_free_given } = response.data;
        commit('setUserMinutes', {
          siaMinutes: sia_minutes,
          siaFreeGiven: sia_free_given,
          swarmMinutes: swarm_minutes,
          swarmFreeGiven: swarm_free_given,
        });
      } catch (error) {
        console.error('Error fetching user minutes:', error);
      }
    },
  },
  modules:{
    room: moduleRoom,
    cast: moduleCast,
    auth: moduleAuth,
  }
});

export default store;
