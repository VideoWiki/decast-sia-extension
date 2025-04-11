<template>
    <div v-if="loading">
        <CommonLoader />
    </div>
    <div class="recordings flex flex-col justify-between items-center mb-2 w-full py-2 px-4 gap-2">
        <div class="flex flex-row justify-between items-center w-full">
            <p class="text-lg font-normal">
                {{ truncateText(recording.Name, 20) }}
            </p>
            <div class="flex gap-2 justify-end items-center">
                <span v-if="load" class="spinner cursor-pointer">
                    <vx-tooltip text="/Loading storage..." position="top">
                        <div class="loader"></div>
                    </vx-tooltip>
                </span>

                <span v-else-if="selectedStorage === 'swarm'" class="choose_plat cursor-pointer"
                    v-tooltip="'/Uploaded to Swarm'" position="top">
                    <img class="w-6 h-6 object-contain" src="@/images/swarm.png" />
                </span>

                <span v-else-if="selectedStorage === 'sia'" class="choose_plat cursor-pointer"
                    v-tooltip="'/Uploaded to Sia'" position="top">
                    <img class="w-8 h-8 object-contain" src="@/images/sia.png" />
                </span>

                <span v-else class="no_storage cursor-pointer" v-tooltip="'/No storage selected'" position="top">
                    <p>O</p>
                </span>
                <span class="down_btn cursor-pointer" @click="handleDownloadRecording" v-tooltip="'/Download'">
                    <DownloadButton />
                </span>

                <!-- <span v-if="recording.swarm_uploaded === false && recording.sia_uploaded === false" @click="handleSelect"
                    class="choose_plat cursor-pointer" v-tooltip="'/Select Network'">
                    <svg width="18px" height="18px" viewBox="0 -2 30 30" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="white">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <defs></defs>
                            <g id="Page-1" stroke="none" stroke-width="0" fill="none" fill-rule="evenodd"
                                sketch:type="MSPage">
                                <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                                    transform="translate(-571.000000, -676.000000)" fill="white">
                                    <path
                                        d="M599,692 C597.896,692 597,692.896 597,694 L597,698 L575,698 L575,694 C575,692.896 574.104,692 573,692 C571.896,692 571,692.896 571,694 L571,701 C571,701.479 571.521,702 572,702 L600,702 C600.604,702 601,701.542 601,701 L601,694 C601,692.896 600.104,692 599,692 L599,692 Z M582,684 L584,684 L584,693 C584,694.104 584.896,695 586,695 C587.104,695 588,694.104 588,693 L588,684 L590,684 C590.704,684 591.326,684.095 591.719,683.7 C592.11,683.307 592.11,682.668 591.719,682.274 L586.776,676.283 C586.566,676.073 586.289,675.983 586.016,675.998 C585.742,675.983 585.465,676.073 585.256,676.283 L580.313,682.274 C579.921,682.668 579.921,683.307 580.313,683.7 C580.705,684.095 581.608,684 582,684 L582,684 Z"
                                        id="upload" sketch:type="MSShapeGroup"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </span>

                <span v-else-if="recording.swarm_uploaded !== false || recording.sia_uploaded == false"
                    class="choose_plat cursor-pointer" v-tooltip="'/Uploaded to Swarm'">
                    <img class="w-4 h-4 object-contain" src="../../../../images/swarm.png" />
                </span>

                <span v-else-if="recording.swarm_uploaded == false || recording.sia_uploaded !== false"
                    class="choose_plat cursor-pointer" v-tooltip="'/Uploaded to Sia'">
                    <img class="w-6 h-6 object-contain" src="../../../../images/sia.png" />
                </span> -->


                <!-- <span class="open_btn cursor-pointer" @click="openRecording" v-tooltip="'/Play'">
                    <StartButton />
                </span> -->
            </div>
        </div>
        <div class="flex flex-row justify-between items-center w-full">
            <div class="flex flex-col gap-2">
                <p style="color: #a6a6a6; font-size: 14px">
                    >>Cast:
                    <span style="color: #d7df23">
                        {{ truncateText(recording.cast_name, 15) }}
                    </span>
                </p>

                <p style="color: #a6a6a6; font-size: 14px">
                    >>Size:
                    <span style="color: #d7df23">
                        {{ recording["Playback Data"]["Playback Size"] }}</span>
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <p class="flex justify-end items-end" style="color: #a6a6a6; font-size: 14px">
                    {{ recording["Start Time (Readable)"].split(" ")[0] }}
                </p>

                <p style="color: #a6a6a6; font-size: 14px">
                    >>Length:
                    <span style="color: #d7df23">{{ recording["Playback Data"]["Playback Length"] }} min</span>
                </p>
            </div>
        </div>
        <!-- <div v-if="isSelecting" class="select_card px-4">
            <div class="flex flex-col items-center justify-center gap-4 w-full">
                <p class="font-bold text-xl mt-2">//Select Network</p>
                <p style="color: gray; font-size: 16px">
                    >>Select the Network where you want to store your Decast recordings.
                </p>

                <div class="swarm_container flex justify-between px-4 py-4 items-center">
                    <div class="flex gap-4 items-center">
                        <span>
                            <img class="w-8 h-8 object-contain" src="../../../../images/swarm.png" />
                        </span>
                        <p class="text-lg font-semibold text-white">
                            Swarm - Decentralized Storage
                        </p>
                    </div>

                    <span @click="handleSwarmUpload" class="cursor-pointer" v-tooltip="'/Upload to Swarm'">
                        <StartButton />
                    </span>
                </div>

                <div class="sia_container flex justify-between px-4 py-4 items-center gap-4">
                    <div class="flex gap-4 items-center">
                        <span>
                            <img class="w-8 h-8 object-contain" src="../../../../images/sia.png" />
                        </span>
                        <p class="text-lg font-semibold text-white">
                            Sia - Decentralized Storage
                        </p>
                    </div>

                    <span @click="uploadToSia" class="cursor-pointer" v-tooltip="'/Upload to Sia'">
                        <StartButton />
                    </span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import CopyButton from "../../../../common/CopyButton.vue";
