<template>
    <div class="modal" v-if="castDetails">
        <div class="modal-content h-full flex flex-col gap-4 justify-start items-center pt-4">
            <!-- <div class="relative w-full flex justify-end">
                <span class="close text-xl font-bold text-red-500 text-center" @click="closeModal">X</span>
            </div> -->

            <div
                class="basic_child_modal_ flex flex-col gap-4 justify-start items-center w-full pl-4 pr-4 pb-4 text-left">
                <p class="heading_basic_ text-white pt-2 pb-2">
                    Select the network where you want to store your Decast recordings.
                </p>

                <label for="storage-select" class="text-left text-lg text-white w-full">//Storage.Select</label>
                <div class="relative w-full">
                    <div @click="toggleDropdown"
                        class="h-12 w-full p-2 text-lg outline-none bg-black text-white flex justify-between items-center cursor-pointer storage-select">
                        <div class="flex gap-4 items-center justify-start">
                            <img v-if="selectedStorage" :src="getImagePath(storages[selectedStorage].icon)" class="w-8 h-8 object-contain" alt="icon">
                        <span>{{ selectedStorage ? storages[selectedStorage].desc : 'Select Storage' }}</span>
                        </div>
                        <span>
                            <DownButton />
                        </span>
                    </div>
                    <div v-if="isOpen" class="absolute w-full bg-black text-white z-10">
                        <div v-for="(storage, name) in storages" :key="name" @click="selectStorage(name)"
                            class="storage_opt_ p-2 h-12 flex gap-4 items-center justify-start cursor-pointer text-lg hover:bg-gray-800 hover:text-green-500">
                            <img class="w-8 h-8 object-contain rounded-full" :src="getImagePath(storage.icon)" />
                            <span >{{ storage.desc }}</span>
                        </div>
                    </div>
                </div>
                <div class="basic_wallet_container__ w-full flex flex-col mt-2 gap-4 p-4 pb-4">
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
                        <p class="text-grey-light text-lg" style="color: #22c55e;">Minutes</p>
                        <p class="text-2xl font-semibold text-white">37.5</p>
                    </div>
                </div>

                <div class="w-full flex border-b border-white pb-6">
                    <button
                        class="add_funds_btn bg-white text-black flex gap-2 justify-center items-center text-lg p-2">
                        <img src="../../../../images/coin.svg" alt="coin"> Add Minutes
                    </button>
                </div>

                <div class="w-full flex items-center justify-center gap-4 mt-8">
                    <button
                        class="basic_start_btn_ w-1/2 p-2 text-lg bg-white text-black flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                        @click="joinNow(castDetails.public_meeting_id)" :disabled="!selectedStorage">
                        <img src="@/images/start.png" alt="" >Start Decast</button>
                    <button class="cancel_btn_ w-1/2 p-2 text-lg bg-black text-red-500" @click="closeModal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storages from './storage.js';
import DownButton from '../../../../common/DownButton.vue'
export default {
    name: "StorageModal",
    props: ['castDetails', 'index','getCastList'],
    data() {
        return {
            storages,
            selectedStorage: '',
            isOpen: false,
            isCastStart:false,
        }
    },
    mounted() {
        console.log(this.castDetails, 'index');
    },
    components: {
        DownButton
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        getImagePath(image) {
            return require(`@/images/${image}`).default;
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectStorage(name) {
            this.selectedStorage = name;
            this.isOpen = false;
            this.$emit('input', name);
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
                const res = await this.$store.dispatch('cast/joinNow', data);
                // this.isCastStart = true;
                // window.open(res.url, '_blank');
                window.open(res.url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
                this.getCastList();
                this.closeModal();
            } catch (e) {
                console.log('error', e);
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
    height: 385px;
    left: 0;
    top: 0;
}

.basic_child_modal_ {
    height: 385px;
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
    border: 1px solid #d7df23;
    border-right: 2px solid #d7df23;
    border-bottom: 2px solid #d7df23;
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