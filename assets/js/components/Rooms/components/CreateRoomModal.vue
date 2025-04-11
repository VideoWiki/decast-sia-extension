<template>
    <div class="modal">
        <div v-if="loading">
            <CommonLoader />
        </div>
        <div class="modal-content h-full flex flex-col gap-4 justify-start items-center pt-4">
            <div
                class="basic_child_modal_ flex flex-col gap-4 justify-start items-center w-full pl-4 pr-4 pb-4 text-left">
             

                <label for="storage-select" class="text-left w-full text-xl text-white">//room.create</label>

                <input type="text" v-model="roomName" placeholder="Room Name"
                    class="input_field p-2 w-full text-black text-xl mt-8" />

                <div class="w-full flex items-center justify-between gap-4">
                    <button @click="createRoom" :disabled="roomName == ''"
                        class="btn-create-room w-1/2 p-2 text-lg text-black flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed">
                        >>Create
                    </button>
                    <button @click="closeModal" class="cancel_btn_ w-1/2 p-2 text-lg bg-black text-red-500">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CommonLoader from '../../../../common/CommonLoader.vue';
export default {
    name: 'CreateRoomModal',
    props: ['getList'],
    data() {
        return {
            roomName: "",
            loading: false,
        };
    },
    components: {
        CommonLoader,
    },
    methods: {
        createRoom() {
            // console.log('create called');
            const board_id = localStorage.getItem("LOG_BOARDID");
            this.loading = true;
            this.$store
                .dispatch('room/addRoom', { room_name: this.roomName, board_id: board_id })
                .then(async (res) => {
                    // console.log(res.data);
                    this.createPopup = false;
                    this.loading = false;
                    this.$vs.notify({
                        title: 'Congrats!',
                        text: 'Room created successfully',
                        color: 'success',
                    });
                    this.closeModal();
                    this.getList();
                })
                .catch((e) => {
                    this.$vs.notify({
                        title: 'error',
                        text: 'Try again!',
                        color: 'danger',
                    });
                    this.loading = false;
                    console.log(e.resonse);
                });
        },
        closeModal() {
            this.$emit('close');
        },
    },
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
    height: 415px;
    left: 0;
    top: 0;
}

.basic_child_modal_ {
    height: 415px;
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

.btn-create-room {
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

.heading_basic_ {
    border-top: 2px dashed #fff;
    border-bottom: 2px dashed #fff;
    color: #22c55e;
}

.input_field {}
</style>