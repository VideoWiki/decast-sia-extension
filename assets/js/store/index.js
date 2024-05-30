import { createStore } from 'vuex';
import moduleRoom from './room/moduleRoom';
import moduleCast from './cast/moduleCast';
const store = createStore({
  state() {
    return {
      accessToken: null,
      userInfo: {}
    };
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  modules:{
    room: moduleRoom,
    cast: moduleCast,
  }
});

export default store;
