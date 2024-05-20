import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      accessToken: null,
      userInfo: null
    };
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  }
});

export default store;
