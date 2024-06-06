<template>
    <div>
        <CastCardShimmer v-if="isLoading" />
        <div v-else class="cast_list flex flex-col justify-between items-start text-left mb-4 w-full py-3 px-4">
            <div class="flex flex-row justify-between items-center w-full">
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-lg flex items-center">{{ truncateText(castDetails.event_name, 25)
                        }}
                        <span class="text-red-500 text-sm flex items-center gap-2"
                            v-if="castDetails.is_running === 'true'"><span
                                class="basic_live_dot_ rounded-full"></span></span>
                    </p>
                    <p style="color: #a6a6a6;" class="mt-2">{{ castDetails.schedule_time }}</p>
                </div>

                <div class="cursor-pointer">
                    <span v-if="castDetails.is_running === 'false' && !isCastStart"
                        @click="joinNow(castDetails.public_meeting_id)" v-tooltip="'/Start'">
                        <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                    <span v-if="castDetails.is_running === 'true'">
                        <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.09961 26.2758V2.47583H25.8996V26.2758H2.09961Z" fill="#FF4646" />
                                <path d="M28 2.47598H25.9V26.276H28V2.47598Z" fill="black" />
                                <path d="M2.1 0.375977V2.47598H25.9V0.375977H2.1Z" fill="black" />
                                <path d="M0 26.276H2.1V2.47598H0V26.276Z" fill="black" />
                                <path d="M2.1 26.276V28.376H25.9V26.276H2.1Z" fill="black" />
                            </svg>

                        </svg>

                    </span>
                </div>
            </div>
            <div class="flex flex-row justify-start items-center gap-4 mt-2" v-if="castDetails.cast_type === 'public'">
                <p class="text-md shortURL">{{ truncateText(shortURL, 30) }}</p> <button class="custm-style"
                    @click="copy(castDetails.public_meeting_id, castDetails.h_ap)">
                    <span v-tooltip="'/Copy'">
                        <svg width="20" height="20" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.2087 1.53345H8.40866V10.635L2.27533 10.7334V21.4668H13.0087V15.3334H22.2087V1.53345Z"
                                fill="black" />
                            <path d="M0.741943 21.4667H2.27528V10.7333H0.741943V21.4667Z" fill="#D7DF23" />
                            <path d="M8.40861 1.53333H6.87528V9.2H2.27528V10.7333H6.87528V15.3333H8.40861V1.53333Z"
                                fill="#D7DF23" />
                            <path d="M13.0086 21.4667H14.5419V16.8667H22.2086V15.3333H8.40861V16.8667H13.0086V21.4667Z"
                                fill="#D7DF23" />
                            <path d="M2.27528 21.4667V23H13.0086V21.4667H2.27528Z" fill="#D7DF23" />
                            <path d="M23.7419 1.53333H22.2086V15.3333H23.7419V1.53333Z" fill="#D7DF23" />
                            <path d="M8.40861 0V1.53333H22.2086V0H8.40861Z" fill="#D7DF23" />
                        </svg>

                    </span></button>
            </div>
        </div>
    </div>
</template>

<script>
import CastCardShimmer from './DecastCardShimmer.vue'

export default {
    name: 'DecastCard',
    props: [
        'castDetails',
        'index',
        'getCastList',
    ],
    components: {
        CastCardShimmer
    },
    data() {
        return {
            isLoading: false,
            isCastStart: false,
            showCastIsLive: false,
            shortURL: '',
            casts: [],
            remainingTime: [],
        }
    },
    mounted() {
        this.showURL(this.castDetails.public_meeting_id, this.castDetails.h_ap);
    },
    methods: {
        copy(id, pass) {
            if (pass === undefined) {
                navigator.clipboard.writeText('https://decast.live/live/' + id);
                return;
            }
            navigator.clipboard.writeText(
                'https://decast.live/c/' + id + '/?pass=' + pass
            );
        },
        showURL(id, pass) {
            if (pass === undefined) {
                this.shortURL = `https://decast.live/live/` + id;
            } else {
                this.shortURL = `https://decast.live/c/` + id + '/?pass=' + pass;
            }
        },
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },
        async joinNow(id) {
            const data = {
                email: '',
                name: '',
                password: '',
                public_meeting_id: id,
                redirect: true,
                room_type: 'private',
                avatar_url: '',
                guest: false,
                attendee_password: '',
                meetingId: '',
            };
            try {
                const res = await this.$store.dispatch('cast/joinNow', data);
                this.isCastStart = true;
                window.open(res.url, '_blank');
            } catch (e) {
                console.log('error', e);
            }
        },
    }
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.cast_list {
    border: 1px solid #fff;
}

.cast_list:hover {
    border: 1px solid #D7DF23;
}

.basic_live_dot_ {
  background-color: red !important;
  height: 8px;
  width: 8px;
}

.shortURL {
    color: #a6a6a6;
}
</style>