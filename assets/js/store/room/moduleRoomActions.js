import axios from 'axios';

export default {
  async getList({ commit, rootState }) {
    try {
      const accessToken = rootState.accessToken;
      const res = await axios.get('https://api.room.video.wiki/api/list/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      // console.log('Room list response:', res);

      const { room_data } = res.data;
      if (room_data.length > 1) {
        commit('setRooms', room_data.slice(1));
      }
      commit('SET_ROOM', room_data[0]);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
        chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
          // console.log('Session data cleared.');
          commit('setAccessToken', null);
          commit('setUserInfo', null);
        });
        this.errorMessage = 'Session expired. Please log in again.';
        this.showModal = true;
      } else {
        console.error('Error fetching room list:', error);
      }
    }
  },

  async start({ rootState }, payload) {
    try {
      const accessToken = rootState.accessToken;
      const res = await axios.post('https://api.room.video.wiki/api/join/', {
        name: 'Ritik',
        public_meeting_id: payload,
        password: ''
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return res;
    } catch (error) {
      if (error.response && error.response.status === 403) {
       commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
        chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
          // console.log('Session data cleared.');
          commit('setAccessToken', null);
          commit('setUserInfo', null);
        });
      } else {
        console.error('Error starting room:', error);
      }
    }
  },

  async getRecordings({ commit, rootState }) {
    try {
      const accessToken = rootState.accessToken;
      const res = await axios.get('https://api.room.video.wiki/api/get/user/recordings/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      commit('SET_RECORDINGS', res.data.recordings);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
       commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
        chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
          // console.log('Session data cleared.');
          commit('setAccessToken', null);
          commit('setUserInfo', null);
        });
      } else {
        console.error('Error fetching recordings:', error);
      }
    }
  },
};
