<template>
  <div class="modal" v-if="castDetails">
    <div v-if="loading">
      <CommonLoader />
    </div>
    <div class="modal-content h-full flex flex-col gap-4 justify-start items-center pt-2">
      <div class="relative w-full flex justify-end">
        <span class="close text-xl font-bold text-red-500 text-center" @click="closeModal">X</span>
      </div>
      <div class="basic_child_modal_ flex flex-col gap-4 justify-start items-center w-full pl-4 pr-4 pb-4 text-left">
        <p class="heading_basic_ pt-2 pb-2 w-full text-left">
          >>Cast Options : Select the below actions
        </p>
        <div class="flex justify-center items-center">
          <div class="grid-container">
            <div class="grid-item" v-if="castDetails.nft_details_submitted" @click="basicAlert">
              Edit NFT/Token <br />Drop
            </div>
            <div class="grid-item" v-else @click="basicAlert">
              NFT/Token <br />Drop
            </div>

            <div v-if="castDetails.isNftGated" class="grid-item" @click="basicAlert">
              Edit NFT <br />Gating
            </div>
            <div v-else class="grid-item">
              NFT <br />Gating
            </div>

            <div class="grid-item" v-if="castDetails.cast_type === 'public' && !castDetails.isNftGated"
              @click="basicAlert">
              Custom <br />Cast Url
            </div>
            <div class="grid-item" @click="basicAlert">
              Manage <br />Audience
            </div>
            <div class="grid-item" @click="basicAlert">
              Live <br />Streaming
            </div>

            <div class="grid-item" @click="basicAlert">
              Reschedule <br />Cast
            </div>

            <div class="grid-item" @click="basicAlert">
              Edit Basic <br />Details
            </div>
            <div class="grid-item" @click="basicAlert">
              Edit Branding <br />Details
            </div>
            <div class="grid-item" @click="basicAlert">
              Edit Advanced <br />Details
            </div>
            <div class="grid-item danger-button" v-if="is_decast !== undefined" @click="basicAlert">
              Delete <br />Cast
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
  name: "MenuOptionsModal",
  props: ['closeModal', 'setActiveModal', 'castDetails', 'is_decast'],
  components: {
    CommonLoader,
  },
  mounted() {
    // console.log(this.is_decast,'fkk')
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
  grid-template-columns: repeat(3, 1fr);
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
