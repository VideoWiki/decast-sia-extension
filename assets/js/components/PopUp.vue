<template>
  <div class="parent_app_" v-if="Object.keys(userInfo).length == 0 && accessToken == null">
    <div class="basic_parent_div">
      <!-- header section -->
      <div class="parent_1">
        <div class="basic_child_1">
          <img src="../../images/new-dc.svg" />
          <p>Welcome to Decast!</p>
        </div>

        <div class="basic_child_2">
          <img src="../../images/settings.svg" />
        </div>
      </div>

      <div class="parent_2">
        <div class="basic_child_3"></div>
        <div class="basic_child_4"></div>
      </div>

      <div class="parent_nouser">
        <NoUser />
      </div>
    </div>
  </div>



  <div v-else class="parent_app_">
    <div class="basic_parent_div">
      <!-- header section -->
      <div class="parent_1">
        <div class="basic_child_1">
          <img src="../../images/new-dc.svg" />
          <p>{{ userInfo.first_name }} </p>
        </div>

        <div class="basic_child_2 flex items-center justify-end gap-8">
          <div class="flex flex-row">
            <p class="text-lg flex flex-row gap-2 items-center justify-end">{{ normalPrice.price }} <span
                class="text-md">gwei</span>
              <span class="reload cursor-pointer" @click="getGasPricesFromStorage">
                <svg class="reload-icon" fill="#ffffff" width="20px" height="20px" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"></path>
                  </g>
                </svg>
              </span>
            </p>
            <!-- <p class="text-md">{{ normalPrice.maxPriorityFeePerGas }} $</p> -->
          </div>
          <img src="../../images/settings.svg" v-tooltip.left="'/My Profile'" class="cursor-pointer"
            @click="onProfile" />
        </div>
      </div>

      <div class="parent_2">
        <div class="basic_child_3"></div>
        <div class="basic_child_4"></div>
      </div>


      <!-- calls section  -->

      <div class="parent_3 p-4">
        <ErrorModal :errorMessage="$store.state.errorMessage" :showModal="$store.state.showModal"
          @close="$store.commit('closeErrorModal')" />
        <UserInfo v-if="showProfile" :showProfile="this.showProfile" @close="this.showProfile = false" />
        <RoomSection v-if="rooms" />
        <CastSection v-if="casts" />
        <DecastSection v-if="decasts" />
        <!-- <p class="text-white">this is : {{ userInfo }}</p> -->
      </div>
    </div>

    <!-- footer section  -->

    <div class="basic_button_section p-4 pt-0 bg-black flex items-center justify-between w-full">
      <button @click="onRoom" :class="{ 'calls_btn_': true, 'calls_clicked': isClicked1 }"
        class="px-6 py-1 text-xl font-bold">
        <img :src="callSrc" alt="Image">
        <p class="font-semibold text-base">CALLS</p>
      </button>
      <button @click="onCasts" :class="{ 'casts_btn': true, 'cast_clicked': isClicked2 }"
        class="px-6 py-1 text-xl font-bold mx-4">
        <img :src="castSrc" alt="Image">
        <p class="font-semibold text-base">CASTS</p>
      </button>
      <button @click="onDecasts" :class="{ 'decast_btn': true, 'decast_clicked': isClicked3 }"
        class="decast_btn px-6 py-1 text-xl font-bold">
        <img :src="decastSrc" alt="Image">
        <p class="font-semibold text-base">DECAST</p>
      </button>
    </div>
  </div>
</template>

