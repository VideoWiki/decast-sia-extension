<template>
    <div class="modal" v-if="castDetails">
        <div v-if="loading">
            <CommonLoader />
        </div>
        <div class="modal-content h-full flex flex-col gap-4 justify-start items-center pt-4">
            <div
                class="basic_child_modal_ flex flex-col gap-4 justify-start items-center w-full pl-4 pr-4 pb-4 text-left">
                <p class="heading_basic_ pt-2 pb-2">
                    >>Select the network where you want to store your Decast recordings.
                </p>

                <label for="storage-select" class="text-left text-lg text-white w-full">//storage.select</label>
                <div class="relative w-full">
                    <div @click="toggleDropdown"
                        class="h-12 w-full p-2 text-lg outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
                        <div class="flex gap-4 items-center justify-start">
                            <img v-if="selectedStorage" :src="getImagePath(storages[selectedStorage].icon)"
                                class="w-8 h-8 object-contain" alt="icon">
                            <span>{{ selectedStorage ? storages[selectedStorage].desc : 'Select Storage' }}</span>
                        </div>
                        <span>
                            <DownButton />
                        </span>
                    </div>
                    <div v-if="isOpen" class="absolute w-full bg-black text-white z-10">
                        <div v-for="(storage, name) in storages" :key="name" @click="selectStorage(name)"
                            class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
                            <img class="w-8 h-8 object-contain" :src="getImagePath(storage.icon)" />
                            <span>{{ storage.desc }}</span>
                        </div>
                    </div>
                </div>

                <div class="w-full border-b border-white pb-6 flex items-center justify-center gap-4 mt-2">
                    <button
                        class="basic_start_btn_ w-1/2 p-2 text-lg text-black flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                        @click="joinNow(castDetails.public_meeting_id)" :disabled="!selectedStorage">
                        <img src="@/images/start.png" alt="">Start Decast</button>
                    <button class="cancel_btn_ w-1/2 p-2 text-lg bg-black text-red-500"
                        @click="closeModal">Cancel</button>
                </div>

                <div class="basic_wallet_container__ w-full flex flex-col mt-4 gap-4 p-4 pb-4">
                    <h2 class="text-white font-bold text-xl flex justify-between items-center">//Wallet Balance
                        <span><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                </g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M18 8V7.2C18 6.0799 18 5.51984 17.782 5.09202C17.5903 4.71569 17.2843 4.40973 16.908 4.21799C16.4802 4 15.9201 4 14.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8M21 12H19C17.8954 12 17 12.8954 17 14C17 15.1046 17.8954 16 19 16H21M3 8V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V11.2C21 10.0799 21 9.51984 20.782 9.09202C20.5903 8.71569 20.2843 8.40973 19.908 8.21799C19.4802 8 18.9201 8 17.8 8H3Z"
                                        stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </g>
                            </svg></span>
                    </h2>



                    <div class="flex flex-col gap-2">
                        <p class="text-grey-light text-lg" style="color: #22c55e;">Storage</p>
                        <p class="text-2xl font-semibold text-white"
                            v-if="swarmFreeGiven === true && selectedStorage == 'Swarm'">{{ swarmMinutes }} <span
                                class="text-lg font-normal"> Minutes</span></p>
                        <p class="text-2xl font-semibold text-white"
                            v-else-if="siaFreeGiven === true && selectedStorage == 'Sia'">{{ siaMinutes }} <span
                                class="text-lg font-normal"> Minutes</span>
                        </p>
                        <p class="text-2xl font-semibold text-white" v-else>0 <span class="text-lg font-normal">
                                Minutes</span>
                        </p>
                    </div>
                </div>

                <div class="w-full flex pb-2" @click="redirectToAddFunds">
                    <button
                        class="add_funds_btn bg-white text-black flex gap-2 justify-center items-center text-lg p-2">
                        <img src="../../../../images/coin.svg" alt="coin"> Add Minutes
                    </button>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import storages from './storage.js';
import DownButton from '../../../../common/DownButton.vue'
import constants from '../../../constant.js';
import axios from 'axios';
import CommonLoader from '../../../../common/CommonLoader.vue';

