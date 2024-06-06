<template>
    <div class="basic_home_div_ flex flex-col gap-2 items-center justify-center">
        <p class="text-md p-2">
            Once you click on the 'Login/Signup' button, this popup window will appear where you can either log in with
            your existing account credentials or create a new account by selecting 'Signup'. After successfully logging
            in to <span style="color:#D7DF23;">Decast</span>, you'll gain access to the extension's features. For further guidance, hover over the image
            below to see the popup.
        </p>
        <div class="image-container2">
            <img class="zoom-image2 object-contain" src="../../../../images/login.png" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Slide2",
}
</script>

<style scoped>
.image-container2 {
    position: relative;
    overflow: scroll;
    width: 100%;
    height: 300px;
}

.image-container2::-webkit-scrollbar {
    scroll-behavior: smooth;
    display: none;
}

.zoom-image2 {
    position: absolute;
    top: 0;
    left: 0 !important;
    width: 100%;
    height: 100%;
    transition: transform 1s ease;
    transform-origin: top left !important;
}

.image-container2:hover .zoom-image2 {
    transform: scale(2);
    transform-origin: top left !important;
}
</style>
