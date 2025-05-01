<!-- AddContactModal.vue -->
<template>
    <transition name="dialog">
      <div class="dialog">
        <div class="dialog-content">
          <button class="dialog-close" @click="$emit('close')" aria-label="Close dialog">
            ×
          </button>
          <h3 class="text-sm font-bold text-green-500">// Add Contact</h3>
          <form @submit.prevent="addContact" class="flex flex-col gap-2 mt-2">
            <div>
              <label for="email" class="text-md text-gray-400">Email</label>
              <input
                id="email"
                v-model="newContact.email"
                type="email"
                placeholder="// example@gmail.com"
                class="input-field text-lg p-2 w-full"
                required
                @input="validateEmail"
              />
              <p v-if="emailError" class="text-red-500 text-[10px] mt-1">{{ emailError }}</p>
            </div>
            <div>
              <label for="tags" class="text-md text-gray-400">Tags</label>
              <div class="dropdown-container">
                <div
                  class="input-field dropdown-toggle"
                  @click="toggleDropdown"
                  @keydown.enter="toggleDropdown"
                  tabindex="0"
                  aria-label="Select tags"
                  role="combobox"
                  :aria-expanded="showDropdown"
                >
                  <span v-if="newContact.tags.length === 0" class="placeholder">
                    // Select tags...
                  </span>
                  <div class="selected-tags">
                    <span
                      v-for="tag in newContact.tags"
                      :key="tag"
                      class="tag-chip"
                    >
                      {{ tag }}
                      <button
                        class="remove-tag"
                        @click.stop="removeTag(tag)"
                        :aria-label="`Remove tag ${tag}`"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                  <span class="dropdown-arrow">▼</span>
                </div>
                <transition name="dropdown">
                  <div v-if="showDropdown" class="dropdown-menu">
                    <div
                      v-for="tag in tags"
                      :key="tag"
                      class="dropdown-item"
                      :class="{ selected: newContact.tags.includes(tag) }"
                      @click="toggleTag(tag)"
                      @keydown.enter="toggleTag(tag)"
                      tabindex="0"
                      role="option"
                      :aria-selected="newContact.tags.includes(tag)"
                    >
                      <span>{{ tag }}</span>
                      <span v-if="newContact.tags.includes(tag)" class="checkmark">✓</span>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
            <div class="flex gap-2">
              <button type="submit" class="btn-create text-xs" :disabled="!!emailError">
                Add
              </button>
              <button type="button" @click="$emit('close')" class="btn-cancel text-xs">
                Cancel
              </button>
            </div>
          </form>
          <div class="mt-4">
            <p class="text-xs text-gray-400">// Bulk upload</p>
            <input
              type="file"
              accept=".xlsx"
              @change="handleFileUpload"
              class="input-field text-sm mt-1"
            />
            <div class="flex gap-2 mt-2">
              <button
                @click="uploadContacts"
                class="btn-create text-xs"
                :disabled="!uploadedFile || isLoading"
              >
                {{ isLoading ? 'Uploading...' : 'Upload' }}
              </button>
              <button type="button" @click="$emit('close')" class="btn-cancel text-xs">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'AddContactModal',
    props: {
      tags: {
        type: Array,
        required: true,
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        newContact: {
          email: '',
          tags: [],
        },
        uploadedFile: null,
        emailError: '',
        showDropdown: false,
      };
    },
    methods: {
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.newContact.email) {
          this.emailError = 'Email required';
        } else if (!emailRegex.test(this.newContact.email)) {
          this.emailError = 'Invalid email';
        } else {
          this.emailError = '';
        }
      },
      addContact() {
        if (this.newContact.email && !this.emailError) {
          this.$emit('add-contact', { ...this.newContact });
          this.resetForm();
        } else {
          this.$vs.notify({
            title: 'Error!',
            text: 'Valid email required',
            color: 'danger',
          });
        }
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.uploadedFile = file;
        } else {
          this.$vs.notify({
            title: 'Error!',
            text: 'Upload valid XLSX',
            color: 'danger',
          });
        }
      },
      uploadContacts() {
        this.$emit('upload-contacts', this.uploadedFile);
        this.uploadedFile = null;
      },
      resetForm() {
        this.newContact = { email: '', tags: [] };
        this.emailError = '';
        this.showDropdown = false;
      },
      toggleDropdown() {
        console.log('Dropdown toggled');
        this.showDropdown = !this.showDropdown;
      },
      handleOutsideClick(event) {
        if (!this.$el.contains(event.target)) {
          this.showDropdown = false;
        }
      },
      toggleTag(tag) {
        if (this.newContact.tags.includes(tag)) {
          this.newContact.tags = this.newContact.tags.filter((t) => t !== tag);
        } else {
          this.newContact.tags.push(tag);
        }
      },
      removeTag(tag) {
        this.newContact.tags = this.newContact.tags.filter((t) => t !== tag);
      },
    },
    mounted() {
      // Close dropdown when clicking outside
      document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleOutsideClick);
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
    border-radius: 4px;
    width: 100%;
    max-width: 450px;
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
    font-size: 16px;
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
    border-radius: 4px;
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
    border-radius: 4px;
    font-size: 12px;
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
  
  /* Dropdown Styles */
  .dropdown-container {
    position: relative;
    margin-top: 4px;
  }
  
  .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 32px;
    padding: 6px;
    cursor: pointer;
    font-size: 12px;
  }
  
  .dropdown-toggle:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
  }
  
  .placeholder {
    color: #9ca3af;
  }
  
  .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .tag-chip {
    background: #22c55e;
    color: #000;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .remove-tag {
    background: none;
    border: none;
    color: #000;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
  }
  
  .remove-tag:hover {
    color: #ff5555;
  }
  
  .dropdown-arrow {
    color: #9ca3af;
    font-size: 10px;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #1a1a1a;
    border: 1px solid #374151;
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;
    z-index: 100;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .dropdown-item {
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
  }
  
  .dropdown-item:hover,
  .dropdown-item:focus {
    background: #22c55e;
    color: #000;
  }
  
  .dropdown-item.selected {
    background: #22c55e;
    color: #000;
  }
  
  .checkmark {
    color: #000;
    font-size: 12px;
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
  
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 0.2s, transform 0.2s;
  }
  
  .dropdown-enter,
  .dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>