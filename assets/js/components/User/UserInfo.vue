<template>
    <div class="modal" v-if="showProfile">
        <div class="modal-content h-full flex flex-col gap-4 justify-start items-center">
            <div class="relative w-full flex justify-end">
                <span class="close text-xl font-bold text-red-500 text-center" @click="closeModal">X</span>
            </div>

            <div class="basic_child_modal_ flex flex-col gap-4 justify-between items-center w-full pl-4 pr-4 pb-4 ">
                <h2 class="text-left w-full text-lg text-white font-semibold">//My Profile</h2>

                <div style="border-bottom: 1px solid white;" class="w-full"></div>
                <div class="w-full flex flex-col gap-2 ">
                    <label class="text-lg text-white text-left" for="username">user.username</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none border-none text-lg text-black"
                        v-model="activeUserInfo.username" placeholder="user.name" :readonly="!isEditing" />
                </div>
                <!-- <input class="w-full p-1 pl-2 pr-2 outline-none border-none text-lg text-black" v-model="activeUserInfo.first_name" placeholder="first.name" :readonly="!isEditing"/>
                <input class="w-full p-1 pl-2 pr-2 outline-none border-none text-lg text-black" v-model="activeUserInfo.last_name" placeholder="last.name" :readonly="!isEditing"/> -->
                <div class="w-full flex flex-col gap-2 ">
                    <label class="text-lg text-white text-left">user.email</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none border-none text-lg text-black"
                        v-model="activeUserInfo.email" placeholder="user.email" :readonly="!isEditing" />
                </div>
                <div class="w-full flex flex-col gap-2 ">
                    <label class="text-lg text-white text-left">user.balance</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none border-none text-lg text-black" v-model="empty"
                        value="null" placeholder="wallet.balance" :readonly="!isEditing" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    computed: {
        accessToken() {
            return this.$store.state.accessToken;
        },
        activeUserInfo() {
            return this.$store.state.userInfo;
        }
    },
    data() {
        return {
            isEditing: false
        };
    },
    props: ['showProfile'],
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.modal {
    z-index: 99;
    position: absolute;
    background: #000;
    border: 1px solid #fff;
    color: #fff;
    width: 100%;
    height: 385px;
    left: 0;
    top: 0;
}

.basic_child_modal_ {
    height: 300px;
}

.close {
    border: 1px solid red;
    width: 24px;
    height: 24px;
    position: absolute;
    background-color: #000;
    z-index: 5;
    right: -5px;
    top: -10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>