import axios from 'axios';
import constants from '../../constant';

export default {
  async getAllCasts({ rootState, commit }) {
    const accessToken = rootState.accessToken;
    try {
      const res = await axios.get(constants.apiCastUrl + '/api/event/get/all/info/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return res;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
        chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
          console.log('Session data cleared.');
          commit('setAccessToken', null);
          commit('setUserInfo', null);
        });
      } else {
        console.error('Error fetching all casts:', error);
      }
    }
  },

  async getOriginalUrl({ rootState, commit }, shortCode) {
    const accessToken = rootState.accessToken;
    try {
      const res = await axios.get(`${constants.apiCastUrl}/api/url/retrieve/${shortCode}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return res;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
        chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
          console.log('Session data cleared.');
          commit('setAccessToken', null);
          commit('setUserInfo', null);
        });
      } else {
        console.error('Error fetching original URL:', error);
      }
      return null;
    }
  },

  meetingInfo({ rootState, commit }, payload) {
    const accessToken = rootState.accessToken;
    return new Promise((resolve, reject) => {
      axios.get(`${constants.apiCastUrl}/api/event/meeting/info/?public_meeting_id=${payload}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        console.log('meeting working');
        resolve(res);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
          chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
            console.log('Session data cleared.');
            commit('setAccessToken', null);
            commit('setUserInfo', null);
          });
        } else {
          console.log('meeting not working');
        }
        reject(error);
      });
    });
  },

  joinNow({ rootState, commit }, payload) {
    const accessToken = rootState.accessToken;
    return new Promise((resolve, reject) => {
      axios.post(constants.apiCastUrl + '/api/event/meeting/join/', payload, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('joining Now');
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
          chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
            console.log('Session data cleared.');
            commit('setAccessToken', null);
            commit('setUserInfo', null);
          });
        } else {
          console.log('cannot join');
        }
        reject(error);
      });
    });
  },

  async recordings({ commit, rootState }) {
    const accessToken = rootState.accessToken;
    try {
      const res = await axios.get(constants.apiCastUrl + '/api/event/user/recordings', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      commit('SET_RECORDINGLIST', res.data.status);
      return res.data.status;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit('setErrorModal', { errorMessage: 'Session expired. Please log in again.' }, { root: true });
        chrome.storage.local.remove(['accessToken', 'userInfo'], function() {
          console.log('Session data cleared.');
          commit('setAccessToken', null);
          commit('setUserInfo', null);
        });
      } else {
        console.error('Error fetching recordings:', error);
      }
    }
  },
};
