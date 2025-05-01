<template>
    <div class="modal">
        <div v-if="loading" class="loader-overlay">
            <CommonLoader />
        </div>
        <div class="modal-content flex flex-col gap-6 justify-start items-center p-4">
            <div class="w-full flex flex-col gap-4">
                <label class="text-lg text-white font-bold">//cast.create</label>
                <form @submit.prevent="submitCastForm" class="flex flex-col gap-6">
                    <!-- Event Name -->
                    <input v-model="stepOneProps.event_name" type="text" placeholder="Cast Name" class="input-field"
                        required />

                    <!-- Description and Meeting Type -->
                    <div class="flex gap-4">
                        <textarea v-model="stepOneProps.description" placeholder="Description" class="textarea-field"
                            rows="3" required></textarea>
                        <div class="flex flex-col gap-2 w-1/3">
                            <button type="button"
                                :class="{ 'btn-active': stepOneProps.meeting_type === 'public', 'btn-inactive': stepOneProps.meeting_type !== 'public' }"
                                class="btn-toggle" @click="setMeetingType('public')">
                                >>public
                            </button>
                            <button type="button"
                                :class="{ 'btn-active': stepOneProps.meeting_type === 'private', 'btn-inactive': stepOneProps.meeting_type !== 'private' }"
                                class="btn-toggle" @click="setMeetingType('private')">
                                >>private
                            </button>
                        </div>
                    </div>

                    <!-- Storage Selection -->
                    <div class="flex flex-col gap-2">
                        <label class="text-white text-sm">//storage.type</label>
                        <div class="flex gap-4">
                            <button type="button"
                                :class="{ 'btn-active': storageType === 'centralized', 'btn-inactive': storageType !== 'centralized' }"
                                class="btn-toggle flex-1" @click="setStorageType('centralized')">
                                >>centralized
                            </button>
                            <button type="button"
                                :class="{ 'btn-active': storageType === 'decentralized', 'btn-inactive': storageType !== 'decentralized' }"
                                class="btn-toggle flex-1" @click="setStorageType('decentralized')">
                                >>decentralized
                            </button>
                        </div>

                        <div class="info text-white text-sm border border-green-500 p-2 mt-1">
                            <span class="text-green-500">//Note:</span> Centralized storage saves your recordings on Decast's cloud. Decentralized storage lets you
                            choose from a list of tamper-proof decentralized storage options.
                        </div>
                    </div>

                    <!-- Date and Time -->
                    <div class="flex gap-4">
                        <input v-model="stepOneProps.startD" type="date" class="input-field" :max="'2099-12-31'"
                            :min="minDate" required />
                        <input v-model="stepOneProps.startTime" type="time" class="input-field" required />
                    </div>

                    <!-- Duration and Timezone -->
                    <div class="flex gap-4">
                        <input v-model="stepOneProps.duration" type="number" placeholder="Duration (minutes)"
                            class="input-field" value="60" min="60" max="480" required />
                        <select v-model="stepOneProps.timezone" class="select-field" required>
                            <option value="" disabled>Select Timezone</option>
                            <option v-for="zone in timezones" :key="zone" :value="zone">{{ zone }}</option>
                        </select>
                    </div>

                    <!-- Form Actions -->
                    <div class="flex gap-4">
                        <button type="submit" :disabled="!isFormValid" class="btn-create w-1/2">
                            >>Create
                        </button>
                        <button type="button" @click="closeModal" class="btn-cancel w-1/2">
                            >>Cancel
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
    name: 'CreateCastModal',
    components: {
        CommonLoader,
    },
    props: ['getCastList', 'getDecastList'],
    data() {
        return {
            loading: false,
            minDate: moment().format('YYYY-MM-DD'),
            storageType: 'centralized',
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
                is_decast: "False",
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
                allow_start_stop_recording: true,
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
            timezones: ['UTC', 'GMT', 'EST', 'CST', 'PST', 'IST', 'AEST'],
        };
    },
    computed: {
        isFormValid() {
            return (
                this.stepOneProps.event_name &&
                this.stepOneProps.description &&
                this.stepOneProps.startD &&
                this.stepOneProps.startTime &&
                this.stepOneProps.duration &&
                this.stepOneProps.timezone &&
                this.storageType
            );
        },
    },
    mounted() {
        const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!this.timezones.includes(systemTimezone)) {
            this.timezones.push(systemTimezone);
        }
        this.stepOneProps.timezone = systemTimezone || this.timezones[0];
    },
    methods: {
        setMeetingType(type) {
            this.stepOneProps.meeting_type = type;
            this.stepOneProps.auth_type = type;
        },
        setStorageType(type) {
            this.storageType = type;
            this.stepOneProps.is_decast = type === 'decentralized';
        },
        async submitCastForm() {
            this.loading = true;
            const formData = new FormData();

            // Format time
            if (this.stepOneProps.startTime) {
                this.stepOneProps.startTime = moment(this.stepOneProps.startTime, 'HH:mm').format('HH:mm:ss');
            }
            if (this.stepOneProps.startD && this.stepOneProps.startTime) {
                this.stepOneProps.schedule_time = moment(
                    `${this.stepOneProps.startD} ${this.stepOneProps.startTime}`,
                    'YYYY-MM-DD HH:mm'
                ).format('YYYY-MM-DD HH:mm:ss');
            } else {
                this.stepOneProps.schedule_time = null;
            }

            // Convert boolean fields and append to formData
            const convertBooleanFields = (props) => {
                for (const key in props) {
                    const value = props[key];
                    if (value === true) {
                        formData.append(key, 'True');
                    } else if (value === false) {
                        formData.append(key, 'False');
                    } else if (value === '' || value === null) {
                        formData.append(key, '');
                    } else {
                        formData.append(key, value);
                    }
                }
            };

            convertBooleanFields(this.stepOneProps);
            convertBooleanFields(this.stepTwoProps);
            convertBooleanFields(this.stepThreeProps);
            convertBooleanFields(this.stepFourProps);

            try {
                await this.$store.dispatch('cast/submitForm', formData);
                this.$vs.notify({
                    title: 'Congrats!',
                    text: 'Cast created successfully',
                    color: 'success',
                });
                this.closeModal();
                this.getCastList();
                this.getDecastList();
            } catch (e) {
                this.$vs.notify({
                    title: 'Error!',
                    text: 'Try again',
                    color: 'danger',
                });
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
* {
    font-family: 'JetBrains Mono', monospace !important;
}

.modal {
    z-index: 100;
    position: absolute;
    background: #000;
    border: 1px solid #fff;
    color: #fff;
    width: 100%;
    height: 415px;
    left: 0;
    top: 0;
    overflow: hidden;
}

.basic_child_modal_ {
    height: 415px;
    overflow-y: scroll;
}

.modal-content {
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
}

.modal-content::-webkit-scrollbar {
    display: none;
}

.loader-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
}

.input-field,
.textarea-field,
.select-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #22c55e;
    background: #1a1a1a;
    color: #fff;
    font-size: 14px;
    transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus,
.select-field:focus {
    outline: none;
    border-color: #D7DF23;
}

.textarea-field {
    resize: none;
}

.btn-toggle {
    padding: 8px;
    border: 1px solid #22c55e;
    font-size: 14px;
    text-align: center;
    transition: all 0.3s;
}

.btn-active {
    background: #22c55e;
    color: #000;
    font-weight: bold;
}

.btn-inactive {
    background: #1a1a1a;
    color: #fff;
}

.btn-toggle:hover {
    background: #D7DF23;
    color: #000;
}

.btn-create {
    background: #22c55e;
    border: 2px solid #22c55e;
    color: #000;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
}

.btn-create:hover {
    background: #D7DF23;
    border-color: #D7DF23;
}

.btn-create:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-cancel {
    background: #1a1a1a;
    border: 2px solid #ff5555;
    color: #ff5555;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
}

.btn-cancel:hover {
    background: #ff5555;
    color: #000;
}
</style>