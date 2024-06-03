<template>
    <div class="basic_home_div_ flex flex-col gap-2 items-center justify-center">
        <p class="text-md p-2">
            Once you complete the previous steps, you should be able to use the Decast extension, which
            will appear as shown in the image below. Hover over the image for a closer look. You will be redirected to
            <a href="https://decast.live" target="_blank" class="text-blue-500">Decast.live</a> in <span
                class="text-lg text-semibold" style="color: #D7DF23;">{{ timeLeft }}</span>...
        </p>

        <div class="image-container3">
            <img class="zoom-image3 object-contain" src="../../../../images/extension.png" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Slide3",
    data() {
        return {
            timeLeft: 15,
            redirectIn: null,
        }
    },
    mounted() {
        this.redirect();
    },
    methods: {
        redirect() {
            this.redirectIn = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft <= 0) {
                    clearInterval(this.redirectIn);
                    window.open("https://decast.live", "_blank");
                }
            }, 1000);
        }
    },
    beforeDestroy() {
        clearInterval(this.redirectIn);
    }
}
</script>

<style scoped>
.image-container3 {
    position: relative;
    overflow: scroll;
    width: 100%;
    height: 300px;
}

.image-container3::-webkit-scrollbar {
    scroll-behavior: smooth;
    display: none;
}

.zoom-image3 {
    position: absolute;
    top: 0;
    right: 0 !important;
    width: 100%;
    height: 100%;
    transition: transform 1s ease;
    transform-origin: top right !important;
}

.image-container3:hover .zoom-image3 {
    transform: scale(2);
    transform-origin: top right !important;
}
</style>