<template>
  <div class="parent_app_">
    <div class="basic_parent_div">
      <!-- header section -->
      <div class="parent_1">
        <div class="basic_child_1">
          <img src="../../images/new-dc.svg" />
          <p>Anish Jha</p>
        </div>

        <div class="basic_child_2">
          <img src="../../images/settings.svg" />
        </div>
      </div>

      <div class="parent_2">
        <div class="basic_child_3"></div>
        <div class="basic_child_4"></div>
      </div>
      <!-- calls section  -->

      <div class="parent_3 p-4">
        <RoomSection v-if="rooms" />
        <CastSection v-if="casts" />
        <DecastSection v-if="decasts" />
        <!-- <p class="text-white">this is : {{ userInfo }}</p> -->
      </div>
    </div>

    <!-- footer section  -->

    <div class="basic_button_section bg-white">
      <button @click="onRoom" :class="{ 'calls_btn_': true, 'calls_clicked': isClicked1 }" class="px-4 py-2 text-xl font-bold">
        <span class="call_icon_cont_"><svg width="34" height="34" viewBox="0 0 34 34" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M21.103 0V2.08333H12.7696V0H21.103Z" fill="white" />
            <path d="M25.2698 4.16667H21.103V2.08333H25.2698V4.16667Z" fill="white" />
            <path d="M27.3531 6.25H25.2698V4.16667H27.3531V6.25Z" fill="white" />
            <path d="M29.4365 8.33333H27.3531V6.25H29.4365V8.33333Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M31.5198 12.5H29.4365V8.33333H31.5198V12.5ZM31.5198 12.5H33.6032V22.9167H31.5198V12.5Z" fill="white" />
            <path d="M10.6863 4.16667V6.25H2.35288V4.16667H10.6863Z" fill="white" />
            <path d="M2.35288 18.75H0.269531V6.25H2.35288V18.75Z" fill="white" />
            <path d="M4.43623 22.9167H2.35288V18.75H4.43623V22.9167Z" fill="white" />
            <path d="M6.51959 25H4.43623V22.9167H6.51959V25Z" fill="white" />
            <path d="M8.60294 27.0833H6.51959V25H8.60294V27.0833Z" fill="white" />
            <path d="M10.6863 29.1667H8.60294V27.0833H10.6863V29.1667Z" fill="white" />
            <path d="M14.853 31.25H10.6863V29.1667H14.853V31.25Z" fill="white" />
            <path d="M27.3531 31.25V33.3333H14.853V31.25H27.3531Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M21.103 22.9167V20.8333H27.3531V22.9167H21.103ZM27.3531 22.9167H29.4365V31.25H27.3531V22.9167Z"
              fill="white" />
            <path d="M19.0197 25V22.9167H21.103V25H19.0197Z" fill="white" />
            <path d="M14.853 25H19.0197V27.0833H14.853V25Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.6863 20.8333H12.7696V22.9167H10.6863V20.8333ZM12.7696 22.9167H14.853V25H12.7696V22.9167Z"
              fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M8.60294 14.5833V18.75H6.51959V14.5833H8.60294ZM8.60294 18.75H10.6863V20.8333H8.60294V18.75Z"
              fill="white" />
            <path d="M10.6863 12.5V14.5833H8.60294V12.5H10.6863Z" fill="white" />
            <path d="M10.6863 12.5H12.7696V6.25H10.6863V12.5Z" fill="white" />
            <path
              d="M14.853 6.25V8.33333H21.103V10.4167H23.1864V12.5H25.2698V18.75H27.3531V12.5H25.2698V10.4167H23.1864V8.33333H21.103V6.25H14.853Z"
              fill="white" />
            <path class="path_black_"
              d="M2.35303 6.25H10.6864V12.5H8.60308V14.5833H6.51973V18.75H8.60308V20.8333H10.6864V22.9167H12.7698V25H14.8531V27.0833H19.0198V25H21.1032V22.9167H27.3532V31.25H14.8531V29.1667H10.6864V27.0833H8.60308V25H6.51973V22.9167H4.43638V18.75H2.35303V6.25Z"
              fill="black" />
          </svg>
        </span>
        CALLS
      </button>
      <button @click="onCasts" :class="{ 'casts_btn': true, 'cast_clicked': isClicked2 }" class="px-4 py-2 text-xl font-bold">
        <span><svg width="38" height="27" viewBox="0 0 38 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.7034 6.99957H24.9257V4.77734H22.7034V6.99957Z" fill="white" />
            <path d="M24.9257 9.22179H27.148V6.99957H24.9257V9.22179Z" fill="white" />
            <path d="M24.9257 20.3329H27.148V18.1107H24.9257V20.3329Z" fill="white" />
            <path d="M22.7034 22.5551H24.9257V20.3329H22.7034V22.5551Z" fill="white" />
            <path d="M18.2588 11.444H20.4811V9.22179H18.2588V11.444Z" fill="white" />
            <path d="M18.2588 18.1107H20.4811V15.8885H18.2588V18.1107Z" fill="white" />
            <path d="M29.3703 9.22179H27.148V18.1107H29.3703V9.22179Z" fill="white" />
            <path d="M22.7034 11.444H20.4811V15.8885H22.7034V11.444Z" fill="white" />
            <path d="M30.8525 4.7774H33.0748V2.55518H30.8525V4.7774Z" fill="white" />
            <path d="M30.8525 24.7774H33.0748V22.5552H30.8525V24.7774Z" fill="white" />
            <path d="M33.0748 22.5552H35.2971V18.1107H33.0748V22.5552Z" fill="white" />
            <path d="M37.5194 9.22184H35.2971V18.1107H37.5194V9.22184Z" fill="white" />
            <path d="M35.2971 4.7774H33.0748V9.22184H35.2971V4.7774Z" fill="white" />
            <path
              d="M11.3457 6.75328H15.7903V20.0866H11.3457V22.3088H6.90109V24.5311H2.4565V2.30884H6.90109V4.53106H11.3457V6.75328Z"
              fill="black" />
            <path d="M7.1473 24.7777V26.9999H2.70271V24.7777H7.1473Z" fill="white" />
            <path d="M11.5919 22.5555V24.7777H7.1473V22.5555H11.5919Z" fill="white" />
            <path d="M16.0365 20.3333V22.5555H11.5919V20.3333H16.0365Z" fill="white" />
            <path d="M16.0365 6.99992H18.2588V20.3333H16.0365V6.99992Z" fill="white" />
            <path d="M11.5919 6.99992V4.7777H16.0365V6.99992H11.5919Z" fill="white" />
            <path d="M7.1473 4.7777V2.55547H11.5919V4.7777H7.1473Z" fill="white" />
            <path d="M2.70271 2.55547V0.333252H7.1473V2.55547H2.70271Z" fill="white" />
            <path d="M2.70271 24.7777H0.480408V2.55547H2.70271V24.7777Z" fill="white" />
            <rect x="14.8022" y="11.6917" width="5.43228" height="3.95062" fill="black" />
          </svg>
        </span>
        CASTS
      </button>
      <button @click="onDecasts" :class="{ 'decast_btn': true, 'decast_clicked': isClicked3 }" class="decast_btn px-4 py-2 text-xl font-bold">
        <span><svg width="24" height="34" viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.3803 23.8096V21.4286V19.0477V16.6667H9.61841V19.0477V21.4286V23.8096V26.1905V28.5715H14.3803V26.1905V23.8096Z"
              fill="black" />
            <path d="M16.7613 33.3334H19.1423H21.5232H23.9042V28.5715H21.5232H19.1423H16.7613H14.3804V33.3334H16.7613Z"
              fill="black" />
            <path d="M19.1423 16.6669H21.5232H23.9042V11.905H21.5232H19.1423H16.7613H14.3804V16.6669H16.7613H19.1423Z"
              fill="black" />
            <path
              d="M9.95174 7.14316V5.09554H14.047V7.14316V9.52411V11.9051V14.286V16.3336H9.95174V14.286V11.9051V9.52411V7.14316Z"
              fill="white" stroke="black" stroke-width="0.666667" />
            <path d="M2.47592 17.0003H4.85687H7.23782H9.28544V21.0956H7.23782H4.85687H2.47592H0.428304V17.0003H2.47592Z"
              fill="white" stroke="black" stroke-width="0.666667" />
            <path
              d="M4.85687 0.333577H7.23782H9.28544V4.42881H7.23782H4.85687H2.47592H0.428304V0.333577H2.47592H4.85687Z"
              fill="white" stroke="black" stroke-width="0.666667" />
          </svg>
        </span>
        DECASTS
      </button>
    </div>
  </div>
