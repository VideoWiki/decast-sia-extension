<template>
  <div>
    <p class="font-bold text-2xl">//Calls</p>
    <p class="mt-2" style="color: gray; font-size: 16px">
      //Secured confrence rooms for private calls.
    </p>
  </div>

  <div class="choose-room mt-4 mb-4 flex flex-row gap-4">
    <button class="options-button border-none text-lg font-bold" @click="changeFocus(true)"
      :class="{ 'focused-button': focusYourRooms }">
      Rooms
    </button>
    <button class="options-button border-none text-lg font-bold" @click="handleButtonClick"
      :class="{ 'focused-button': !focusYourRooms }">
      Recordings
    </button>
  </div>

  <div>
    <div class="flex flex-col gap-4">
      <div class="room_list_cont" v-if="focusYourRooms">
        <div v-if="isRoomsLoading">
          <RoomCardShimmer />
          <RoomCardShimmer :style="{ opacity: 0.7 }" />
          <RoomCardShimmer :style="{ opacity: 0.4 }" />
        </div>
        <div v-else-if="rooms.length">
          <div v-for="(room, index) in rooms" :key="index">
            <RoomCard :getRoomList="getList" :room="room" :index="index" :roomsList="rooms" />
          </div>
        </div>
      </div>

      <div v-else class="room_list_cont">
        <div v-if="isRecordingLoading">
          <RecordingCardShimmer />
          <RecordingCardShimmer :style="{ opacity: 0.7 }" />
          <RecordingCardShimmer :style="{ opacity: 0.4 }" />
        </div>
        <div v-else-if="recordingList.length">
          <div v-for="(recording, index) in recordings" :key="index">
            <RecordingCard :recording="recording" :index="index" :getRecordings="getRecordings" />
          </div>
        </div>
        <div v-else class="recording flex flex-col items-center justify-items-center gap-4 mt-4">
          <span>
            <svg width="160px" height="160px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" class="si-glyph si-glyph-disc-upload" fill="#ffffff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title>598</title>
                <defs> </defs>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g fill="#ffffff">
                    <path
                      d="M7.917,6 C6.857,6 6,6.863 6,7.93 C6,8.995 6.857,9.858 7.917,9.858 C8.974,9.858 9.832,8.996 9.832,7.93 C9.832,6.864 8.974,6 7.917,6 L7.917,6 Z"
                      class="si-glyph-fill"> </path>
                    <path
                      d="M10.979,15.1106614 L14.51,10.5030985 L15.2,11.4045782 C15.702,10.3553813 15.999,9.18983179 15.999,7.94637663 C15.999,3.49867206 12.417,0 7.999,0 C3.581,0 -0.00100000005,3.49867206 -0.00100000005,7.94637663 C-0.00100000005,12.3940812 3.581,16 7.999,16 C9.366,16 10.642,15.7005185 11.765,15.1106614 L10.979,15.1106614 L10.979,15.1106614 Z M12.423,2.691 L13.269,3.537 L11.481,5.324 L10.637,4.479 L12.423,2.691 L12.423,2.691 Z M3.548,13.258 L2.703,12.412 L4.49,10.625 L5.336,11.47 L3.548,13.258 L3.548,13.258 Z M8,11 C6.34408936,11 5,9.65704979 5,8.00046533 C5,6.34388087 6.34315855,5 8,5 C9.65684145,5 11,6.34295021 11,8.00046533 C11,9.65611913 9.65591064,11 8,11 L8,11 Z"
                      class="si-glyph-fill"> </path>
                    <path
                      d="M16,13.966 L14.511,12.106 L13.021,13.966 L14.018,13.966 L14.018,15.969 L14.988,15.969 L14.988,13.966 L16,13.966 Z"
                      class="si-glyph-fill"> </path>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <h1 class="text-lg text-white font-semibold">No Recordings Found.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomCard from './components/RoomCard.vue';
import RecordingCard from './components/RecordingCard.vue'
import RoomCardShimmer from './components/RoomCardShimmer.vue';
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';
export default {
  name: "RoomSection",
  components: {
    RoomCard,
    RoomCardShimmer,
    RecordingCardShimmer,
    RecordingCard
  },
  data() {
    return {
      isLoading: false,
      text: '',
      rooms: [],
      recordings: [],
      isRoomStart: false,
      focusYourRooms: true,
      isRoomsLoading: false,
      isRecordingLoading: true,

    };
  },
  computed: {
    roomsList() {
      return this.$store.state.room.rooms;
    },
    recordingList() {
      return this.$store.state.room.recordings;
    },
    accessToken() {
      return this.$store.state.accessToken;
    }
  },
  watch: {
    accessToken(newToken) {
      if (newToken) {
        this.getList();
      }
    },
    roomsList(newList) {
      console.log(newList);
      this.rooms = [...newList];
      this.firstRoomId = newList.length > 0 ? newList[0] : null;
      console.log(this.rooms);
    },
    recordingList(newList) {
      console.log(newList);
      this.recordings = [...newList];
      console.log(this.recordings);
    },
  },
  mounted() {
    if (this.accessToken) {
      this.getList();
    }
  },
  methods: {
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },

    copy(shortCode) {
      navigator.clipboard.writeText('https://decast.live/j/' + shortCode);
    },

    getList() {
      this.isRoomsLoading = true;
      this.$store
        .dispatch('room/getList')
        .then((res) => {
          console.log(res);
          this.isRoomsLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isRoomsLoading = false;
        });
    },

    async getRecordings() {
      this.isRecordingLoading = true;
      try {
        const res = await this.$store.dispatch('room/getRecordings');
        this.isRecordingLoading = false;
        console.log(res);
      } catch (e) {
        this.isRecordingLoading = false;
        console.error('Error getting recordings', e);
      }
    },

    async handleButtonClick() {
      this.changeFocus(false);
      this.isRecordingLoading = true;
      try {
        await this.getRecordings();
      } catch (e) {
        console.error('Error getting recordings', e);
      }
      this.isRecordingLoading = false;
    },

  }
}

</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

.options-button {
  background: none;
  color: #fff;
}

.focused-button {
  color: #d7df23;
}

.room_list_cont {
  overflow: scroll !important;
  height: 220px;
}

.room_list_cont::-webkit-scrollbar {
  display: none;
}
</style>