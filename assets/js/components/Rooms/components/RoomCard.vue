<template>
  <RoomCardShimmer v-if="isLoading" />
  <div
    v-else
    class="room_list flex justify-between items-center mb-4 w-full py-2 px-4"
  >
    <div>
      <p class="text-lg font-normal">
        {{ truncateText(room.room_name, 20) }}
      </p>
      <div class="flex flex-row justify-start items-center gap-4 mt-2">
        <p class="text-md shortURL">{{ shortURL }}</p>
        <button class="custm-style" @click="copy(room.short_code)">
          <span class="copy_btn_cont" v-tooltip="'/Copy'">
            <CopyButton color="#D7DF23" />
          </span>
        </button>
      </div>
    </div>

    <div class="flex gap-1 items-center">
      <div class="cursor-pointer" v-tooltip="'/Menu'">
        <MenuButton @click="openRoomMenu"/>
      </div>
      <div class="cursor-pointer">
        <span
          v-if="!isRoomStart"
          @click.prevent="start(room.room_url)"
          v-tooltip="'/Start'"
        >
          <StartButton />
        </span>

        <span v-if="isRoomStart">
          <LiveButton />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import RoomCardShimmer from "./RoomCardShimmer";
import CopyButton from "../../../../common/CopyButton.vue";
import StartButton from "../../../../common/StartButton.vue";
import LiveButton from "../../../../common/LiveButton.vue";
import MenuButton from "../../../../common/MenuButton.vue";
export default {
  name: "Roomcard",
  props: ["room", "index", "roomsList", "getRoomList"],
  data() {
    return {
      isLoading: false,
      text: "",
      rooms: [],
      recordings: [],
      isRoomStart: false,
      shortURL: "",
    };
  },
  components: {
    RoomCardShimmer,
    CopyButton,
    StartButton,
    LiveButton,
    MenuButton,
  },

  mounted() {
    this.showURL(this.room.short_code);
  },

  methods: {
    openRoomMenu() {
      this.$emit('openRoomMenu', this.room);
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
      } else {
        return text;
      }
    },

    copy(shortCode) {
      navigator.clipboard.writeText("https://decast.live/j/" + shortCode);
    },

    showURL(shortCode) {
      this.shortURL = `https://decast.live/j/` + shortCode;
    },

    start(url) {
      let id = url.split("/");
      id = id[id.length - 1];
      this.$store
        .dispatch("room/start", id)
        .then((res) => {
          this.isRoomStart = true;
          chrome.runtime.sendMessage({
            action: "updateBadge",
            badgeType: "cast",
          });

          const newWindow = window.open(
            res.data.room_url,
            "_blank",
            "width=1366,height=768,scrollbars=yes,resizable=yes"
          );

          if (
            !newWindow ||
            newWindow.closed ||
            typeof newWindow.closed === "undefined"
          ) {
            this.$vs.notify({
              title: "Window Blocked",
              text: "You have popup blockers enabled in your browser. please diable them or add decast to exception list.",
              time: 10000,
              color: "danger",
            });
          }
        })
        .catch((e) => {
          // console.log(e);
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "JetBrains Mono", monospace !important;
}

.room_list {
  border: 1px solid #fff;
}

.room_list:hover {
  border: 1px solid #d7df23;
}

.shortURL {
  color: #a6a6a6;
}
</style>
