<template>
    <div class="recordings flex flex-col justify-between items-center mb-4 w-full py-2 px-4 gap-2">
        <div class="flex flex-row justify-between items-center w-full">
            <p class="text-lg font-semibold">
                {{ truncateText(recording.Name, 20) }}
            </p>
            <div class="flex gap-2 justify-end items-center">
                <span class="copy_btn cursor-pointer" @click="copyRecording" v-tooltip="'/Copy'">
                    <CopyButton />
                </span>

                <!-- <span v-if="recording.swarm_uploaded === false && recording.sia_uploaded === false"
                    class="edit_btn cursor-pointer" @click="handleDeleteRecording" v-tooltip="'/Delete'">
                    <DeleteButton />
                </span> -->

                <span
                    class="down_btn cursor-pointer" @click="handleDownloadRecording" v-tooltip="'/Download'">
                    <DownloadButton />
                </span>

                <span v-if="recording.swarm_uploaded === false && recording.sia_uploaded === false" @click="handleSelect"
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
                </span>


                <span class="open_btn cursor-pointer" @click="openRecording" v-tooltip="'/Play'">
                    <StartButton />
                </span>
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
        </div>
    </div>
</template>

<script>
import CopyButton from "../../../../common/CopyButton.vue";
import StartButton from "../../../../common/StartButton.vue";
import DeleteButton from "../../../../common/DeleteButton.vue";
import axios from "axios";
import DownloadButton from "../../../../common/DownloadButton.vue";
export default {
    name: "RecordingCard",
    props: ["recording", "index", "getRecordings"],
    data() {
        return {
            isSelecting: false,
        };
    },
    components: {
        CopyButton,
        StartButton,
        DeleteButton,
        DownloadButton
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

        handleDownloadRecording(){

        },

        async handleSwarmUpload() {
            const videoURL =
                this.recording["Playback Data"]["Playback URL"].replace(
                    "/presentation/2.3",
                    "/video"
                ) + "/video-0.m4v";

            try {
                const uploadResponse = await axios.post(
                    "http://api.storage.video.wiki/api/swarm-upload/",
                    {
                        video_url: videoURL,
                    },
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (uploadResponse.status < 200 || uploadResponse.status >= 300) {
                    throw new Error("Swarm upload failed");
                }
                this.isSelecting = false;
                const statusUrl = `http://api.storage.video.wiki/api/swarm-status/${this.recording["Record ID"]}/`;

                for (let i = 0; i < 20; i++) {
                    const statusResponse = await axios.get(statusUrl);
                    if (statusResponse.data.status !== "PENDING") {
                        break;
                    }
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                }

                const finalStatusResponse = await axios.get(statusUrl);
                if (finalStatusResponse.data.status === "PENDING") {
                    throw new Error("Swarm upload is still pending after max checks");
                }

                const updateResponse = await axios.patch(
                    "https://api.cast.decast.live/api/event/update/decast/recordings/",
                    {
                        record_id: this.recording["Record ID"],
                        private_meeting_id: this.recording["Meeting ID"],
                        swarm_uploaded: "True",
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                    }
                );

                if (updateResponse.status === 200) {
                    this.recording.swarm_uploaded = "True";
                } else {
                    throw new Error("Error updating recording");
                }

                console.log("Update response:", updateResponse);
            } catch (error) {
                console.error(error.message);
            }
        },

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

    async uploadToSia() {
        try {
            const videoURL =
                this.recording["Playback Data"]["Playback URL"].replace(
                    "/presentation/2.3",
                    "/video"
                ) + "/video-0.m4v";
            const data = {
                file_url: videoURL,
            };

            console.log(data);
            const response = await axios.post(
                "https://api.storage.video.wiki/api/sia/upload/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            this.isSelecting = false;
            console.log("Upload successful", response, response.data);

            if (response.status !== 200) {
                throw new Error("Sia upload failed");
            }

            const updateResponse = await axios.patch(
                "https://api.cast.decast.live/api/event/update/decast/recordings/",
                {
                    record_id: this.recording["Record ID"],
                    private_meeting_id: this.recording["Meeting ID"],
                    sia_uploaded: "True",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                }
            );

            if (updateResponse.status === 200) {
                this.recording.sia_uploaded = "True";
            } else {
                throw new Error("Error updating recording");
            }

            console.log("Update response:", updateResponse);
        } catch (error) {
            console.error("Error uploading to Sia via proxy", error);
        }
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
