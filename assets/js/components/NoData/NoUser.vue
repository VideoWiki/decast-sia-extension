<template>
    <div class="basic_parent_div_">
        <div v-if="currentStep === 0" class="basic_child_msg_ flex flex-col gap-8 items-center justify-end p-4">
            <span>
                <svg fill="#ffffff" height="200px" width="200px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 511.999 511.999" xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <g>
                                    <path
                                        d="M466.467,86.576h-13.699c0-77.128-107.328-77.208-107.328,0h-178.88c0-77.128-107.328-77.208-107.328,0h-13.7 C20.426,86.576,0,107.002,0,132.109v185.046c0,25.107,20.426,45.533,45.533,45.533h13.699v101.096 c0,10.777,8.737,19.514,19.514,19.514h68.299c10.777,0,19.514-8.737,19.514-19.514V362.688h178.88v101.096 c0,10.777,8.737,19.514,19.514,19.514h68.299c10.777,0,19.514-8.737,19.514-19.514V362.688h13.699 c25.107,0,45.533-20.426,45.533-45.533V132.109C512,107.002,491.573,86.576,466.467,86.576z M413.739,86.576h-29.271 C384.467,61.259,413.739,60.914,413.739,86.576z M127.531,86.576H98.26C98.26,61.259,127.531,60.914,127.531,86.576z M127.531,444.27H98.26v-81.582h29.271V444.27z M413.739,444.27h-29.271v-81.582h29.271V444.27z M472.972,317.155 c0,3.587-2.918,6.505-6.505,6.505c-4.763,0-416.33,0-420.934,0c-3.587,0-6.505-2.918-6.505-6.505V132.109 c0-3.587,2.918-6.505,6.505-6.505c8.673,0,415.831,0,420.934,0c3.587,0,6.505,2.918,6.505,6.505V317.155z">
                                    </path>
                                    <path
                                        d="M120.652,192.517l-12.528,42.282l-6.511-27.858c-0.997-4.49-11.365-4.493-12.363,0l-6.511,27.858l-12.528-42.282 c-1.445-5.052-13.979-1.291-12.281,3.791l16.402,50.276c1.838,5.854,15.54,5.569,16.813,0l4.287-19.534l4.285,19.534 c1.255,5.491,14.779,5.935,16.815,0l16.401-50.276C134.612,191.207,122.091,187.477,120.652,192.517z">
                                    </path>
                                    <path
                                        d="M179.343,201.335c5.093,0,5.258-11.209,0-11.209h-29.341c-2.804,0-5.606,1.319-5.606,3.956v52.337 c0,2.637,2.804,3.956,5.606,3.956h29.341c5.255,0,5.096-11.209,0-11.209h-22.089v-14.011h12.363c5.24,0,5.083-9.891,0-9.891 h-12.363v-13.929H179.343z">
                                    </path>
                                    <path
                                        d="M227.064,239.166h-18.791V194c0-2.72-3.213-3.874-6.429-3.874c-3.213,0-6.428,1.154-6.428,3.874v52.419 c0,2.637,2.804,3.956,5.606,3.956h26.042C232.01,250.375,232.01,239.166,227.064,239.166z">
                                    </path>
                                    <path
                                        d="M261.275,201.336c7.006,0,7.251,5.274,7.336,7.417c0.164,2.967,2.967,3.874,6.429,3.874c4.367,0,6.428-1.154,6.428-6.099 c0-20.607-40.468-24.734-40.468,3.049v21.842c0,27.724,40.468,24.001,40.468,2.226c0-4.945-2.061-6.099-6.511-6.099 c-3.297,0-6.1,0.825-6.347,3.874c-0.246,3.215-0.66,8.241-7.253,8.241c-4.78,0-7.5-2.637-7.5-8.241v-21.841 C253.857,203.973,256.577,201.336,261.275,201.336z">
                                    </path>
                                    <path
                                        d="M314.111,190.126c-11.375,0-20.195,5.275-20.195,19.452v21.842c0,14.176,8.819,19.45,20.195,19.452 c11.373,0,20.275-5.275,20.275-19.452v-21.842C334.386,195.401,325.484,190.126,314.111,190.126z M321.526,231.419 c0,5.686-2.801,8.241-7.417,8.241c-4.616,0-7.336-2.555-7.336-8.241v-21.842c0-5.688,2.72-8.243,7.336-8.243 c4.616,0,7.417,2.555,7.417,8.243V231.419z">
                                    </path>
                                    <path
                                        d="M392.577,190.127c-4.617,0-6.593,0.493-9.973,6.428l-8.489,14.836l-8.49-14.836c-3.379-5.934-5.357-6.428-9.972-6.428 c-3.215,0-6.429,1.73-6.429,6.428v49.865c0,5.275,12.859,5.275,12.859,0v-31.733l7.829,14.342c1.73,3.32,6.483,3.116,8.323,0 l7.911-13.517v30.908c0,5.275,12.859,5.275,12.859,0v-49.865C399.005,191.858,395.873,190.127,392.577,190.127z">
                                    </path>
                                    <path
                                        d="M449.452,201.335c5.094,0,5.256-11.209,0-11.209h-29.341c-2.804,0-5.606,1.319-5.606,3.956v52.337 c0,2.637,2.804,3.956,5.606,3.956h29.341c5.255,0,5.096-11.209,0-11.209h-22.089v-14.011h12.363c5.24,0,5.083-9.891,0-9.891 h-12.363v-13.929H449.452z">
                                    </path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </span>
            <p class="child_msg_">
                Welcome to <span style="color:#D7DF23;">Decast</span>, a powerful tool for hosting Casts, your personal and favorite calls in private rooms,
                and much more. To get started quickly, create or log in to your account on <a href="https://decast.live"
                    target="_blank" class="text-blue-500">Decast.live</a>, then return to activate this extension. For
                assistance, click on 'Next' for easy-to-follow instructions.
            </p>
        </div>

        <div v-if="currentStep === 1" class="basic_child_msg_">
            <slide1 />
        </div>

        <div v-if="currentStep === 2" class="basic_child_msg_">
            <slide2 />
        </div>

        <div v-if="currentStep === 3" class="basic_child_msg_">
            <slide3 />
        </div>

        <div class="flex w-full justify-end items-center mt-4 gap-4">
            <button class="prev_btn_ px-2 text-lg" @click="prevInstructions" :hidden="currentStep === 0">Back<<
                    </button>
                    <button class="nxt_btn_ px-2 text-lg" @click="nextInstructions"
                        :hidden="currentStep === 3">>>Next</button>
        </div>
    </div>
