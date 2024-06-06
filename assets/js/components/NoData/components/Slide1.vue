<template>
    <div class="basic_home_div_ flex flex-col gap-2 items-center justify-center">
        <P class="text-md p-2">To create an account on <span style="color:#D7DF23;">Decast</span>, go to the <a href="https://decast.live" target="_blank" class="text-blue-500">Decast.live</a> website and click the 'Login/Signup' button located in
            the top right corner. For further guidance, hover over the image below to see where the button is located.
        </P>
        <div class="image-container">
            <img class="zoom-image object-contain" src="../../../../images/home.png" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Slide1",
}
</script>

<style scoped>
.image-container {
    position: relative;
    overflow: scroll;
    width: 100%;
    height: 300px;
}

.image-container::-webkit-scrollbar {
    scroll-behavior: smooth;
    display: none;
}

.zoom-image {
    position: absolute;
    top: 0;
    right: 0 !important;
    width: 100%;
    height: 100%;
    transition: transform 1s ease;
    transform-origin:top right !important;
}

.image-container:hover .zoom-image {
    transform: scale(3);
    transform-origin:top right !important;
}
</style>