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
        <div v-else class="recording flex flex-col items-center justify-items-center">
          <span>
            <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve" width="180px"
              height="180px">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path
                    d="M0,0v12v2v46h60V14v-2V0H0z M20,39h-3v8c0,0.552-0.448,1-1,1s-1-0.448-1-1v-8H9c-0.552,0-1-0.448-1-1V27 c0-0.552,0.448-1,1-1s1,0.448,1,1v10h5v-2c0-0.552,0.448-1,1-1s1,0.448,1,1v2h3c0.552,0,1,0.448,1,1S20.552,39,20,39z M36,41.5 c0,3.584-2.916,6.5-6.5,6.5S23,45.084,23,41.5v-9c0-3.584,2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5V41.5z M51,39h-3v8 c0,0.552-0.448,1-1,1s-1-0.448-1-1v-8h-6c-0.552,0-1-0.448-1-1V27c0-0.552,0.448-1,1-1s1,0.448,1,1v10h5v-2c0-0.552,0.448-1,1-1 s1,0.448,1,1v2h3c0.552,0,1,0.448,1,1S51.552,39,51,39z M2,12V2h56v10H2z">
                  </path>
                  <polygon
                    points="54.293,3.293 52,5.586 49.707,3.293 48.293,4.707 50.586,7 48.293,9.293 49.707,10.707 52,8.414 54.293,10.707 55.707,9.293 53.414,7 55.707,4.707 ">
                  </polygon>
                  <rect x="3" y="3" width="39" height="8"></rect>
                  <path
                    d="M29.5,28c-2.481,0-4.5,2.019-4.5,4.5v9c0,2.481,2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5v-9C34,30.019,31.981,28,29.5,28z">
                  </path>
                </g>
              </g>
            </svg>
          </span>
          <h1 class="text-lg text-white font-semibold">Oops! No Recordings Found.</h1>
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