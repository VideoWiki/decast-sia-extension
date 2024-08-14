<template>
    <RoomCardShimmer v-if="isLoading" />
    <div v-else class="room_list flex justify-between items-center mb-4 w-full py-3 px-4">
        <div>
            <p class="text-lg font-semibold">
                {{ truncateText(room.room_name, 20) }}
            </p>
            <div class="flex flex-row justify-start items-center gap-4 mt-2">
                <p class="text-md shortURL">{{ shortURL }}</p> 
                <button class="custm-style" @click="copy(room.short_code)">
                    <span class="copy_btn_cont" v-tooltip="'/Copy'">
                        <CopyButton color="#D7DF23"/>
                    </span></button>
            </div>
        </div>

        <div class="cursor-pointer">
            <span v-if="!isRoomStart" @click.prevent="start(room.room_url)" v-tooltip="'/Start'">
                <StartButton />
            </span>

            <span v-if="isRoomStart">
               <LiveButton/>
            </span>
        </div>
    </div>
</template>

<script>

import RoomCardShimmer from './RoomCardShimmer'
import CopyButton from '../../../../common/CopyButton.vue';
import StartButton from '../../../../common/StartButton.vue';
import LiveButton from '../../../../common/LiveButton.vue';
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
    components: {
        RoomCardShimmer,
        CopyButton,
        StartButton,
        LiveButton
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
                    chrome.runtime.sendMessage({ action: 'updateBadge', badgeType: 'cast' });
                    // window.open(res.data.room_url, '_blank');
                    window.open(res.data.room_url, '_blank', 'width=1366,height=768,scrollbars=yes,resizable=yes');
                })
                .catch((e) => {
                    // console.log(e);
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