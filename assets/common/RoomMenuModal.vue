<template>
    <div class="modal" v-if="roomDetails">
        <div v-if="loading">
            <CommonLoader />
        </div>
        <div class="modal-content h-full flex flex-col gap-4 justify-start items-center pt-2">
            <div class="relative w-full flex justify-end">
                <span class="close text-xl font-bold text-red-500 text-center" @click="closeModal">X</span>
            </div>
            <div
                class="basic_child_modal_ flex flex-col gap-4 justify-start items-center w-full pl-4 pr-4 pb-4 text-left">
                <p class="heading_basic_ pt-2 pb-2 w-full text-left">
                    >>Room Options : Select the below actions
                </p>
                <div class="flex justify-center items-center">
                    <div class="grid-container">
                        <div class="grid-item" @click="basicAlert">
                            Share<br />Room
                        </div>
                        <div class="grid-item" @click="basicAlert">
                            Custom <br />Room URL
                        </div>

                        <div class="grid-item" @click="basicAlert">
                            Rename <br />Room
                        </div>
                        <div class="grid-item danger-button" @click="basicAlert">
                            Delete <br />Room
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonLoader from './CommonLoader.vue';

export default {
    name: "RoomOptionsModal",
    props: ['closeModal', 'setActiveModal', 'roomDetails', 'getList', 'index'],
    components: {
        CommonLoader,
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        basicAlert() {
            this.$vs.notify({
                title: "Coming Soon",
                text: "This feature is under development for the extension. Please use the website in the meantime.",
                time: 10000,
                color: "primary",
            });
        },
    }

}

</script>

<style scoped>
.modal {
    z-index: 99;
    position: absolute;
    background: #000;
    border: 1px solid #fff;
    color: #fff;
    width: 100%;
    height: 400px;
    left: 0;
    top: 0;
}

.basic_child_modal_ {
    height: 400px;
    overflow-y: scroll;
}

.modal ::-webkit-scrollbar {
    display: none;
}


.close {
    border: 1px solid red;
    width: 24px;
    height: 24px;
    position: absolute;
    background-color: #000;
    z-index: 5;
    right: -10px;
    top: -20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid-container {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
}

.grid-item {
    height: 80px;
    width: 110px;
    border: 1px solid #FFFFFF;
    padding: 4px 8px;
    cursor: pointer;
}

.grid-item:hover {
    border: 1px solid #D7DF23;
}

.danger-button {
    border: 1px solid #EF4444 !important;
    color: #EF4444 !important;
}

.heading_basic_ {
    border-top: 2px dashed #fff;
    border-bottom: 2px dashed #fff;
    color: #22c55e;
}
</style>