import axios from "axios";

export default {
  async getList({ commit, rootState }) {
    try {
      const accessToken = rootState.accessToken;
      const res = await axios.get("https://api.room.video.wiki/api/list/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log('Room list response:', res);

      const { room_data } = res.data;
      if (room_data.length > 1) {
        commit("setRooms", room_data.slice(1));
      }
      commit("SET_ROOM", room_data[0]);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit(
          "setErrorModal",
          { errorMessage: "Session expired. Please log in again." },
          { root: true }
        );
        chrome.storage.local.remove(["accessToken", "userInfo"], function () {
          // console.log('Session data cleared.');
          commit("setAccessToken", null);
          commit("setUserInfo", null);
        });
        this.errorMessage = "Session expired. Please log in again.";
        this.showModal = true;
      } else {
        console.error("Error fetching room list:", error);
      }
    }
  },

  async start({ rootState }, payload) {
    try {
      const accessToken = rootState.accessToken;
      const res = await axios.post(
        "https://api.room.video.wiki/api/join/",
        {
          name: "Ritik",
          public_meeting_id: payload,
          password: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit(
          "setErrorModal",
          { errorMessage: "Session expired. Please log in again." },
          { root: true }
        );
        chrome.storage.local.remove(["accessToken", "userInfo"], function () {
          // console.log('Session data cleared.');
          commit("setAccessToken", null);
          commit("setUserInfo", null);
        });
      } else {
        console.error("Error starting room:", error);
      }
    }
  },

  async getRecordings({ commit, rootState }) {
    try {
      const accessToken = rootState.accessToken;
      const res = await axios.get(
        "https://api.room.video.wiki/api/get/user/recordings/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      commit("SET_RECORDINGS", res.data.recordings);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit(
          "setErrorModal",
          { errorMessage: "Session expired. Please log in again." },
          { root: true }
        );
        chrome.storage.local.remove(["accessToken", "userInfo"], function () {
          // console.log('Session data cleared.');
          commit("setAccessToken", null);
          commit("setUserInfo", null);
        });
      } else {
        console.error("Error fetching recordings:", error);
      }
    }
  },
  async addRoom({ commit, rootState }, payload) {
    try {
      const accessToken = rootState.accessToken;
      const data = {
        event_name: payload.room_name,
        room_code: "",
        join_now: "False",
        logout_url: "https://decast.live/dashboard",
      };

      if (payload.board_id) {
        data["board_id"] = payload.board_id;
      }

      const res = await axios.post(
        "https://api.room.video.wiki/api/create/",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const room = {
        room_name: payload.room_name,
        room_url: `https://api.room.video.wiki/join-room/${res.data.public_cast_id}`,
        short_code: res.data.short_code,
      };

      commit("ADD_ROOM", room);

      return res;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        commit(
          "setErrorModal",
          { errorMessage: "Session expired. Please log in again." },
          { root: true }
        );
        chrome.storage.local.remove(["accessToken", "userInfo"], () => {
          commit("setAccessToken", null);
          commit("setUserInfo", null);
        });
      } else {
        console.error("Error adding room:", error);
      }
      throw error;
    }
  },
};
