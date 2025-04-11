import getDefaultState from './moduleCastState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  SET_RECORDINGLIST(state,payload){
    state.recordings = payload; 
  },
  SET_CASTS_INFO(state, castsInfo) {
    state.castsInfo = castsInfo;
  },
  SET_ALLCASTS(state, casts) {
    state.casts = casts;
  },
  ADD_CAST(state, payload) {
    state.casts.push(payload);
  },
};
