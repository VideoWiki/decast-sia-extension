<template>
    <div class="recordings flex flex-col justify-between items-center mb-4 w-full py-2 px-4 gap-2">
        <div class="flex flex-row justify-between items-center w-full">
            <p class="text-lg font-semibold">{{ truncateText(recording.Name, 20) }} </p>
            <div class="flex gap-2 justify-end items-center">
                <span class="copy_btn cursor-pointer" @click="copyRecording" v-tooltip="'/Copy'">
                    copy

                </span>

                <span class="edit_btn cursor-pointer" @click="handleDeleteRecording" v-tooltip="'/Delete'">
                    delete
                </span>

                <span @click="handleSelect" class="choose_plat cursor-pointer" v-tooltip="'/Select Network'">
                    select
                </span>

                <span class="open_btn cursor-pointer" @click="openRecording" v-tooltip="'/Play'">
                    play
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
                    >>Select the Network you want to store your Decast recordings.
                </p>

                <div class="swarm_container flex justify-between px-4 py-4 items-center">
                    <div class="flex gap-4 items-center">
                        <span>
                            <img class="w-8 h-8 object-contain" src="../../../../images/swarm.png" />
                        </span>
                        <p class="text-lg font-semibold text-white">Swarm - Decentralized Storage</p>
                    </div>


                </div>

                <div class="sia_container flex justify-between px-4 py-4 items-center gap-4">
                    <div class="flex gap-4 items-center">
                        <span>
                            <img class="w-8 h-8 object-contain" src="../../../../images/sia.png" />
                        </span>
                        <p class="text-lg font-semibold text-white">Sia - Decentralized Storage</p>
                    </div>


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
                // console.error(error);
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
