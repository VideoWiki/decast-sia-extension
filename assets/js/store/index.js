import { createStore } from 'vuex';
import moduleRoom from './room/moduleRoom';
import moduleCast from './cast/moduleCast';
const store = createStore({
  state() {
    return {
      accessToken: null,
      userInfo: {},
      showModal: false,
      errorMessage: '',
    };
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
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
    }
  },
  modules:{
    room: moduleRoom,
    cast: moduleCast,
  }
});

export default store;
