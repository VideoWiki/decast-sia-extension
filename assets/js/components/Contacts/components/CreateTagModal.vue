<!-- CreateTagModal.vue -->
<template>
    <transition name="dialog">
      <div class="dialog">
        <div class="dialog-content">
          <button class="dialog-close text-4xl" @click="$emit('close')" aria-label="Close dialog">
            ×
          </button>
          <h3 class="text-sm font-bold text-green-500">//New Tag</h3>
          <form @submit.prevent="createTag" class="flex flex-col gap-2 mt-2">
            <div>
              <label for="tagName" class="text-lg text-gray-400">Tag Name</label>
              <input
                id="tagName"
                v-model="newTag"
                type="text"
                placeholder="// Tag name"
                class="input-field text-lg p-2 w-full"
                required
                @input="validateTag"
              />
              <p v-if="tagError" class="text-red-500 text-[10px] mt-1">{{ tagError }}</p>
            </div>
            <div class="flex gap-2">
              <button type="submit" class="btn-create text-xs" :disabled="!!tagError">
                Create
              </button>
              <button type="button" @click="$emit('close')" class="btn-cancel text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'CreateTagModal',
    props: {
      existingTags: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        newTag: '',
        tagError: '',
      };
    },
    methods: {
      validateTag() {
        if (!this.newTag) {
          this.tagError = 'Tag name required';
        } else if (this.existingTags.includes(this.newTag)) {
          this.tagError = 'Tag exists';
        } else {
          this.tagError = '';
        }
      },
      createTag() {
        if (this.newTag && !this.tagError) {
          this.$emit('create-tag', this.newTag);
          this.newTag = '';
          this.tagError = '';
        } else {
          this.$vs.notify({
            title: 'Error!',
            text: 'Unique tag name required',
            color: 'danger',
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .dialog {
    z-index: 99;
    position: absolute;
    background: #000;
    border: 1px solid #fff;
    color: #fff;
    width: 100%;
    height: 415px;
    left: 0;
    top: 0;
  }
  
  .dialog-content {
    background: #010101;
    padding: 12px;
    /* border-radius: 4px; */
    width: 450px;
    overflow-y: auto;
    position: relative;
  }
  
  .dialog-close {
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  
  .dialog-close:hover {
    color: #22c55e;
  }
  
  .text-green-500 {
    color: #22c55e;
  }
  
  .text-gray-400 {
    color: #9ca3af;
  }
  
  .input-field {
    padding: 6px;
    border: 1px solid #374151;
    background: #1a1a1a;
    color: #fff;
    /* border-radius: 4px; */
    font-size: 12px;
    transition: border-color 0.3s, box-shadow 0.3s;
    width: 100%;
  }
  
  .input-field:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
  }
  
  .btn-create,
  .btn-cancel {
    padding: 4px 8px;
    /* border-radius: 4px; */
    /* font-size: 12px; */
    font-weight: 600;
    transition: all 0.3s;
    line-height: 1.2;
  }
  
  .btn-create {
    background: #22c55e;
    color: #000;
  }
  
  .btn-create:hover {
    background: #16a34a;
  }
  
  .btn-create:disabled {
    background: #4b5563;
    cursor: not-allowed;
  }
  
  .btn-cancel {
    background: #1a1a1a;
    border: 1px solid #ff5555;
    color: #ff5555;
  }
  
  .btn-cancel:hover {
    background: #ff5555;
    color: #000;
  }
  
  /* Transitions */
  .dialog-enter-active,
  .dialog-leave-active {
    transition: opacity 0.2s;
  }
  
  .dialog-enter,
  .dialog-leave-to {
    opacity: 0;
  }
  
  .dialog-content {
    transition: transform 0.2s;
  }
  
  .dialog-enter .dialog-content,
  .dialog-leave-to .dialog-content {
    transform: translateY(-10px);
  }
  </style>