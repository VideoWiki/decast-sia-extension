<template>
    <div class="recordings flex flex-col justify-between items-center mb-4 w-full py-2 px-4 gap-2">
        <div class="flex flex-row justify-between items-center w-full">
            <p class="text-lg font-semibold">{{ truncateText(recording.Name, 20) }} </p>
            <div class="flex gap-2 justify-end items-center">
                <span class="copy_btn cursor-pointer" @click="copyRecording" v-tooltip="'/Copy'">
                    <svg width="18" height="18" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.2087 1.53345H8.40866V10.635L2.27533 10.7334V21.4668H13.0087V15.3334H22.2087V1.53345Z"
                            fill="black" />
                        <path d="M0.741943 21.4667H2.27528V10.7333H0.741943V21.4667Z" fill="white" />
                        <path d="M8.40861 1.53333H6.87528V9.2H2.27528V10.7333H6.87528V15.3333H8.40861V1.53333Z"
                            fill="white" />
                        <path d="M13.0086 21.4667H14.5419V16.8667H22.2086V15.3333H8.40861V16.8667H13.0086V21.4667Z"
                            fill="white" />
                        <path d="M2.27528 21.4667V23H13.0086V21.4667H2.27528Z" fill="white" />
                        <path d="M23.7419 1.53333H22.2086V15.3333H23.7419V1.53333Z" fill="white" />
                        <path d="M8.40861 0V1.53333H22.2086V0H8.40861Z" fill="white" />
                    </svg>

                </span>

                <span class="edit_btn cursor-pointer" @click="handleDeleteRecording" v-tooltip="'/Delete'">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8 8.4H9.6V9.6H10.8V8.4Z" fill="white" />
                        <path d="M12 15.6H10.8V16.8H12V15.6Z" fill="white" />
                        <path d="M2.4 15.6H1.2L1.2 16.8H2.4V15.6Z" fill="white" />
                        <path d="M12 15.6H13.2V4.8H12V15.6Z" fill="white" />
                        <path d="M13.2 2.4V1.2L8.4 1.2V0L4.8 1.04907e-07V1.2H5.24538e-08L1.57361e-07 2.4H13.2Z"
                            fill="white" />
                        <path d="M12 4.8V3.6H1.2L1.2 4.8H12Z" fill="white" />
                        <path d="M5.24538e-08 15.6H1.2L1.2 4.8H5.24538e-08V15.6Z" fill="white" />
                        <path d="M10.8 18V16.8H2.4L2.4 18H10.8Z" fill="white" />
                        <path d="M12.0002 4.80005H1.2002V15.6H2.4002V16.8H10.8002V15.6H12.0002V4.80005Z" fill="black" />
                    </svg>
                </span>

                <span @click="handleSelect" class="choose_plat cursor-pointer" v-tooltip="'/Select Network'">
                    <svg width="18px" height="18px" viewBox="0 -2 30 30" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="white">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <defs> </defs>
                            <g id="Page-1" stroke="none" stroke-width="0" fill="none" fill-rule="evenodd"
                                sketch:type="MSPage">
                                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                                    transform="translate(-571.000000, -676.000000)" fill="white">
                                    <path
                                        d="M599,692 C597.896,692 597,692.896 597,694 L597,698 L575,698 L575,694 C575,692.896 574.104,692 573,692 C571.896,692 571,692.896 571,694 L571,701 C571,701.479 571.521,702 572,702 L600,702 C600.604,702 601,701.542 601,701 L601,694 C601,692.896 600.104,692 599,692 L599,692 Z M582,684 L584,684 L584,693 C584,694.104 584.896,695 586,695 C587.104,695 588,694.104 588,693 L588,684 L590,684 C590.704,684 591.326,684.095 591.719,683.7 C592.11,683.307 592.11,682.668 591.719,682.274 L586.776,676.283 C586.566,676.073 586.289,675.983 586.016,675.998 C585.742,675.983 585.465,676.073 585.256,676.283 L580.313,682.274 C579.921,682.668 579.921,683.307 580.313,683.7 C580.705,684.095 581.608,684 582,684 L582,684 Z"
                                        id="upload" sketch:type="MSShapeGroup"> </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>

                <span class="open_btn cursor-pointer" @click="openRecording" v-tooltip="'/Play'">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1.49999H0V16.5H1.5V1.49999Z" fill="black" />
                        <path d="M1.50004 0L1.5 1.49999L4.50002 1.5V0H1.50004Z" fill="black" />
                        <path d="M4.50002 1.5L4.5 3.00001L7.50002 2.99999L7.50004 1.50001L4.50002 1.5Z" fill="black" />
                        <path d="M7.50002 2.99999V4.49999L10.5 4.5L10.5 2.99999H7.50002Z" fill="black" />
                        <path d="M10.5 4.5V6L13.5 6.00001L13.5 4.5H10.5Z" fill="black" />
                        <path d="M13.5 6.00001V7.50001L16.5 7.49999L16.5 6.00001H13.5Z" fill="black" />
                        <path d="M16.5 10.5H18V7.49999H16.5V10.5Z" fill="black" />
                        <path d="M13.5 10.5V12H16.5L16.5 10.5L13.5 10.5Z" fill="black" />
                        <path d="M10.5 12V13.5H13.5L13.5 12L10.5 12Z" fill="black" />
                        <path d="M7.50002 13.5V15H10.5L10.5 13.5L7.50002 13.5Z" fill="black" />
                        <path d="M4.5 15L4.50002 16.5L7.50004 16.5L7.50002 15L4.5 15Z" fill="black" />
                        <path d="M1.5 16.5L1.50004 18H4.50002V16.5L1.5 16.5Z" fill="black" />
                        <path
                            d="M4.5 1.49976H1.5V16.4998H4.5V14.9998H7.5V13.4998H10.5V11.9998H13.5V10.4998H16.5V7.49976H13.5V5.99976H10.5V4.49976H7.5V2.99976H4.5V1.49976Z"
                            fill="#D7DF23" />
                    </svg>
                </span>
            </div>
        </div>
        <div class="flex flex-row justify-between items-center w-full">
            <div class="flex flex-col gap-2">
                <p style="color: #a6a6a6; font-size: 16px;">>>Cast: <span style="color:#D7DF23;">
                        {{ truncateText(recording.cast_name, 20) }}
                    </span></p>

                <p style="color: #a6a6a6; font-size: 16px;">>>Size: <span style="color:#D7DF23;">
                        {{ recording['Playback Data']['Playback Size'] }}</span></p>
            </div>
            <div class="flex flex-col gap-2">
                <p class="flex justify-end items-end" style="color: #a6a6a6; font-size: 16px;">
                    {{ recording['Start Time (Readable)'].split(' ')[0] }}
                </p>

                <p style="color: #a6a6a6; font-size: 16px;">>>Length: <span style="color:#D7DF23;">{{
                    recording['Playback Data']['Playback Length'] }} min</span></p>
            </div>
        </div>
        <div v-if="isSelecting" class="select_card px-4">
            <div class="flex flex-col items-center justify-center gap-4 w-full">
                <!-- <p class="font-bold text-xl mt-2">//Select Network</p> -->
                <p style="color: gray; font-size: 16px">
                    >>Select the Network where you want to store your Decast recordings.
                </p>

                <div class="swarm_container flex justify-between px-4 py-4 items-center">
                    <div class="flex gap-4 items-center">
                        <span>
                            <img class="w-8 h-8 object-contain" src="../../../../images/swarm.png" />
                        </span>
                        <p class="text-lg font-semibold text-white">Swarm - Decentralized Storage</p>
                    </div>

                    <span @click="handleSwarmUpload" class="cursor-pointer" v-tooltip="'/Upload to Swarm'"><svg
                            width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.49999H0V16.5H1.5V1.49999Z" fill="black" />
                            <path d="M1.50004 0L1.5 1.49999L4.50002 1.5V0H1.50004Z" fill="black" />
                            <path d="M4.50002 1.5L4.5 3.00001L7.50002 2.99999L7.50004 1.50001L4.50002 1.5Z"
                                fill="black" />
                            <path d="M7.50002 2.99999V4.49999L10.5 4.5L10.5 2.99999H7.50002Z" fill="black" />
                            <path d="M10.5 4.5V6L13.5 6.00001L13.5 4.5H10.5Z" fill="black" />
                            <path d="M13.5 6.00001V7.50001L16.5 7.49999L16.5 6.00001H13.5Z" fill="black" />
                            <path d="M16.5 10.5H18V7.49999H16.5V10.5Z" fill="black" />
                            <path d="M13.5 10.5V12H16.5L16.5 10.5L13.5 10.5Z" fill="black" />
                            <path d="M10.5 12V13.5H13.5L13.5 12L10.5 12Z" fill="black" />
                            <path d="M7.50002 13.5V15H10.5L10.5 13.5L7.50002 13.5Z" fill="black" />
                            <path d="M4.5 15L4.50002 16.5L7.50004 16.5L7.50002 15L4.5 15Z" fill="black" />
                            <path d="M1.5 16.5L1.50004 18H4.50002V16.5L1.5 16.5Z" fill="black" />
                            <path
                                d="M4.5 1.49976H1.5V16.4998H4.5V14.9998H7.5V13.4998H10.5V11.9998H13.5V10.4998H16.5V7.49976H13.5V5.99976H10.5V4.49976H7.5V2.99976H4.5V1.49976Z"
                                fill="#D7DF23" />
                        </svg></span>
                </div>

                <div class="sia_container flex justify-between px-4 py-4 items-center gap-4">
                    <div class="flex gap-4 items-center">
                        <span>
                            <img class="w-8 h-8 object-contain" src="../../../../images/sia.png" />
                        </span>
                        <p class="text-lg font-semibold text-white">Sia - Decentralized Storage</p>
                    </div>

                    <span @click="uploadToSia" class="cursor-pointer" v-tooltip="'/Upload to Sia'">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 1.49999H0V16.5H1.5V1.49999Z" fill="black" />
                            <path d="M1.50004 0L1.5 1.49999L4.50002 1.5V0H1.50004Z" fill="black" />
                            <path d="M4.50002 1.5L4.5 3.00001L7.50002 2.99999L7.50004 1.50001L4.50002 1.5Z"
                                fill="black" />
                            <path d="M7.50002 2.99999V4.49999L10.5 4.5L10.5 2.99999H7.50002Z" fill="black" />
                            <path d="M10.5 4.5V6L13.5 6.00001L13.5 4.5H10.5Z" fill="black" />
                            <path d="M13.5 6.00001V7.50001L16.5 7.49999L16.5 6.00001H13.5Z" fill="black" />
                            <path d="M16.5 10.5H18V7.49999H16.5V10.5Z" fill="black" />
                            <path d="M13.5 10.5V12H16.5L16.5 10.5L13.5 10.5Z" fill="black" />
                            <path d="M10.5 12V13.5H13.5L13.5 12L10.5 12Z" fill="black" />
                            <path d="M7.50002 13.5V15H10.5L10.5 13.5L7.50002 13.5Z" fill="black" />
                            <path d="M4.5 15L4.50002 16.5L7.50004 16.5L7.50002 15L4.5 15Z" fill="black" />
                            <path d="M1.5 16.5L1.50004 18H4.50002V16.5L1.5 16.5Z" fill="black" />
                            <path
                                d="M4.5 1.49976H1.5V16.4998H4.5V14.9998H7.5V13.4998H10.5V11.9998H13.5V10.4998H16.5V7.49976H13.5V5.99976H10.5V4.49976H7.5V2.99976H4.5V1.49976Z"
                                fill="#D7DF23" />
                        </svg>
                    </span>

                </div>


            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    name: 'RecordingCard',
    props: ['recording', 'index', 'getRecordings'],
    data() {
        return {
            isSelecting: false,
        }
    },
    computed: {
        accessToken() {
            return this.$store.state.accessToken;
        },
    },
    methods: {
        handleSelect() {
            this.isSelecting = !this.isSelecting;
        },
        openRecording() {
            const playbackURL =
                this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v';
            // window.open(playbackURL, '_blank');
            window.open(playbackURL, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
        },
        copyRecording() {
            navigator.clipboard.writeText(
                this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v'
            );
        },
        async handleSwarmUpload() {
            const videoURL = this.recording['Playback Data']['Playback URL'].replace(
                '/presentation/2.3',
                '/video'
            ) + '/video-0.m4v';

            const options = {
                method: 'POST',
                url: 'http://api.storage.video.wiki/api/swarm-upload/',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    video_url: videoURL
                }
            };

            try {
                const response = await axios.request(options);
                console.log('Swarm upload response:', response);
                // Handle successful upload response
            } catch (error) {
                console.error('Error uploading to Swarm:', error);
                // Handle error
            }
        },
        async uploadToSia() {
            try {
                const videoURL = this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v';
                const data = {
                    file_url: videoURL,
                };

                console.log(data);
                const response = await axios.post(
                    'https://api.storage.video.wiki/api/sia/upload/',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('Upload successful', response, response.data);
            } catch (error) {
                console.error('Error uploading to Sia via proxy', error);
            }
        },

        async handleDeleteRecording() {
            const options = {
                method: 'DELETE',
                url: 'https://api.cast.decast.live/api/delete/user/recording/',
                data: {
                    public_meeting_id: this.recording['pub_id'],
                    recording_id: this.recording['Record ID'],
                },
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                }
            };
            try {
                await axios.request(options);
                await this.$store.dispatch('cast/deleteRecording', this.recording['Record ID']);
                await this.getRecordings();
            } catch (error) {
                console.error(error);
            }
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.custm-more-icon {
    background-color: transparent !important;
    border: none !important;
}

.recordings {
    border-top: 1px solid white;
    border: 1px solid white;
}

.recordings:hover {
    border-top: 1px solid #D7DF23;
    border: 1px solid #D7DF23;
}

.custm-style {
    background: none !important;
    outline: none !important;
    border: none !important;
    background-color: transparent !important;
}

.custm-style:hover {
    box-shadow: none !important;
}

.select_card {
    /* border: 1px solid #fff; */
    min-height: 220px;
    height: auto;
    width: 435px;
    display: flex;
}

.recordings:hover .select_card {
    /* border: 1px solid #D7DF23; */
}

.sia_container,
.swarm_container {
    border: 1px solid #fff;
    width: 100%;
}


.swarm_container:hover {
    border: 1px solid #D7DF23;
    width: 100%;
}

.sia_container:hover {
    border: 1px solid #D7DF23;
    width: 100%;
}
</style>