</template>

<script>
import RoomSection from "./Rooms/RoomSection.vue";
import CastSection from "./Casts/CastSection.vue";
import DecastSection from "./Decasts/DecastSection.vue";
import "../../css/popup.css";
export default {
  name: "PopUp",
  components: {
    RoomSection,
    CastSection,
    DecastSection
  },
  data() {
    return {
      accessToken: "",
      userInfo: {},
      rooms: true,
      casts: false,
      decasts: false,
      isClicked1:true,
      isClicked2:false,
      isClicked3:false,
    };
  },
  methods: {
    onRoom() {
      this.casts = false;
      this.decasts = false;
      this.rooms = true;
      this.isClicked2=false;
      this.isClicked1=true;
      this.isClicked3=false;
    },
    onCasts() {
      this.casts = true;
      this.decasts = false;
      this.rooms = false;
      this.isClicked2=true;
      this.isClicked1=false;
      this.isClicked3=false;
    },
    onDecasts() {
      this.casts = false;
      this.decasts = true;
      this.rooms = false;
      this.isClicked2=false;
      this.isClicked1=false;
      this.isClicked3=true;
    },
  },
  // props: {
  //   accessToken: String,
  //   userInfo: Object,
  // },

  // mounted() {
  //   chrome.storage.local.get(['accessToken', 'userInfo'], (result) => {
  //     this.accessToken = result.accessToken;
  //     this.userInfo = result.userInfo
  //   });
  // }
};
</script>

