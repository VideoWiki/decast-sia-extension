<template>
  <StorageModal v-if="showStorageModal" :castDetails="selectedCast" :index="index" @close="closeModal"
    :getCastList="getCastList" />
  <div>
    <p class="font-bold text-2xl">//Decentralized Casts</p>
    <p class="mt-2" style="color: gray; font-size: 16px">
      //Host casts that have decentralized records.
    </p>
  </div>

  <div class="choose-room mt-4 mb-4 flex flex-row gap-4">
    <button class="options-button border-none text-lg font-bold" @click="changeFocus(true)"
      :class="{ 'focused-button': focusYourRooms }">
      Decasts
    </button>
    <button class="options-button border-none text-lg font-bold" @click="handleButtonClick"
      :class="{ 'focused-button': !focusYourRooms }">
      Recordings
    </button>
  </div>

  <div class="flex flex-col gap-4">
    <div class="cast_list_cont" v-if="focusYourRooms">
      <div v-if="isCastsLoading">
        <CastCardShimmer />
        <CastCardShimmer :style="{ opacity: 0.6 }" />
        <CastCardShimmer :style="{ opacity: 0.5 }" />
      </div>
      <div v-else v-for="(cast, index) in castList" :key="index">
        <CastCard :castDetails="cast" :index="index" :getCastList="getCastList" @openModal="openModal(cast)" />
      </div>
    </div>
    <div v-else class="cast_list_cont">
      <div v-if="isRecordingLoading">
        <RecordingCardShimmer />
        <RecordingCardShimmer :style="{ opacity: 0.7 }" />
        <RecordingCardShimmer :style="{ opacity: 0.6 }" />
      </div>
      <div v-else-if="recordingList.length">
        <div class="recordings flex justify-between items-center mb-4"
          v-for="(recording, index) in flattenedRecordingList" :key="index">
          <RecordingCard :recording="recording" :index="index" :getRecordings="getRecordings" :siaMinutes="siaMinutes" :siaFreeGiven="siaFreeGiven" :swarmMinutes="swarmMinutes" :swarmFreeGiven="swarmFreeGiven"/>
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
</template>

<script>
import CastCardShimmer from './components/DecastCardShimmer.vue';
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';
import RecordingCard from './components/RecordingCard.vue';
import CastCard from './components/DecastCard.vue';
import StorageModal from './components/StorageModal.vue';
export default {
  name: "CastSection",
  data() {
    return {
      castList: [],
      focusYourRooms: true,
      isCastsLoading: false,
      isRecordingLoading: false,
      showCastIsLive: false,
      index: '',
      // moment,
      casts: [],
      recordings: [],
      showStorageModal: false,
      selectedCast: null,
    };
  },
  components: {
    CastCardShimmer,
    RecordingCardShimmer,
    RecordingCard,
    CastCard,
    StorageModal
  },
  mounted() {
    this.getCastList();
  },
  computed: {
    flattenedRecordingList() {
      return this.flattenRecordingList(this.recordings);
    },
    recordingList() {
      return this.$store.state.cast.recordings;
    },
    siaMinutes() {
      return this.$store.state.siaMinutes;
    },
    siaFreeGiven() {
      return this.$store.state.siaFreeGiven;
    },
    swarmMinutes() {
      return this.$store.state.swarmMinutes;
    },
    swarmFreeGiven() {
      return this.$store.state.swarmFreeGiven;
    },
  },
  watch: {
    recordingList(newList) {
      this.recordings = [...newList];
    }
  },
  methods: {
    // handleStartCast(id) {
    //   this.castList[id].isCastStart = true;
    //   this.closeModal();
    // },
    openModal(cast) {
      this.selectedCast = cast;
      this.showStorageModal = true;
    },
    closeModal() {
      this.showStorageModal = false;
    },
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    async handleButtonClick() {
      this.getRecordings();
      this.changeFocus(false);
      this.$store.dispatch('fetchUserMinutes');
    },
    flattenRecordingList(recordings) {
      const flattenedList = [];
      recordings.forEach((meetings) => {
        meetings.forEach((recording) => {
          flattenedList.push(recording);
        });
      });
      return flattenedList;
    },
    async getRecordings() {
      this.isRecordingLoading = true;
      try {
        const res = await this.$store.dispatch('cast/decastRecordings');
        this.isRecordingLoading = false;
        // console.log(res);
      } catch (e) {
        this.isRecordingLoading = false;
        // console.log(e);
      }
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    },
    async getCastList() {
      this.isCastsLoading = true;
      try {
        const response = await this.$store.dispatch('cast/getDecasts');
        if (response.data.my_events) {
          const allEvents = response.data.my_events.sort((a, b) => b.event_id - a.event_id);
          this.castList = allEvents;
          // console.log('This is castlist', this.castList)
          this.isCastsLoading = false;
        }
      } catch (error) {
        this.isCastsLoading = false;
        // console.log("Error in fetching cast detail");
      }
    },
    toggleCopy(index) {
      this.showCopy = this.showCopy === index ? null : index;
      // console.log(index, 'copy');
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

.cast_list_cont {
  overflow: scroll !important;
  height: 220px;
}

.cast_list_cont::-webkit-scrollbar {
  display: none;
}
</style>
