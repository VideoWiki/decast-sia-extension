<template>
    <div v-if="loading">
        <CommonLoader />
    </div>
    <div class="recordings flex flex-col justify-between items-center mb-4 w-full py-2 px-4 gap-2">
        <div class="flex flex-row justify-between items-center w-full">
            <p class="text-lg font-semibold">
                {{ truncateText(recording.Name, 20) }}
            </p>
            <div class="flex gap-2 justify-end items-center">
                <span class="edit_btn cursor-pointer" @click="editRecord" v-tooltip="'/Edit'">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.42205 2.59665C2.42205 2.42805 2.48902 2.26636 2.60824 2.14715C2.72745 2.02793 2.88914 1.96096 3.05774 1.96096H4.01127V1.00742C4.01127 0.838824 4.07825 0.677134 4.19746 0.557918C4.31668 0.438703 4.47837 0.371729 4.64696 0.371729C4.81556 0.371729 4.97725 0.438703 5.09646 0.557918C5.21568 0.677134 5.28265 0.838824 5.28265 1.00742V1.96096H6.23619C6.40479 1.96096 6.56648 2.02793 6.68569 2.14714C6.80491 2.26636 6.87188 2.42805 6.87188 2.59665C6.87188 2.76524 6.80491 2.92693 6.68569 3.04615C6.56648 3.16536 6.40479 3.23234 6.23619 3.23234H5.28265V4.18587C5.28265 4.35447 5.21568 4.51616 5.09646 4.63537C4.97725 4.75459 4.81556 4.82156 4.64696 4.82156C4.47837 4.82156 4.31668 4.75459 4.19746 4.63537C4.07825 4.51616 4.01127 4.35447 4.01127 4.18587V3.23234H3.05774C2.88914 3.23233 2.72745 3.16536 2.60824 3.04614C2.48902 2.92693 2.42205 2.76524 2.42205 2.59665ZM17.0429 9.2714H15.7715V8.00002C15.7715 7.83142 15.7046 7.66973 15.5854 7.55051C15.4661 7.4313 15.3045 7.36433 15.1359 7.36433C14.9673 7.36433 14.8056 7.4313 14.6864 7.55051C14.5671 7.66973 14.5002 7.83142 14.5002 8.00002V9.2714H13.2288C13.0602 9.2714 12.8985 9.33837 12.7793 9.45759C12.6601 9.5768 12.5931 9.73849 12.5931 9.90709C12.5931 10.0757 12.6601 10.2374 12.7793 10.3566C12.8985 10.4758 13.0602 10.5428 13.2288 10.5428H14.5002V11.8142C14.5002 11.9828 14.5671 12.1444 14.6864 12.2637C14.8056 12.3829 14.9673 12.4498 15.1359 12.4498C15.3045 12.4498 15.4661 12.3829 15.5854 12.2637C15.7046 12.1444 15.7715 11.9828 15.7715 11.8142V10.5428H17.0429C17.2115 10.5428 17.3732 10.4758 17.4924 10.3566C17.6116 10.2374 17.6786 10.0757 17.6786 9.90709C17.6786 9.73849 17.6116 9.5768 17.4924 9.45759C17.3732 9.33837 17.2115 9.2714 17.0429 9.2714ZM12.4067 7.1784L3.9568 15.6283C3.71814 15.8663 3.39485 16 3.05779 16C2.72074 16 2.39743 15.8664 2.15875 15.6284L0.514975 13.9845C0.396904 13.8665 0.303247 13.7263 0.239351 13.572C0.175454 13.4178 0.142571 13.2525 0.142578 13.0855C0.142586 12.9185 0.175484 12.7532 0.239394 12.5989C0.303304 12.4447 0.396973 12.3045 0.515054 12.1865L12.3297 0.371729C12.5684 0.133696 12.8917 1.48971e-05 13.2287 1.245e-09C13.5658 -1.48946e-05 13.8891 0.133638 14.1278 0.37165L15.7715 2.01551C15.8896 2.13357 15.9833 2.27373 16.0472 2.42798C16.1111 2.58224 16.1439 2.74758 16.1439 2.91455C16.1439 3.08151 16.111 3.24685 16.0471 3.4011C15.9832 3.55535 15.8895 3.6955 15.7715 3.81355L12.4072 7.17785L12.4069 7.17813L12.4067 7.1784ZM11.9574 5.82961L14.8725 2.91449L14.8726 2.91441L14.8731 2.91383L13.2288 1.27071L10.3137 4.18587L11.9574 5.82961ZM12.5931 13.0855H11.9574V12.4498C11.9574 12.2813 11.8904 12.1196 11.7712 12.0003C11.652 11.8811 11.4903 11.8142 11.3217 11.8142C11.1531 11.8142 10.9914 11.8811 10.8722 12.0003C10.753 12.1196 10.686 12.2813 10.686 12.4498V13.0855H10.0503C9.88174 13.0855 9.72005 13.1525 9.60083 13.2717C9.48162 13.3909 9.41464 13.5526 9.41464 13.7212C9.41464 13.8898 9.48162 14.0515 9.60083 14.1707C9.72005 14.2899 9.88174 14.3569 10.0503 14.3569H10.686V14.9926C10.686 15.1612 10.753 15.3229 10.8722 15.4421C10.9914 15.5613 11.1531 15.6283 11.3217 15.6283C11.4903 15.6283 11.652 15.5613 11.7712 15.4421C11.8904 15.3229 11.9574 15.1612 11.9574 14.9926V14.3569H12.5931C12.7617 14.3569 12.9234 14.2899 13.0426 14.1707C13.1618 14.0515 13.2288 13.8898 13.2288 13.7212C13.2288 13.5526 13.1618 13.3909 13.0426 13.2717C12.9234 13.1525 12.7617 13.0855 12.5931 13.0855Z"
                            fill="#A1A1A1" />
                    </svg>

                </span>

                <span class="copy_btn cursor-pointer" @click="copyRecording" v-tooltip="'/Copy'">
                    <CopyButton />
                </span>

                <!-- <span v-if="recording.swarm_uploaded === false && recording.sia_uploaded === false"
                    class="edit_btn cursor-pointer" @click="handleDeleteRecording" v-tooltip="'/Delete'">
                    <DeleteButton />
                </span> -->

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
                <p style="color: #a6a6a6; font-size: 16px">
                    >>Cast:
                    <span style="color: #d7df23">
                        {{ truncateText(recording.cast_name, 20) }}
                    </span>
                </p>

                <p style="color: #a6a6a6; font-size: 16px">
                    >>Size:
                    <span style="color: #d7df23">
                        {{ recording["Playback Data"]["Playback Size"] }}</span>
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <p class="flex justify-end items-end" style="color: #a6a6a6; font-size: 16px">
                    {{ recording["Start Time (Readable)"].split(" ")[0] }}
                </p>

                <p style="color: #a6a6a6; font-size: 16px">
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
    props: ["recording", "index", "getRecordings"],
    data() {
        return {
            isSelecting: false,
            loading: false,
            taskId: '',
        };
    },
    components: {
        CopyButton,
        StartButton,
        DeleteButton,
        DownloadButton,
        CommonLoader,
    },
    created() {
        this.$store.dispatch('fetchUserMinutes');
    },
    computed: {
        accessToken() {
            return this.$store.state.accessToken;
        },
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
        // async handleSwarmUpload() {
        //     const videoURL = this.recording['Playback Data']['Playback URL'].replace(
        //         '/presentation/2.3',
        //         '/video'
        //     ) + '/video-0.m4v';

        //     const options = {
        //         method: 'POST',
        //         url: 'http://api.storage.video.wiki/api/swarm-upload/',
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         data: {
        //             video_url: videoURL
        //         }
        //     };

        //     try {
        //         const response = await axios.request(options);
        //         console.log('Swarm upload response:', response);
        //         // Handle successful upload response
        //         axios.post('https://api.cast.decast.live/api/event/update/decast/recordings/')
        //     } catch (error) {
        //         console.error('Error uploading to Swarm:', error);
        //         // Handle error
        //     }
        // },
        editRecord() {
            setTimeout(() => {
                const meetingId = this.recording['Record ID'];
                const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
                // window.open(url, '_blank');
                window.open(url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
            }, 1000);
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
                console.log('Storage retrived successfully:', response.data);

                if (response.data.SIA == true && response.data.SWARM == false) {
                    await this.handleSiaDownload();
                } else if (response.data.SIA == false && response.data.SWARM == true) {
                    await this.handleSwarmDownload();
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.error('Error:', error);
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
                console.log('Storage retrived successfully:', response.data);
                this.taskId = response.data.task_id;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.error('Error:', error);
            }
        },
        async handleSiaDownload() {
            await this.handleSiaStatus();
            const token = this.$store.state.accessToken;
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/result/?task_id=${this.taskId}`;

            this.loading = true;
            if (this.recording["Playback Data"]["Playback Size"] > this.siaMinutes) {
                console.log("size true")
                this.$vs.notify({
                    title: 'Insufficient Balance',
                    text: 'Please add sufficient minutes to your wallet to download this recording.',
                    color: 'danger',
                });
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
                            console.error('No binary data found in response.');
                        }
                    } else if (response.data.status === 'PENDING') {
                        this.loading = false;
                        this.$vs.notify({
                            title: 'Download Not Ready',
                            text: 'Your download is not ready yet. Please try again later.',
                            color: 'warning',
                        });
                        return;
                    } else {
                        console.error('Failed to retrieve video data. Status:', response.data.status);
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
                console.error('Error:', error);
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
                console.log('Storage retrived successfully:', response.data);
                this.taskId = response.data.task_id;
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.error('Error:', error);
            }
        },
        async handleSwarmDownload() {
            console.log('Running handleSwarmDownload', this.recording["Playback Data"]["Playback Size"], this.swarmMinutes);
            await this.handleSwarmStatus();
            const token = this.$store.state.accessToken;
            const url = `${constants.apiCastUrl}/api/decast/rec/swarm/result/?task_id=${this.taskId}`;
            this.loading = true;
            if (parseFloat(this.recording["Playback Data"]["Playback Size"]) > parseFloat(this.swarmMinutes)) {
                console.log("size true");
                this.$vs.notify({
                    title: 'Insufficient Balance',
                    text: 'Please add sufficient minutes to your wallet to download this recording.',
                    color: 'danger',
                });
                this.loading = false;
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
                            console.error('No binary data found in response.');
                        }
                    } else if (response.data.status === 'PENDING') {
                        this.loading = false;
                        this.$vs.notify({
                            title: 'Download Not Ready',
                            text: 'Your download is not ready yet. Please try again later.',
                            color: 'warning',
                        });
                        return;
                    } else {
                        console.error('Failed to retrieve video data. Status:', response.data.status);
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
                console.error('Error:', error);
            } finally {
                this.loading = false;
            }
        },


        // async handleSiaDownload() {
        //     await this.handleSiaStatus();
        //     const token = this.$store.state.accessToken;
        //     const url = `${constants.apiCastUrl}/api/decast/rec/sia/result/?task_id=${this.taskId}`;
        //     try {
        //         this.loading = true;
        //         const response = await axios.get(url, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //             responseType: 'blob',
        //         });
        //         console.log('Storage retrived successfully:', response.data);
        //         const blob = new Blob([response.data], { type: response.data.type });
        //         const contentDisposition = response.headers['content-disposition'];
        //         const fileName = contentDisposition
        //             ? contentDisposition.split('filename=')[1].split(';')[0].trim()
        //             : 'downloaded_file';

        //         saveAs(blob, fileName);
        //         this.loading = false;
        //     } catch (error) {
        //         this.loading = false;
        //         console.error('Error:', error);
        //     }
        // },


        handleDownloadRecording() {
            this.getSelectedStorage();
        },

        // async handleSwarmUpload() {
        //     const videoURL =
        //         this.recording["Playback Data"]["Playback URL"].replace(
        //             "/presentation/2.3",
        //             "/video"
        //         ) + "/video-0.m4v";

        //     try {
        //         const uploadResponse = await axios.post(
        //             "http://api.storage.video.wiki/api/swarm-upload/",
        //             {
        //                 video_url: videoURL,
        //             },
        //             {
        //                 headers: { "Content-Type": "multipart/form-data" },
        //             }
        //         );

        //         if (uploadResponse.status < 200 || uploadResponse.status >= 300) {
        //             throw new Error("Swarm upload failed");
        //         }
        //         this.isSelecting = false;
        //         const statusUrl = `http://api.storage.video.wiki/api/swarm-status/${this.recording["Record ID"]}/`;

        //         for (let i = 0; i < 20; i++) {
        //             const statusResponse = await axios.get(statusUrl);
        //             if (statusResponse.data.status !== "PENDING") {
        //                 break;
        //             }
        //             await new Promise((resolve) => setTimeout(resolve, 3000));
        //         }

        //         const finalStatusResponse = await axios.get(statusUrl);
        //         if (finalStatusResponse.data.status === "PENDING") {
        //             throw new Error("Swarm upload is still pending after max checks");
        //         }

        //         const updateResponse = await axios.patch(
        //             "https://api.cast.decast.live/api/event/update/decast/recordings/",
        //             {
        //                 record_id: this.recording["Record ID"],
        //                 private_meeting_id: this.recording["Meeting ID"],
        //                 swarm_uploaded: "True",
        //             },
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Bearer ${this.accessToken}`,
        //                 },
        //             }
        //         );

        //         if (updateResponse.status === 200) {
        //             this.recording.swarm_uploaded = "True";
        //         } else {
        //             throw new Error("Error updating recording");
        //         }

        //         console.log("Update response:", updateResponse);
        //     } catch (error) {
        //         console.error(error.message);
        //     }
        // },

        async sendTransaction() {
            // Check if MetaMask is installed
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Request account access
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const account = accounts[0];
                    console.log('Connected account:', account);

                    // Define the transaction parameters
                    const transactionParameters = {
                        to: '0xRecipientAddress', // Replace with the recipient address
                        value: '0x29a2241af62c0000', // Replace with the value in wei (0.1 ETH in this example)
                        gas: '0x5208', // Gas limit (21000 in this example)
                        gasPrice: '0x09184e72a000', // Gas price (10000000000000 in this example)
                    };

                    // Send the transaction request
                    const txHash = await window.ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [transactionParameters],
                    });

                    console.log('Transaction hash:', txHash);
                } catch (error) {
                    console.error('Error sending transaction:', error);
                }
            } else {
                console.error('MetaMask is not installed');
            }
        },

        // async uploadToSia() {
        //     try {
        //         const videoURL =
        //             this.recording["Playback Data"]["Playback URL"].replace(
        //                 "/presentation/2.3",
        //                 "/video"
        //             ) + "/video-0.m4v";
        //         const data = {
        //             file_url: videoURL,
        //         };

        //         console.log(data);
        //         const response = await axios.post(
        //             "https://api.storage.video.wiki/api/sia/upload/",
        //             data,
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //             }
        //         );
        //         this.isSelecting = false;
        //         console.log("Upload successful", response, response.data);

        //         if (response.status !== 200) {
        //             throw new Error("Sia upload failed");
        //         }

        //         const updateResponse = await axios.patch(
        //             "https://api.cast.decast.live/api/event/update/decast/recordings/",
        //             {
        //                 record_id: this.recording["Record ID"],
        //                 private_meeting_id: this.recording["Meeting ID"],
        //                 sia_uploaded: "True",
        //             },
        //             {
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Bearer ${this.accessToken}`,
        //                 },
        //             }
        //         );

        //         if (updateResponse.status === 200) {
        //             this.recording.sia_uploaded = "True";
        //         } else {
        //             throw new Error("Error updating recording");
        //         }

        //         console.log("Update response:", updateResponse);
        //     } catch (error) {
        //         console.error("Error uploading to Sia via proxy", error);
        //     }
        // },

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
    min-height: 220px;
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
</style>
