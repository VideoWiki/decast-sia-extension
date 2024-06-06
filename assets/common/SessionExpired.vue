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
                    <svg fill="#ffffff" height="199px" width="199px" version="1.1" id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 60 60" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <path
                                    d="M9,39h6v8c0,0.552,0.448,1,1,1s1-0.448,1-1v-8h3c0.552,0,1-0.448,1-1s-0.448-1-1-1h-3v-2c0-0.552-0.448-1-1-1s-1,0.448-1,1 v2h-5V27c0-0.552-0.448-1-1-1s-1,0.448-1,1v11C8,38.552,8.448,39,9,39z">
                                </path>
                                <path
                                    d="M40,39h6v8c0,0.552,0.448,1,1,1s1-0.448,1-1v-8h3c0.552,0,1-0.448,1-1s-0.448-1-1-1h-3v-2c0-0.552-0.448-1-1-1 s-1,0.448-1,1v2h-5V27c0-0.552-0.448-1-1-1s-1,0.448-1,1v11C39,38.552,39.448,39,40,39z">
                                </path>
                                <path
                                    d="M29.5,48c3.584,0,6.5-2.916,6.5-6.5v-9c0-3.584-2.916-6.5-6.5-6.5S23,28.916,23,32.5v9C23,45.084,25.916,48,29.5,48z M25,32.5c0-2.481,2.019-4.5,4.5-4.5s4.5,2.019,4.5,4.5v9c0,2.481-2.019,4.5-4.5,4.5S25,43.981,25,41.5V32.5z">
                                </path>
                                <path d="M0,0v14v46h60V14V0H0z M2,2h56v10H2V2z M58,58H2V14h56V58z"></path>
                                <polygon
                                    points="54.293,3.293 52,5.586 49.707,3.293 48.293,4.707 50.586,7 48.293,9.293 49.707,10.707 52,8.414 54.293,10.707 55.707,9.293 53.414,7 55.707,4.707 ">
                                </polygon>
                                <path d="M3,11h39V3H3V11z M5,5h35v4H5V5z"></path>
                            </g>
                        </g>
                    </svg>
                </span>
                <p class="text-md font-semibold text-center m-auto">Your active session has now expired, please login to <a href="https://decast.live"
                        target="_blank" class="text-blue-500">Decast.live</a> to continue.</p>
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

.basic_child_modal_{
    height: 300px;
    margin-top: 2rem;
}

.close{
    border: 1px solid red;
    width: 24px;
    height: 24px;
    position: absolute;
    background-color: #000;
    z-index: 5;
    right: -5px;
    top: -10px;
    cursor: pointer;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>