export default {
    name: "StorageModal",
    props: ['castDetails', 'index', 'getCastList'],
    data() {
        return {
            storages,
            selectedStorage: '',
            isOpen: false,
            isCastStart: false,
            loading: false,
            preSelected: false,
        }
    },
    mounted() {
        // console.log(this.castDetails, 'index');
        this.getSelectedStorage();
    },
    components: {
        DownButton,
        CommonLoader
    },
    created() {
        this.$store.dispatch('fetchUserMinutes');
    },
    computed: {
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
    methods: {
        closeModal() {
            this.$emit('close');
        },
        getImagePath(image) {
            return require(`@/images/${image}`).default;
        },
        toggleDropdown() {
            // console.log(this.selectedStorage, 'doro')
            if (this.preSelected == false) {
                this.isOpen = !this.isOpen;
            }
        },
        selectStorage(name) {
            this.selectedStorage = name;
            this.isOpen = false;
            this.$emit('input', name);
        },
        redirectToAddFunds() {
            // console.log('func call')
            window.open("https://decast.live/addfunds", "_blank");
        },
        async joinNow(id) {
            const data = {
                email: '',
                name: '',
                password: '',
                public_meeting_id: id,
                redirect: true,
                room_type: 'private',
                avatar_url: '',
                guest: false,
                attendee_password: '',
                meetingId: '',
            };
            try {
                this.loading = true;
                const res = await this.$store.dispatch('cast/joinNow', data);
                chrome.runtime.sendMessage({ action: 'updateBadge', badgeType: 'cast' });
                window.open(res.url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
                await this.updateStorageBackend(id);
                this.loading = false;
                this.getCastList();
                this.closeModal();
            } catch (e) {
                this.loading = false;
                if (e.response?.data?.status === false &&
                    e.response?.data?.message === "please check the scheduled cast start time") {
                    this.$vs.notify({
                        title: 'Warning',
                        text: 'You can only access the cast 30 minutes or less before the scheduled start time.',
                        color: 'warning',
                    });
                } else {
                    console.error('Error while joining the meeting:', e);
                    this.$vs.notify({
                        title: 'Error',
                        text: 'Failed to join the meeting. Please try again later.',
                        color: 'danger',
                    });
                }
            }
        },
        async getSelectedStorage() {
            const token = this.$store.state.accessToken;
            const cast_id = this.castDetails.public_meeting_id;
            // console.log(token, cast_id, 'llllllllllll');
            const url = `${constants.apiCastUrl}/api/event/select/storage/?cast_id=${cast_id}`;

            try {
                this.loading = true;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log('Storage retrived successfully:', response.data);

                if (response.data.SIA == true && response.data.SWARM == false) {
                    // console.log(response.data.SIA, response.data.SWARM, 'cjdkunn')
                    this.selectedStorage = 'Sia';
                    this.preSelected = true;
                } else if (response.data.SIA == false && response.data.SWARM == true) {
                    // console.log(response.data.SIA, response.data.SWARM, 'cjdkunn')
                    this.selectedStorage = 'Swarm';
                    this.preSelected = true;
                } else if (response.data.SIA == false && response.data.SWARM == false) {
                    // console.log(response.data.SIA, response.data.SWARM, 'cjdkunn')
                    this.selectedStorage = '';
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                // console.error('Error:', error);
            }
        },
        async updateStorageBackend(castId) {
            if (this.preSelected === false) {
                const token = this.$store.state.accessToken;
                const storageParams = {
                    cast_id: castId,
                    Sia: this.selectedStorage === 'Sia',
                    Swarm: this.selectedStorage === 'Swarm',
                };
                const url = `${constants.apiCastUrl}/api/event/select/storage/`;

                try {
                    const response = await axios.post(url, storageParams, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // console.log('Storage updated successfully:', response.data);
                } catch (error) {
                    // console.error('Error updating storage:', error);
                }
            }
        },
    }
}
</script>


<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.modal {
    z-index: 99;
    position: absolute;
    background: #000;
    border: 1px solid #fff;
    color: #fff;
    width: 100%;
    height: 400px;
    left: 0;
    top: 0;
}

.basic_child_modal_ {
    height: 400px;
    overflow-y: scroll;
}

.modal ::-webkit-scrollbar {
    display: none;
}


.close {
    border: 1px solid red;
    width: 24px;
    height: 24px;
    position: absolute;
    background-color: #000;
    z-index: 5;
    right: -5px;
    top: -10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.basic_wallet_container__ {
    border: 1px solid white;
}

.storage-select {
    border: 1px solid white;
}

.add_funds_btn {
    border: 1px solid #d7df23;
    border-right: 2px solid #d7df23;
    border-bottom: 2px solid #d7df23;
}

.basic_start_btn_ {
    background: #22c55e;
    border: 1px solid #fff;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
}

.cancel_btn_ {
    border: 1px solid red;
    border-right: 2px solid red;
    border-bottom: 2px solid red;
}

.storage_opt_ {
    /* border: 1px solid white; */
    background-color: #151515;
}

.heading_basic_ {
    border-top: 2px dashed #fff;
    border-bottom: 2px dashed #fff;
    color: #22c55e;
}
</style>