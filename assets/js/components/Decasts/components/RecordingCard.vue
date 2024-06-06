<template>
    <div class="recordings flex flex-col justify-between items-center mb-4 w-full py-2 px-4 gap-2">
        <div class="flex flex-row justify-between items-center w-full">
            <p class="text-lg font-semibold">{{ truncateText(recording.Name, 20) }} </p>
            <div class="flex gap-3 justify-end items-center">
                <span class="edit_btn cursor-pointer" @click="editRecord" v-tooltip="'/Edit'">
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2.42205 2.59665C2.42205 2.42805 2.48902 2.26636 2.60824 2.14715C2.72745 2.02793 2.88914 1.96096 3.05774 1.96096H4.01127V1.00742C4.01127 0.838824 4.07825 0.677134 4.19746 0.557918C4.31668 0.438703 4.47837 0.371729 4.64696 0.371729C4.81556 0.371729 4.97725 0.438703 5.09646 0.557918C5.21568 0.677134 5.28265 0.838824 5.28265 1.00742V1.96096H6.23619C6.40479 1.96096 6.56648 2.02793 6.68569 2.14714C6.80491 2.26636 6.87188 2.42805 6.87188 2.59665C6.87188 2.76524 6.80491 2.92693 6.68569 3.04615C6.56648 3.16536 6.40479 3.23234 6.23619 3.23234H5.28265V4.18587C5.28265 4.35447 5.21568 4.51616 5.09646 4.63537C4.97725 4.75459 4.81556 4.82156 4.64696 4.82156C4.47837 4.82156 4.31668 4.75459 4.19746 4.63537C4.07825 4.51616 4.01127 4.35447 4.01127 4.18587V3.23234H3.05774C2.88914 3.23233 2.72745 3.16536 2.60824 3.04614C2.48902 2.92693 2.42205 2.76524 2.42205 2.59665ZM17.0429 9.2714H15.7715V8.00002C15.7715 7.83142 15.7046 7.66973 15.5854 7.55051C15.4661 7.4313 15.3045 7.36433 15.1359 7.36433C14.9673 7.36433 14.8056 7.4313 14.6864 7.55051C14.5671 7.66973 14.5002 7.83142 14.5002 8.00002V9.2714H13.2288C13.0602 9.2714 12.8985 9.33837 12.7793 9.45759C12.6601 9.5768 12.5931 9.73849 12.5931 9.90709C12.5931 10.0757 12.6601 10.2374 12.7793 10.3566C12.8985 10.4758 13.0602 10.5428 13.2288 10.5428H14.5002V11.8142C14.5002 11.9828 14.5671 12.1444 14.6864 12.2637C14.8056 12.3829 14.9673 12.4498 15.1359 12.4498C15.3045 12.4498 15.4661 12.3829 15.5854 12.2637C15.7046 12.1444 15.7715 11.9828 15.7715 11.8142V10.5428H17.0429C17.2115 10.5428 17.3732 10.4758 17.4924 10.3566C17.6116 10.2374 17.6786 10.0757 17.6786 9.90709C17.6786 9.73849 17.6116 9.5768 17.4924 9.45759C17.3732 9.33837 17.2115 9.2714 17.0429 9.2714ZM12.4067 7.1784L3.9568 15.6283C3.71814 15.8663 3.39485 16 3.05779 16C2.72074 16 2.39743 15.8664 2.15875 15.6284L0.514975 13.9845C0.396904 13.8665 0.303247 13.7263 0.239351 13.572C0.175454 13.4178 0.142571 13.2525 0.142578 13.0855C0.142586 12.9185 0.175484 12.7532 0.239394 12.5989C0.303304 12.4447 0.396973 12.3045 0.515054 12.1865L12.3297 0.371729C12.5684 0.133696 12.8917 1.48971e-05 13.2287 1.245e-09C13.5658 -1.48946e-05 13.8891 0.133638 14.1278 0.37165L15.7715 2.01551C15.8896 2.13357 15.9833 2.27373 16.0472 2.42798C16.1111 2.58224 16.1439 2.74758 16.1439 2.91455C16.1439 3.08151 16.111 3.24685 16.0471 3.4011C15.9832 3.55535 15.8895 3.6955 15.7715 3.81355L12.4072 7.17785L12.4069 7.17813L12.4067 7.1784ZM11.9574 5.82961L14.8725 2.91449L14.8726 2.91441L14.8731 2.91383L13.2288 1.27071L10.3137 4.18587L11.9574 5.82961ZM12.5931 13.0855H11.9574V12.4498C11.9574 12.2813 11.8904 12.1196 11.7712 12.0003C11.652 11.8811 11.4903 11.8142 11.3217 11.8142C11.1531 11.8142 10.9914 11.8811 10.8722 12.0003C10.753 12.1196 10.686 12.2813 10.686 12.4498V13.0855H10.0503C9.88174 13.0855 9.72005 13.1525 9.60083 13.2717C9.48162 13.3909 9.41464 13.5526 9.41464 13.7212C9.41464 13.8898 9.48162 14.0515 9.60083 14.1707C9.72005 14.2899 9.88174 14.3569 10.0503 14.3569H10.686V14.9926C10.686 15.1612 10.753 15.3229 10.8722 15.4421C10.9914 15.5613 11.1531 15.6283 11.3217 15.6283C11.4903 15.6283 11.652 15.5613 11.7712 15.4421C11.8904 15.3229 11.9574 15.1612 11.9574 14.9926V14.3569H12.5931C12.7617 14.3569 12.9234 14.2899 13.0426 14.1707C13.1618 14.0515 13.2288 13.8898 13.2288 13.7212C13.2288 13.5526 13.1618 13.3909 13.0426 13.2717C12.9234 13.1525 12.7617 13.0855 12.5931 13.0855Z"
                            fill="#A1A1A1" />
                    </svg>

                </span>

                <span class="copy_btn cursor-pointer" @click="copyRecording" v-tooltip="'/Copy'">
                    <svg width="18" height="18" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.2087 1.53345H8.40866V10.635L2.27533 10.7334V21.4668H13.0087V15.3334H22.2087V1.53345Z"
                            fill="black" />
                        <path d="M0.741943 21.4667H2.27528V10.7333H0.741943V21.4667Z" fill="#A1A1A1" />
                        <path d="M8.40861 1.53333H6.87528V9.2H2.27528V10.7333H6.87528V15.3333H8.40861V1.53333Z"
                            fill="#A1A1A1" />
                        <path d="M13.0086 21.4667H14.5419V16.8667H22.2086V15.3333H8.40861V16.8667H13.0086V21.4667Z"
                            fill="#A1A1A1" />
                        <path d="M2.27528 21.4667V23H13.0086V21.4667H2.27528Z" fill="#A1A1A1" />
                        <path d="M23.7419 1.53333H22.2086V15.3333H23.7419V1.53333Z" fill="#A1A1A1" />
                        <path d="M8.40861 0V1.53333H22.2086V0H8.40861Z" fill="#A1A1A1" />
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
            <p style="color: #a6a6a6; font-size: 16px;">>>Cast: <span style="color:#D7DF23;"> {{ truncateText(recording.cast_name, 20) }}
                    </span></p>
            <p style="color: #a6a6a6; font-size: 16px;">
                {{ recording['Start Time (Readable)'].split(' ')[0] }}
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'RecordingCard',
    props: ['recording', 'index', 'getRecordings'],
    data() {
        return {

        }
    },
    methods: {
        openRecording() {
            const playbackURL =
                this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v';
            window.open(playbackURL, '_blank');
        },
        copyRecording() {
            navigator.clipboard.writeText(
                this.recording['Playback Data']['Playback URL'].replace(
                    '/presentation/2.3',
                    '/video'
                ) + '/video-0.m4v'
            );
        },
        editRecord() {
            setTimeout(() => {
                const meetingId = this.recording['Record ID'];
                const url = `https://beta.editor.video.wiki/studio?meetingId=${meetingId}`;
                window.open(url, '_blank');
            }, 1000);
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
</style>