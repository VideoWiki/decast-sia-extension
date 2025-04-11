<template>
    <div class="modal">
        <div v-if="loading">
            <CommonLoader />
        </div>
        <div class="modal-content h-full flex flex-col gap-6 justify-start items-center pt-2">
            <div class="basic_child_modal_ flex flex-col gap-4 justify-start items-center w-full p-4 pt-2 text-left">
                <label for="storage-select" class="text-left text-lg text-white w-full">//decast.create</label>
                <form @submit.prevent="submitCastForm" class="w-full flex flex-col gap-4">
                    <input v-model="stepOneProps.event_name" type="text" placeholder="Cast Name" class="input_field"
                        required />
                    <div class="flex gap-4">

                        <textarea v-model="stepOneProps.description" placeholder="Description"
                            class="textarea_field text-lg w-2/3" rows="3" required></textarea>
                        <div class="w-1/3 flex flex-col gap-4">
                            <span
                                :class="{ 'green-button': stepOneProps.meeting_type === 'public', 'white-button': stepOneProps.meeting_type !== 'public' }"
                                class="w-full text-lg text-black flex items-center justify-center p-2 cursor-pointer"
                                @click="setMeetingType('public')">
                                >>public
                            </span>
                            <span
                                :class="{ 'green-button': stepOneProps.meeting_type === 'private', 'white-button': stepOneProps.meeting_type !== 'private' }"
                                class="w-full text-lg text-black flex items-center justify-center p-2 cursor-pointer"
                                @click="setMeetingType('private')">
                                >>private
                            </span>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <input v-model="stepOneProps.startD" type="date" class="input_field" required />
                        <input v-model="stepOneProps.startTime" type="time" class="input_field" required />
                    </div>
                    <div class="flex gap-4">
                        <input v-model="stepOneProps.duration" type="number" placeholder="Duration (in minutes)"
                            class="input_field" min="60" max="480" required />

                        <select v-model="stepOneProps.timezone" class="select_field" required>
                            <option value="" disabled>Select Timezone</option>
                            <option v-for="zone in timezones" :key="zone" :value="zone">{{ zone }}</option>
                        </select>
                    </div>

                    <div class="w-full flex items-center justify-between gap-4">
                        <button type="submit"
                            :disabled="stepOneProps.event_name == '' || stepOneProps.duration == '' || stepOneProps.description == '' || stepOneProps.timezone == '' || stepOneProps.startD == '' || stepOneProps.startTime == ''"
                            class="btn-create-cast w-1/2 p-2 text-lg text-black flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed">
                            >>Create
                        </button>
                        <button type="button" @click="closeModal"
                            class="cancel_btn_ w-1/2 p-2 text-lg bg-black text-red-500">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import CommonLoader from '../../../../common/CommonLoader.vue';
import moment from 'moment';

