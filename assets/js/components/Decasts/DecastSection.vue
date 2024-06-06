<template>
  <div>
    <p class="font-bold text-2xl">//Scheduled Casts</p>
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
        <CastCard :castDetails="cast" :index="index" :getCastList="getCastList" />
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
          <RecordingCard :recording="recording" :index="index" :getRecordings="getRecordings" />
        </div>
      </div>
      <div v-else class="recording flex flex-col items-center justify-items-center">
        <span>
          <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve" width="180px"
            height="180px">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="roun" stroke-linejoin="round"></g>
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
</template>

<script>
import CastCardShimmer from './components/DecastCardShimmer.vue';
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';
import RecordingCard from './components/RecordingCard.vue';
import CastCard from './components/DecastCard.vue';
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
    };
  },
  components: {
    CastCardShimmer,
    RecordingCardShimmer,
    RecordingCard,
    CastCard
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
  },
  watch: {
    recordingList(newList) {
      this.recordings = [...newList];
    }
  },
  methods: {
    changeFocus(toYourRooms) {
      this.focusYourRooms = toYourRooms;
    },
    async handleButtonClick() {
      this.getRecordings();
      this.changeFocus(false);
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
        const res = await this.$store.dispatch('cast/recordings');
        this.isRecordingLoading = false;
        console.log(res);
      } catch (e) {
        this.isRecordingLoading = false;
        console.log(e);
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
        const response = await this.$store.dispatch('cast/getAllCasts');
        if (response.data.my_events) {
          const allEvents = response.data.my_events.sort((a, b) => b.event_id - a.event_id);
          this.castList = allEvents;
          console.log('This is castlist', this.castList)
          this.isCastsLoading = false;
        }
      } catch (error) {
        this.isCastsLoading = false;
        console.log("Error in fetching cast detail");
      }
    },
    toggleCopy(index) {
      this.showCopy = this.showCopy === index ? null : index;
      console.log(index, 'copy');
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