import StartButton from "../../../../common/StartButton.vue";
import DeleteButton from "../../../../common/DeleteButton.vue";
import axios from "axios";
import DownloadButton from "../../../../common/DownloadButton.vue";
import constants from "../../../constant";
import CommonLoader from "../../../../common/CommonLoader.vue";
import { saveAs } from 'file-saver';
import { vsNotify } from 'vuesax';


export default {
    name: "RecordingCard",
    props: ["recording", "index", "getRecordings", "siaMinutes", "siaFreeGiven", "swarmMinutes", "swarmFreeGiven"],
    data() {
        return {
            isSelecting: false,
            loading: false,
            taskId: '',
            selectedStorage: null,
            load: false,
        };
    },
    components: {
        CopyButton,
        StartButton,
        DeleteButton,
        DownloadButton,
        CommonLoader,
    },
    // created() {
    //     this.$store.dispatch('fetchUserMinutes');
    // },
    mounted() {
        this.fetchSelectedStorage();
    },
    computed: {
        accessToken() {
            return this.$store.state.accessToken;
        },
        // siaMinutes() {
        //     return this.$store.state.siaMinutes;
        // },
        // siaFreeGiven() {
        //     return this.$store.state.siaFreeGiven;
        // },
        // swarmMinutes() {
        //     return this.$store.state.swarmMinutes;
        // },
        // swarmFreeGiven() {
        //     return this.$store.state.swarmFreeGiven;
        // },
    },
    methods: {
        handleSelect() {
            this.isSelecting = !this.isSelecting;
        },
        openRecording() {
            const playbackURL =
                this.recording["Playback Data"]["Playback URL"].replace(
                    "/presentation/2.3",
                    "/video"
                ) + "/video-0.m4v";
            // window.open(playbackURL, '_blank');
            window.open(
                playbackURL,
                "_blank",
                "width=1366,height=768,scrollbars=yes,resizable=yes"
            );
        },
        copyRecording() {
            navigator.clipboard.writeText(
                this.recording["Playback Data"]["Playback URL"].replace(
                    "/presentation/2.3",
                    "/video"
                ) + "/video-0.m4v"
            );
        },

        editRecord() {
            setTimeout(() => {
                const meetingId = this.recording['Record ID'];
                const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
                // window.open(url, '_blank');
                window.open(url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
            }, 1000);
        },

        async fetchSelectedStorage() {
            const cast_id = this.recording.pub_id;
            const token = this.$store.state.accessToken;
            const url = `${constants.apiCastUrl}/api/event/select/storage/?cast_id=${cast_id}`;

            try {
                this.load = true;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                const { SIA, SWARM } = response.data;
                if (SIA && !SWARM) {
                    this.selectedStorage = "sia";
                } else if (!SIA && SWARM) {
                    this.selectedStorage = "swarm";
                } else {
                    this.selectedStorage = null;
                }
            } catch (error) {
                this.load = true;
                console.error("Error fetching selected storage:", error);
                this.selectedStorage = null;
            } finally {
                this.load = false;
            }
        },

        async getSelectedStorage() {
            const token = this.$store.state.accessToken;
            const cast_id = this.recording.pub_id;
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
                    await this.handleSiaDownload();
                } else if (response.data.SIA == false && response.data.SWARM == true) {
                    await this.handleSwarmDownload();
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                // console.error('Error:', error);
            }
        },
        async handleSiaStatus() {
            const token = this.$store.state.accessToken;
            const cast_id = this.recording.pub_id;
            const start_time = this.recording["Start Time (Readable)"];
            const l_time = this.recording["End Time (Readable)"];
            const url = `${constants.apiCastUrl}/api/decast/rec/sia/download/?start_time=${start_time}&l_time=${l_time}&pub_id=${cast_id}`;
            try {
                this.loading = true;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log('Storage retrived successfully:', response.data);
                this.taskId = response.data.task_id;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                // console.error('Error:', error);
            }
        },
        async handleSiaDownload() {
            await this.handleSiaStatus();
            const token = this.$store.state.accessToken;
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/result/?task_id=${this.taskId}`;

            this.loading = true;
            if (this.recording.is_deducted === false) {
                //console.log("size true");
                this.$vs.notify({
                    title: 'Try again later',
                    text: 'Your recording will be ready for download in a short while.',
                    color: 'danger',
                });
                this.$vs.loading.close();
                return;
            }
            try {
                let success = false;
                while (!success) {
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    if (response.data.status === 'SUCCESS') {
                        success = true;
                        const binaryData = response.data.result?.binary_data;
                        if (binaryData) {
                            const byteCharacters = atob(binaryData);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);

                            const blob = new Blob([byteArray], { type: 'video/webm' });
                            const contentDisposition = response.headers['content-disposition'];
                            const fileName = contentDisposition
                                ? contentDisposition.split('filename=')[1].split(';')[0].trim()
                                : 'downloaded_video.webm';
                            const blobUrl = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = blobUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(blobUrl);
                            this.$vs.notify({
                                title: 'Success!',
                                text: 'Download successful',
                                color: 'success',
                            });
                        } else {
                            this.$vs.notify({
                                title: 'Try again later!',
                                text: 'Your recording is not ready for download yet!',
                                color: 'danger',
                            });
                            // console.error('No binary data found in response.');
                        }
                    }
                    else if (response.data.status === 'PENDING') {
                        this.loading = false;
                        this.$vs.notify({
                            title: 'Download Not Ready',
                            text: 'Your download is not ready yet. Please try again later.',
                            color: 'warning',
                        });
                        return;
                    }
                    else {
                        // console.error('Failed to retrieve video data. Status:', response.data.status);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
            } catch (error) {
                this.loading = false;
                this.$vs.notify({
                    title: 'Error',
                    text: 'Unable to process your request!',
                    color: 'danger',
                });
                // console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },
        async handleSwarmStatus() {
            const token = this.$store.state.accessToken;
            const cast_id = this.recording.pub_id;
            const start_time = this.recording["Start Time (Readable)"];
            const l_time = this.recording["End Time (Readable)"];
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/download/?start_time=${start_time}&l_time=${l_time}&pub_id=${cast_id}`;
            try {
                this.loading = true;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log('Storage retrived successfully:', response.data);
                this.taskId = response.data.task_id;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                // console.error('Error:', error);
            }
        },
        async handleSwarmDownload() {
            // console.log('Running handleSwarmDownload', this.recording["Playback Data"]["Playback Size"], this.swarmMinutes);
            await this.handleSwarmStatus();
            const token = this.$store.state.accessToken;
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/result/?task_id=${this.taskId}`;
            this.loading = true;
            if (this.recording.is_deducted === false) {
                //console.log("size true");
                this.$vs.notify({
                    title: 'Try again later',
                    text: 'Your recording will be ready for download in a short while.',
                    color: 'danger',
                });
                this.$vs.loading.close();
                return;
            }
            try {
                let success = false;
                while (!success) {
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    if (response.data.status === 'SUCCESS') {
                        success = true;
                        const binaryData = response.data.result?.binary_data;
                        if (binaryData) {
                            const byteCharacters = atob(binaryData);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);

                            const blob = new Blob([byteArray], { type: 'video/webm' });
                            const contentDisposition = response.headers['content-disposition'];
                            const fileName = contentDisposition
                                ? contentDisposition.split('filename=')[1].split(';')[0].trim()
                                : 'downloaded_video.webm';
                            const blobUrl = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = blobUrl;
                            a.download = fileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(blobUrl);
                            this.$vs.notify({
                                title: 'Success!',
                                text: 'Download successful',
                                color: 'success',
                            });
                        } else {
                            this.$vs.notify({
                                title: 'Try again later!',
                                text: 'Your recording is not ready for download yet!',
                                color: 'danger',
                            });
                            // console.error('No binary data found in response.');
                        }
                    }
                    else if (response.data.status === 'PENDING') {
                        this.loading = false;
                        this.$vs.notify({
                            title: 'Download Not Ready',
                            text: 'Your download is not ready yet. Please try again later.',
                            color: 'warning',
                        });
                        return;
                    }
                    else {
                        // console.error('Failed to retrieve video data. Status:', response.data.status);
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
            } catch (error) {
                this.loading = false;
                this.$vs.notify({
                    title: 'Error',
                    text: 'Unable to process your request!',
                    color: 'danger',
                });
                // console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },


        handleDownloadRecording() {
            this.getSelectedStorage();
        },


        async handleDeleteRecording() {
            const options = {
                method: "DELETE",
                url: "https://api.cast.decast.live/api/delete/user/recording/",
                data: {
                    public_meeting_id: this.recording["pub_id"],
                    recording_id: this.recording["Record ID"],
                },
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            };
            try {
                await axios.request(options);
                await this.$store.dispatch(
                    "cast/deleteRecording",
                    this.recording["Record ID"]
                );
                await this.getRecordings();
            } catch (error) {
                console.error(error);
            }
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + "...";
            } else {
                return text;
            }
        },
    },
};
</script>

<style scoped>
* {
    font-family: "JetBrains Mono", monospace !important;
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
    border-top: 1px solid #d7df23;
    border: 1px solid #d7df23;
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
    min-height: 235px;
    height: auto;
    width: 435px;
    display: flex;
}

.sia_container,
.swarm_container {
    border: 1px solid #fff;
    width: 100%;
}

.swarm_container:hover {
    border: 1px solid #d7df23;
    width: 100%;
}

.sia_container:hover {
    border: 1px solid #d7df23;
    width: 100%;
}

.loader {
    border: 4px solid #f3f3f3;
    /* Light gray */
    border-top: 4px solid #d7df23;
    /* Highlight color */
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