<style scoped>
.parent_app_ {
  width: 500px;
  height: 600px;
  background-color: #010101;
  overflow: hidden;
}

.basic_parent_div {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 15px;
  color: white;
}

.parent_1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.basic_child_1 {
  display: flex;
  gap: 8px;
  align-items: center;
  height: 40px;
}

.basic_child_1 img {
  width: 40px;
  height: 40px;
}

.basic_child_1 p {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.basic_child_2 img {
  width: 25px;
  height: 25px;
}

.parent_2 {
  width: 100%;
  background: #fff;
  height: 25px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
}

.basic_child_3 {
  width: 80px;
  height: 10px;
  background: #010101;
}

.basic_child_4 {
  width: 50px;
  height: 10px;
  background: #010101;
  margin-right: 15px;
}

.parent_3 {
  width: 100%;
  height: 385px;
  border: 1px solid #fff;
}

.basic_button_section {
  width: 100% !important;
  margin: 0% !important;
  display: flex;
  justify-content: space-between;
  align-self: baseline;
  padding: 15px;
}

.basic_button_section button {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  width: 140px;
  height: 60px;
}

.calls_btn_ {
  background: white;
  color: black;
}

.calls_clicked {
  background: #010101;
  color: white;
}

/* .calls_btn_ svg path{
  fill: #fff !important;
}

.calls_clicked svg path{
  fill: #010101 !important;
}

*/

.cast_clicked{
  background: #010101;
  color: #fff;
}

.cast_clicked svg path{
  fill: white !important;
} 

.decast_clicked{
  background: #010101;
  color: #fff;
}

.decast_clicked svg path{
  fill: white !important;
}
</style>
