import getDefaultState from './moduleRoomState.js';

export default {
  setInitialState(state) {
    Object.assign(state, getDefaultState());
  },
  setRooms(state, rooms) {
    state.rooms = rooms;
  },
  SET_ROOM(state, room) {
    state.room = room;
  },
  SET_RECORDINGS(state, recordings) {
    state.recordings = recordings;
  }
};
