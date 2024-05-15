import { createApp } from 'vue';

createApp({
    data() {
        return {
            activeTab: 'rooms' // Default active tab
        };
    },
    methods: {
        showRooms() {
            this.activeTab = 'rooms';
        },
        showCasts() {
            this.activeTab = 'casts';
        },
        showDecasts() {
            this.activeTab = 'decasts';
        }
    }
}).mount('#app');