<script>
import RoomSection from "./Rooms/RoomSection.vue";
import CastSection from "./Casts/CastSection.vue";
import DecastSection from "./Decasts/DecastSection.vue";
import NoUser from "./NoData/NoUser.vue";
import ErrorModal from '../../common/SessionExpired.vue';
import UserInfo from './User/UserInfo.vue';
import "../../css/popup.css";
import axios from "axios";
import callIcon from '@/images/call-icon.svg';
import callIconAlt from '@/images/call-icon-alt.svg';
import castIcon from '@/images/cast-icon.svg';
import castIconAlt from '@/images/cast-icon-alt.svg';
import decastIcon from '@/images/decast-icon.svg';
import decastIconAlt from '@/images/decast-icon-alt.svg';
export default {
  name: "PopUp",
  components: {
    RoomSection,
    CastSection,
    DecastSection,
    NoUser,
    ErrorModal,
    UserInfo
  },
  data() {
    return {
      rooms: true,
      casts: false,
      decasts: false,
      isClicked1: true,
      isClicked2: false,
      isClicked3: false,
      showProfile: false,
      fastPrice: '',
      slowPrice: '',
      normalPrice: '',
      hasOpenLoading: false,
      gasPriceInterval: '',
      callSrc: callIcon,
      castSrc: castIcon,
      decastSrc: decastIcon,
      types: [
        'default',
        'waves',
        'corners',
        'border',
        'points',
        'square',
        'gradient',
        'rectangle',
        'circles',
        'square-rotate',
        'scale'
      ]
    };
  },
  computed: {
    accessToken() {
      return this.$store.state.accessToken;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
    // getFirstname() {
    //   return this.userInfo.first_name;
    // },
  },
  async mounted() {
    // await this.getGasPrices();
    // this.startGasPriceInterval();

    await this.getGasPricesFromStorage();
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'updateGasPrices') {
        this.getGasPricesFromStorage();
      }
    });
    this.onRoom();
  },
  methods: {
    onProfile() {
      this.showProfile = true;
    },
    onRoom() {
      this.casts = false;
      this.decasts = false;
      this.rooms = true;
      this.isClicked2 = false;
      this.isClicked1 = true;
      this.isClicked3 = false;
      this.callSrc = callIcon;
      this.castSrc = castIconAlt;
      this.decastSrc = decastIconAlt;
      // console.log(this.accessToken, this.userInfo, 'data')
    },
    onCasts() {
      this.casts = true;
      this.decasts = false;
      this.rooms = false;
      this.isClicked2 = true;
      this.isClicked1 = false;
      this.isClicked3 = false;
      this.callSrc = callIconAlt;
      this.castSrc = castIcon;
      this.decastSrc = decastIconAlt;
      // console.log(this.accessToken, this.userInfo, 'data')
    },
    onDecasts() {
      this.casts = false;
      this.decasts = true;
      this.rooms = false;
      this.isClicked2 = false;
      this.isClicked1 = false;
      this.isClicked3 = true;
      this.callSrc = callIconAlt;
      this.castSrc = castIconAlt;
      this.decastSrc = decastIcon;
    },
    async getGasPricesFromStorage() {
      this.hasOpenLoading = true;
      chrome.storage.local.get('gasPrices', (result) => {
        if (result.gasPrices) {
          this.fastPrice = result.gasPrices.find(price => price.confidence === 99);
          this.normalPrice = result.gasPrices.find(price => price.confidence === 90);
          this.slowPrice = result.gasPrices.find(price => price.confidence === 80);
        } else {
          console.log('No gas price data available');
        }
        this.hasOpenLoading = false;
      });
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'JetBrains Mono', monospace !important;
}

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
  font-size: 22px;
  font-weight: semibold;
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
  /* border: 1px solid red */
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
  height: 415px;
  border: 1px solid #fff;
  position: relative;
  /* border: 1px solid red */
}

.reload:active .reload-icon path {
  fill: #d7df23;
}

.reload:active {
  animation: rotateIcon 0.5s linear;
  transform-origin: center;
  transition-delay: 0.3s;
  transition: 0.5s ease-in-out;
}

@keyframes rotateIcon {
  100% {
    transform: rotate(720deg);
  }
}

.basic_button_section button{
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 145px;
}

.calls_btn_ {
  background-color: black;
  border: 1px solid white;
  color: white;
}

.calls_clicked {
  background-color: white;
  color: black;
}

.casts_btn {
  background-color: black;
  border: 1px solid white;
  color: white;
}

.cast_clicked {
  background-color: white;
  color: black;
}

.decast_btn {
  background-color: black;
  border: 1px solid white;
  color: white;
}

.decast_clicked {
  background-color: white;
  color: black;
}
</style>
