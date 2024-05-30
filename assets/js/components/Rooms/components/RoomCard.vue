<template>
    <RoomCardShimmer v-if="isLoading" />
    <div v-else class="room_list flex justify-between items-center mb-4 w-full py-3 px-4">
        <div>
            <p class="text-lg font-semibold">
                {{ truncateText(room.room_name, 20) }}
            </p>
            <div class="flex flex-row justify-start items-center gap-4 mt-2">
                <p class="text-md shortURL">{{ shortURL }}</p> <button class="custm-style"
                    @click="copy(room.short_code)">
                    <span>
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

        <div class="cursor-pointer">
            <span v-if="!isRoomStart" @click.prevent="start(room.room_url)">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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

            <span v-if="isRoomStart">
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</template>

<script>
import RoomCardShimmer from './RoomCardShimmer'
export default {
    name: "Roomcard",
    props: ['room', 'index', 'roomsList', 'getRoomList'],
    data() {
        return {
            isLoading: false,
            text: '',
            rooms: [],
            recordings: [],
            isRoomStart: false,
            shortURL: '',
        }
    },
    components:{
        RoomCardShimmer,
    },

    mounted() {
        this.showURL(this.room.short_code);
    },

    methods: {
        truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            } else {
                return text;
            }
        },

        copy(shortCode) {
            navigator.clipboard.writeText('https://decast.live/j/' + shortCode);
        },

        showURL(shortCode) {
            this.shortURL = `https://decast.live/j/` + shortCode;
        },

        start(url) {
            let id = url.split('/');
            id = id[id.length - 1];
            this.$store
                .dispatch('room/start', id)
                .then((res) => {
                    this.isRoomStart = true;
                    window.open(res.data.room_url, '_blank');
                    // window.open(res.data.room_url, '_blank','width=900,height=700,scrollbars=yes,resizable=yes')
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }
}

</script>

<style scoped>
 * {
    font-family: 'JetBrains Mono', monospace !important;
  }
  
.room_list {
    border: 1px solid #fff;
}

.room_list:hover {
    border: 1px solid #D7DF23;
}

.shortURL {
    color: #a6a6a6;
}
</style>