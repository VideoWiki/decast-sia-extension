<template>
  <div>
    <p class="font-bold text-2xl">//Scheduled Casts</p>
    <p class="mt-2" style="color: gray; font-size: 16px">
      //Host large audience social events.
    </p>
  </div>

  <div class="choose-room mt-4 mb-4 flex flex-row gap-4">
    <button class="options-button border-none text-lg font-bold" @click="changeFocus(true)"
      :class="{ 'focused-button': focusYourRooms }">
      Casts
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
      <div v-else class="recording flex flex-col items-center justify-items-center gap-4 mt-4">
        <span>
          <NoRecording />
        </span>
        <h1 class="text-lg text-white font-semibold">No Recordings Found.</h1>
      </div>
    </div>
  </div>
</template>

<script>
import CastCardShimmer from './components/CastCardShimmer.vue';
import RecordingCardShimmer from './components/RecordingCardShimmer.vue';
import RecordingCard from './components/RecordingCard.vue';
import CastCard from './components/CastCard.vue';
import NoRecording from '../../../common/NoRecording.vue';
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
    CastCard,
    NoRecording
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
        const response = await this.$store.dispatch('cast/getAllCasts');
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