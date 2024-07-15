import axios from 'axios';
import Constant from '../../constant';

const actions = {
  updateUserDetails({ commit, rootState }, payload) {
    const accessToken = rootState.accessToken;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    return new Promise((resolve, reject) => {
      const form = new FormData();
      for (const [key, value] of Object.entries(payload)) {
        form.append(key, value);
      }
      axios.patch(`${Constant.profilingUrl}/api/profile/update/`, form, config)
        .then((response) => {
          commit('SET_USER_INFO', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default actions;
