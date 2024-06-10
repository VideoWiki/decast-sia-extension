<!-- ErrorModal.vue -->
<template>
    <div class="modal" v-if="showModal">
        <div class="modal-content flex flex-col gap-8 justify-start items-center">
            <div class="relative w-full flex justify-end">
                <span class="close text-xl font-bold text-red-500 text-center" @click="closeModal">X</span>
            </div>
            <!-- <p>{{ errorMessage }}</p> -->
            <div class="basic_child_modal_ flex flex-col justify-between items-center w-full p-4">
                <span>
                    <svg width="192px" height="192px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <title>expire-solid</title>
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="icons_Q2" data-name="icons Q2">
                                    <g>
                                        <rect width="48" height="48" fill="none"></rect>
                                        <g>
                                            <path
                                                d="M14.2,31.9h0a2,2,0,0,0-.9-2.9A11.8,11.8,0,0,1,6.1,16.8,12,12,0,0,1,16.9,6a12.1,12.1,0,0,1,11.2,5.6,2.3,2.3,0,0,0,2.3.9h0a2,2,0,0,0,1.1-3,15.8,15.8,0,0,0-15-7.4,16,16,0,0,0-4.8,30.6A2,2,0,0,0,14.2,31.9Z">
                                            </path>
                                            <path d="M16.5,11.5v5h-5a2,2,0,0,0,0,4h9v-9a2,2,0,0,0-4,0Z"></path>
                                            <path
                                                d="M45.7,43l-15-26a2,2,0,0,0-3.4,0l-15,26A2,2,0,0,0,14,46H44A2,2,0,0,0,45.7,43ZM29,42a2,2,0,1,1,2-2A2,2,0,0,1,29,42Zm2-8a2,2,0,0,1-4,0V26a2,2,0,0,1,4,0Z">
                                            </path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>
                <p class="text-md font-semibold text-center m-auto">Your active session has now expired, please login to
                    <a href="https://decast.live" target="_blank" class="text-blue-500">Decast.live</a> to continue.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['errorMessage', 'showModal'],
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.modal {
    z-index: 99;
    position: absolute;
    background: #000;
    border: 1px solid #fff;
    /* box-shadow: 3px 3px 0px 0px #d2d2d2; */
    color: #fff;
    width: 100%;
    height: 385px;
    left: 0;
    top: 0;
}

.basic_child_modal_ {
    height: 300px;
    margin-top: 2rem;
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
</style>