</template>

<script>
import slide1 from './components/Slide1.vue';
import slide2 from './components/Slide2.vue';
import slide3 from './components/Slide3.vue';
export default {
    name: 'NoUser',
    data() {
        return {
            currentStep: 0,
        }
    },
    components: {
        slide1,
        slide2,
        slide3
    },
    methods: {
        nextInstructions() {
            if (this.currentStep < 3) {
                this.currentStep++;
            };
        },

        prevInstructions() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        }
    }

}

</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.basic_child_msg_ {
    border: 1px solid white;
    height: 420px;
    overflow-y: scroll;
}

.basic_child_msg_::-webkit-scrollbar {
    scroll-behavior: smooth;
    display: none;
}

.child_msg_ {
    font-size: 14px;
    text-align: justify;
}

.prev_btn_ {
    height: 30px;
    min-width: 100px;
    width: auto;
    color: #000;
    background-color: #dadada;
    border-top: 1px solid white;
    border-left: 1px solid white;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    /* box-shadow: 3px 3px 0px 0px #fff; */
}

.nxt_btn_ {
    height: 30px;
    min-width: 100px;
    width: auto;
    color: #000;
    background-color: #22c55e;
    border-top: 1px solid white;
    border-left: 1px solid white;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    /* box-shadow: 3px 3px 0px 0px #fff; */
}

.nxt_btn_:disabled {
    opacity: 0.5;
}
</style>