export default {
    name: "CreateDecastModal",
    components: {
        CommonLoader,
    },
    props: ['getCastList'],
    data() {
        return {
            loading: false,
            formData: new FormData(),
            stepOneProps: {
                mint_function_name: '',
                mintfnc_name_error: false,
                contract_address: '',
                contract_address_error: false,
                aib: '',
                aib_error: false,
                parameter: '',
                parameter_error: false,
                network: '',
                audienceAirdrop: true,
                give_vc: false,
                airdropType: 'NFTs',
                price: '',
                price_error: false,
                nft_description: '',
                nft_description_error: false,
                nft_image: '',
                data_token: false,
                nft_image_error: false,
                password_auth: false,
                auth_type: 'public',
                meeting_auth_error: false,
                send_otp: false,
                public_auth: false,
                public_otp: false,
                give_nft: false,
                public_stream_nfts: 'true',
                public_nft_flow: false,
                nft_t_ype: 'NFTs',
                nft_type: 'NFTs',
                generated_event_title: '',
                event_name: '',
                invalidTimeError: false,
                moderator_password: '',
                attendee_password: '',
                meeting_type: 'public',
                schedule_time: '',
                description: '',
                max_participant: 100,
                short_description: '',
                hide_users: false,
                event_name_error: false,
                moderator_password_error: false,
                attendee_password_error: false,
                viewer_password_error: false,
                description_error: false,
                description_length_error: false,
                schedule_time_error: false,
                meeting_type_error: false,
                event_name_length_error: false,
                start_now: false,
                startTime: '00:00',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timeZoneList: [],
                event_tag: ['videowiki'],
                startD: moment().format('YYYY-MM-DD'),
                is_decast: "True",
            },
            stepTwoProps: {
                BackImageURL: '',
                imageURL: '',
                primary_color: '#D7DF23',
                secondary_color: '',
                logo: '',
                back_image: '',
                cover_image: '',
                cover_image_error: false,
                back_image_error: false,
                banner_text: '',
                moderator_only_text: 'You are a Moderator, you can control who presents and participates in the live cast',
                guest_policy: '',
                welcome_text: '',
                showText: true,
                duration: '60',
                logout_url: 'https://decast.live/dashboard',
            },
            stepThreeProps: {
                vw_stream: false,
                vw_stream_url: [{ vw_stream: '' }, { urls: [] }],
                is_streaming: false,
                public_stream: true,
            },
            stepFourProps: {
                start_stop_recording: true,
                record: 'True',
                mute_on_start: true,
                end_when_no_moderator: true,
                allow_moderator_to_unmute_user: false,
                webcam_only_for_moderator: false,
                auto_start_recording: false,
                allow_start_stop_recording: false,
                disable_cam: false,
                disable_mic: false,
                lock_layout: true,
                lock_on_join: false,
                viewer_mode: false,
                viewer_password: false,
                listen_only_mode: true,
                webcam_enable: false,
                screen_sharing: true,
                restrict_participants: false,
                meeting_settings: false,
                checkBox: '',
            },
            timezones: [
                "UTC",
                "GMT",
                "EST",
                "CST",
                "PST",
                "IST",
                "AEST"
            ]
        };
    },
    mounted() {
        const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!this.timezones.includes(systemTimezone)) {
            this.timezones.push(systemTimezone);
        }
        this.stepOneProps.timezone = systemTimezone || this.timezones[0];
        // console.log('stepOneProps.timezone:', this.stepOneProps.timezone);
        // console.log('Updated timezones list:', this.timezones);
    },
    methods: {
        setMeetingType(type) {
            this.stepOneProps.meeting_type = type;
            this.stepOneProps.auth_type = type;
        },
        async submitCastForm() {
            this.loading = true;
            const formData = new FormData();

            if (this.stepOneProps.startTime) {
                this.stepOneProps.startTime = moment(this.stepOneProps.startTime, 'HH:mm').format('HH:mm:ss');
            }
            if (this.stepOneProps.startD && this.stepOneProps.startTime) {
                this.stepOneProps.schedule_time = moment(`${this.stepOneProps.startD} ${this.stepOneProps.startTime}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm:ss');
            } else {
                this.stepOneProps.schedule_time = null;
            }
            const convertBooleanFields = (props) => {
                this.loading = true;
                for (const key in props) {
                    const value = props[key];
                    if (value === true) {
                        formData.append(key, "True");
                    } else if (value === false) {
                        formData.append(key, "False");
                    }
                    else if (value === "" || value === null) {
                        formData.append(key, null);
                    }
                    else if (key === 'startTime' || key === 'schedule_time') {
                        formData.append(key, value);
                    }
                    else {
                        formData.append(key, value);
                    }
                }
            };
            convertBooleanFields(this.stepOneProps);
            convertBooleanFields(this.stepTwoProps);
            convertBooleanFields(this.stepThreeProps);
            convertBooleanFields(this.stepFourProps);
            try {
                this.loading = true;
                const res = await this.$store.dispatch('cast/submitForm', formData);
                this.$vs.notify({
                    title: 'Congrats!',
                    text: 'Cast created successfully',
                    color: 'success',
                });
                this.closeModal();
                this.loading = false;
                this.getCastList();
                // console.log(res);
            } catch (e) {
                this.loading = false;
                this.$vs.notify({
                    title: 'Error!',
                    text: 'Try again',
                    color: 'danger',
                });
                console.error(e);
            }
        },

        closeModal() {
            this.$emit('close');
        },
    },
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

.btn-create-cast {
    background: #22c55e;
    border: 1px solid #fff;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
}

.cancel_btn_ {
    border: 1px solid red;
    border-right: 2px solid red;
    border-bottom: 2px solid red;
}

.heading_basic_ {
    border-top: 2px dashed #fff;
    border-bottom: 2px dashed #fff;
    color: #22c55e;
}


.input_field,
.textarea_field,
.select_field {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #000;
}

.textarea_field {
    resize: none;
}

.green-button {
    background-color: #22c55e;
    color: white;
}

.white-button {
    background-color: white;
    color: black;
}
</style>