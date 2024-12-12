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
            <NoRecording/>
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
import NoRecording from '../../../common/NoRecording.vue';
export default {
  name: "RoomSection",
  components: {
    RoomCard,
    RoomCardShimmer,
    RecordingCardShimmer,
    RecordingCard,
    NoRecording,
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
      // console.log(newList);
      this.rooms = [...newList];
      this.firstRoomId = newList.length > 0 ? newList[0] : null;
      // console.log(this.rooms);
    },
    recordingList(newList) {
      // console.log(newList);
      this.recordings = [...newList];
      // console.log(this.recordings);
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
          // console.log(res);
          this.isRoomsLoading = false;
        })
        .catch((e) => {
          // console.log(e);
          this.isRoomsLoading = false;
        });
    },

    async getRecordings() {
      this.isRecordingLoading = true;
      try {
        const res = await this.$store.dispatch('room/getRecordings');
        this.isRecordingLoading = false;
        // console.log(res);
      } catch (e) {
        this.isRecordingLoading = false;
        // console.error('Error getting recordings', e);
      }
    },

    async handleButtonClick() {
      this.changeFocus(false);
      this.isRecordingLoading = true;
      try {
        await this.getRecordings();
      } catch (e) {
        // console.error('Error getting recordings', e);
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
  height: 235px;
}

.room_list_cont::-webkit-scrollbar {
  display: none;
}
</style>