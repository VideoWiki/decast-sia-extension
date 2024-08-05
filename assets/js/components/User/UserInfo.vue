<template>
    <div class="modal" v-if="showProfile">
        <div class="modal-content h-full flex flex-col gap-4 justify-start items-center">
            <div class="relative w-full flex justify-end">
                <span class="close text-xl font-bold text-red-500 text-center" @click="closeModal">X</span>
            </div>

            <div class="basic_child_modal_ flex flex-col gap-4 justify-between items-center w-full pl-4 pr-4 pb-4 ">
                <h2
                    class="text-left w-full text-lg text-white font-semibold border-b border-t border-dashed border-white mt-2 pt-2 pb-2">
                    //My Profile</h2>

                <!-- <div style="border-bottom: 1px dashed white;" class="w-full"></div> -->
                <div class="w-full flex gap-4 items-center justify-start pb-4">
                    <div class="img-cont">
                        <input type="file" id="display-profile-input" @change="uploadFile" class="hidden"
                            accept="image/*" />
                        <button class="img-up" :disabled="!isEditing || uploadInProgress" @click="openUpload"
                            :style="{ display: !isEditing ? 'none' : 'block' }">
                            <img src="@/images/camera.svg" alt="Upload Image" />
                        </button>
                        <vs-avatar :text="activeUserInfo.first_name[0]" class="m-0 shadow-md" color="primary"
                            :src="activeUserInfo.profile_pic || null" size="69px" />
                    </div>

                    <div class="name-cont">
                        <h3 class="text-xl">{{ activeUserInfo.username }}</h3>
                        <p class="text-lg">{{ activeUserInfo.email }}</p>
                    </div>
                </div>

                <!-- <div class="w-full flex flex-col gap-2 ">
                    <label class="text-white text-left" for="username">user.username</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none text-white bg-black"
                        v-model="activeUserInfo.username" placeholder="user.name" :readonly="!isEditing" />
                </div> -->
                <div class="w-full flex flex-col gap-2 ">
                    <label class="text-white text-left" for="firstname">user.firstname</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none text-white bg-black" v-model="firstName"
                        placeholder="first.name" :readonly="!isEditing" />
                    <span class="error text-red-500 mt-1" v-if="error.firstName">{{
                        error.firstName
                    }}</span>
                </div>
                <div class="w-full flex flex-col gap-2 ">
                    <label class="text-white text-left" for="lastname">user.lastname</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none text-white bg-black" v-model="lastName"
                        placeholder="last.name" :readonly="!isEditing" />
                </div>


                <div class="w-full flex flex-col gap-2 ">
                    <label class="text-white text-left">user.email</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none text-white bg-black" v-model="email"
                        placeholder="user.email" :readonly="!isEditing" />
                    <span class="error text-red-500 mt-1" v-if="error.email">{{ error.email }}</span>
                </div>
                <!-- <div class="w-full flex flex-col gap-2 ">
                    <label class="text-white text-left">user.balance</label>
                    <input class="w-full p-1 pl-2 pr-2 outline-none text-white bg-black" v-model="empty" value="null"
                        placeholder="wallet.balance" :readonly="!isEditing" />
                </div> -->

                <div class="edit-cont w-full flex mt-4">
                    <button @click="editProfile" :disabled="isEditing"
                        class="bg-white text-black flex gap-2 justify-center items-center text-lg pl-2 pr-2"
                        :style="{ display: isEditing ? 'none' : 'block' }"> >> Edit</button>
                    <button @click="saveProfile" :disabled="!isEditing"
                        class="bg-white text-black flex gap-2 justify-center items-center text-lg pl-2 pr-2"
                        :style="{ display: isEditing ? 'block' : 'none' }">
                        >> Confirm
                    </button>
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
            firstName: '',
            lastName: '',
            email: '',
            isEditing: false,
            uploadInProgress: false,
            uploadedImageBlob: null,
            error: {
                firstName: '',
                lastName: '',
                email: '',

            },
        };
    },
    props: ['showProfile'],
    mounted() {
        this.firstName = this.activeUserInfo.first_name;
        this.lastName = this.activeUserInfo.last_name;
        this.email = this.activeUserInfo.email;
        // console.log(this.lastName,'fkflkl')
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        openUpload() {
            document.getElementById('display-profile-input').click();
        },
        uploadFile(event) {
            const selectedFile = event.target.files[0];
            this.uploadedImageBlob = selectedFile;
            this.activeUserInfo.profile_pic = URL.createObjectURL(selectedFile);
            event.target.value = '';
        },
        editProfile() {
            this.isEditing = true;
        },
        saveProfile() {
            this.error = {
                firstName: '',
                lastName: '',
                email: '',
            };

            if (!this.firstName) {
                this.error.firstName = 'First name is required.';
            }
            if (!this.email) {
                this.error.email = 'Email address is required.';
            }

            if (
                !this.error.firstName &&
                !this.error.lastName &&
                !this.error.email
            ) {
                const payload = {
                    user_name: this.activeUserInfo.username,
                    fname: this.firstName,
                    lname: this.lastName,
                    email: this.email,
                    p_image: this.uploadedImageBlob ? this.uploadedImageBlob : '',
                };
                console.log(payload);
                this.$store
                    .dispatch('auth/updateUserDetails', payload)
                    .then((res) => {
                        console.log(res, 'res');
                        this.isEditing = false;
                        this.activeUserInfo.profile_pic = res.data.profile_image;
                        console.log(res.data.profile_image, 'img');
                        console.log(payload, 'pay');
                        this.$store.commit('SET_USER_INFO', this.activeUserInfo);
                        this.$vs.notify({
                            title: 'Success',
                            text: 'Changes Saved Successfully',
                            color: 'success',
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        this.$vs.notify({
                            title: 'Error',
                            text: 'Error Saving Details',
                            color: 'danger',
                        });
                    })
                    .finally(() => {

                    });
            }
        },
    }
}
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.modal {
    z-index: 999;
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
    height: 385px;
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
    right: -5px;
    top: -10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    border: 1px solid white;
    font-size: 16px;
}

label {
    font-size: 14px;
    color: #22c55e;
}

.img-cont {
    width: 69px;
    height: 69px;
    position: relative;
    border-radius: 50%;
}

.img-cont img {
    width: 69px;
    height: 69px;
    object-fit: fill !important;
    border-radius: 50%;
    border: 2px solid #31394e;
}

.name-cont p {
    color: #647181;
}

.name-cont h3 {
    color: #fff;
}


.img-up {
    position: absolute;
    background-color: #1f272f;
    border: 1px solid #31394e;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    right: 0%;
    z-index: 10000;
    cursor: pointer;
}

.img-up img {
    width: 18px;
    height: 18px;
}

.edit-cont button {
    border: 1px solid #d7df23;
    border-right: 2px solid #d7df23;
    border-bottom: 2px solid #d7df23;
}
</style>