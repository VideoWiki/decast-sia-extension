<!-- ContactSection.vue -->
<template>
    <div class="contact-section p-0 m-0">
      <!-- Header -->
      <div class="contact-header">
        <h2 class="text-xl font-bold text-white">//Contacts</h2>
        <p class="mt-1 text-gray-400 text-xs">
          //Ping your contacts for an instant call
        </p>
      </div>
  
      <!-- Search and Actions -->
      <div class="flex flex-col gap-2 mt-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="// Search email..."
            class="input-field w-full pl-8 text-sm"
            aria-label="Search contacts by email"
            @input="debouncedSearch"
          />
          <span class="absolute left-2 top-1/2 transform -translate-y-1/2">
            <img src="@/images/search.svg" alt="Search" class="w-4 h-4 opacity-50" />
          </span>
        </div>
        <div class="flex justify-between gap-2">
          <button @click="toggleFilter" class="btn-filter text-xs" aria-label="Toggle filter">
            <img src="@/images/filter.svg" alt="Filter" class="w-4 h-4" />
            Filter
          </button>
          <button @click="openTagDialog" class="btn-add text-xs" aria-label="Create new tag">
            <img src="@/images/tag.svg" alt="Tag" class="w-4 h-4" />
            Tag
          </button>
          <button @click="openContactDialog" class="btn-add text-xs" aria-label="Add new contact">
            <CreateButton />
            Add
          </button>
        </div>
      </div>
  
      <!-- Filter Section (Collapsible) -->
      <transition name="slide">
        <div v-if="showFilter" class="filter-section mt-2">
          <div class="flex flex-wrap gap-1">
            <button
              class="filter-chip"
              :class="{ 'filter-chip-active': selectedTags.length === 0 }"
              @click="selectTags([])"
            >
              All
            </button>
            <button
              v-for="tag in tags"
              :key="tag"
              class="filter-chip"
              :class="{ 'filter-chip-active': selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </transition>
  
      <!-- Contacts Table -->
      <div class="table-container mt-2">
        <table class="w-full text-white text-xs">
          <thead>
            <tr class="bg-gray-800 sticky top-0">
              <th
                class="px-2 py-1 text-left text-green-500 cursor-pointer"
                @click="sortBy('email')"
              >
                Email
                <span v-if="sortKey === 'email'">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
              </th>
              <th class="px-2 py-1 text-left text-green-500">Last Invited</th>
              <th class="px-2 py-1 text-center text-green-500">Call</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(contact, index) in filteredContacts"
              :key="index"
              class="border-b border-gray-700 hover:bg-gray-900 transition-colors"
            >
              <td class="px-2 py-1 truncate">{{ contact.email }}</td>
              <td class="px-2 py-1 text-[10px]">{{ contact.last_invited }}</td>
              <td class="px-2 py-1 text-center">
                <button
                  class="btn-call"
                  @click="callContact(contact.email)"
                >
                  <img src="@/images/phone.svg" alt="Call" class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Add Contact Modal -->
      <AddContactModal
        v-if="showContactDialog"
        :tags="tags"
        :is-loading="isLoading"
        @add-contact="handleAddContact"
        @upload-contacts="handleUploadContacts"
        @close="closeContactDialog"
      />
  
      <!-- Create Tag Modal -->
      <CreateTagModal
        v-if="showTagDialog"
        :existing-tags="tags"
        @create-tag="handleCreateTag"
        @close="closeTagDialog"
      />
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  import _ from 'lodash';
  import CreateButton from '../../../common/CreateButton.vue';
  import AddContactModal from './components/AddContactModal.vue';
  import CreateTagModal from './components/CreateTagModal.vue';
  
  export default {
    name: 'ContactSection',
    components: {
      CreateButton,
      AddContactModal,
      CreateTagModal,
    },
    data() {
      return {
        showContactDialog: false,
        showTagDialog: false,
        showFilter: false,
        searchQuery: '',
        selectedTags: [],
        isLoading: false,
        sortKey: 'email',
        sortOrder: 'asc',
        contactList: [
          {
            email: 'alice@decast.live',
            invite_count: 5,
            last_invited: '2025-04-25 14:30',
            tags: ['Friends', 'Colleagues'],
          },
          {
            email: 'bob@decast.live',
            invite_count: 2,
            last_invited: '2025-04-20 09:15',
            tags: ['Colleagues'],
          },
          {
            email: 'charlie@decast.live',
            invite_count: 8,
            last_invited: '2025-04-27 18:45',
            tags: ['Family', 'Friends'],
          },
          {
            email: 'anish.jha@decast.live',
            invite_count: 2,
            last_invited: '2025-04-27 18:45',
            tags: ['Clients'],
          },
        ],
        tags: ['Friends', 'Colleagues', 'Family', 'Clients'],
      };
    },
    computed: {
      filteredContacts() {
        let contacts = this.contactList;
  
        // Filter by search query
        if (this.searchQuery) {
          contacts = contacts.filter((contact) =>
            contact.email.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
  
        // Filter by selected tags
        if (this.selectedTags.length > 0) {
          contacts = contacts.filter((contact) =>
            this.selectedTags.every((tag) => contact.tags.includes(tag))
          );
        }
  
        // Sort contacts
        return [...contacts].sort((a, b) => {
          const valueA = a[this.sortKey];
          const valueB = b[this.sortKey];
          if (this.sortOrder === 'asc') {
            return valueA > valueB ? 1 : -1;
          } else {
            return valueA < valueB ? 1 : -1;
          }
        });
      },
    },
    mounted() {
      this.setupContextMenu();
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'open_popup') {
          this.openContactDialog();
        }
      });
    },
    methods: {
      debouncedSearch: _.debounce(function () {
        this.searchQuery = this.searchQuery.trim();
      }, 300),
      setupContextMenu() {
        if (chrome.contextMenus) {
          chrome.contextMenus.removeAll(() => {
            chrome.contextMenus.create({
              id: 'addContact',
              title: 'Add to Contacts',
              contexts: ['selection'],
            });
          });
          chrome.contextMenus.onClicked.addListener((info) => {
            if (info.menuItemId === 'addContact' && info.selectionText) {
              const email = info.selectionText.trim();
              if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                this.openContactDialog();
              } else {
                this.$vs.notify({
                  title: 'Error!',
                  text: 'Invalid email selected',
                  color: 'danger',
                });
              }
            }
          });
        }
      },
      openContactDialog() {
        this.showContactDialog = true;
      },
      closeContactDialog() {
        this.showContactDialog = false;
      },
      openTagDialog() {
        this.showTagDialog = true;
      },
      closeTagDialog() {
        this.showTagDialog = false;
      },
      toggleFilter() {
        this.showFilter = !this.showFilter;
      },
      toggleTag(tag) {
        if (this.selectedTags.includes(tag)) {
          this.selectedTags = this.selectedTags.filter((t) => t !== tag);
        } else {
          this.selectedTags.push(tag);
        }
        this.filterByTags();
      },
      selectTags(tags) {
        this.selectedTags = tags;
        this.filterByTags();
      },
      filterByTags() {
        this.$vs.notify({
          title: 'Filter Applied',
          text: this.selectedTags.length
            ? `Filtering by: ${this.selectedTags.join(', ')}`
            : 'Showing all contacts',
          color: 'success',
        });
      },
      handleAddContact(contact) {
        this.contactList.push({
          email: contact.email,
          invite_count: 0,
          last_invited: moment().format('YYYY-MM-DD HH:mm'),
          tags: contact.tags,
        });
        this.$vs.notify({
          title: 'Success!',
          text: 'Contact added',
          color: 'success',
        });
        this.closeContactDialog();
      },
      async handleUploadContacts(file) {
        if (!file) {
          this.$vs.notify({
            title: 'Error!',
            text: 'No file selected',
            color: 'danger',
          });
          return;
        }
        this.isLoading = true;
        setTimeout(() => {
          this.contactList.push({
            email: `bulk${this.contactList.length + 1}@decast.live`,
            invite_count: 0,
            last_invited: moment().format('YYYY-MM-DD HH:mm'),
            tags: ['Clients'],
          });
          this.$vs.notify({
            title: 'Success!',
            text: 'Contacts uploaded',
            color: 'success',
          });
          this.isLoading = false;
          this.closeContactDialog();
        }, 1000);
      },
      handleCreateTag(tag) {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
          this.$vs.notify({
            title: 'Success!',
            text: `Tag "${tag}" created`,
            color: 'success',
          });
        } else {
          this.$vs.notify({
            title: 'Error!',
            text: 'Tag already exists',
            color: 'danger',
          });
        }
        this.closeTagDialog();
      },
      callContact(email) {
        this.$vs.notify({
          title: 'Calling!',
          text: `Initiating call to ${email}`,
          color: 'success',
        });
      },
      sortBy(key) {
        if (this.sortKey === key) {
          this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = key;
          this.sortOrder = 'asc';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  * {
    font-family: 'JetBrains Mono', monospace;
  }
  
  .contact-section {
    background: #010101;
    width: 440px;
    max-height: 415px;
    overflow-y: hidden;
    color: #fff;
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
  }
  
  .input-field:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
  }
  
  .table-container {
    max-height: 250px;
    max-width: 450px;
    overflow-y: auto;
    border: 1px solid #374151;
    border-radius: 4px;
  }
  
  .table-container::-webkit-scrollbar {
    display: none;
  }
  
  .btn-filter,
  .btn-add,
  .btn-call {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 4px;
    line-height: 1.2;
  }
  
  .btn-filter {
    background: #1a1a1a;
    border: 1px solid #374151;
    color: #fff;
  }
  
  .btn-filter:hover {
    background: #22c55e;
    border-color: #22c55e;
    color: #000;
  }
  
  .btn-add {
    background: #22c55e;
    color: #000;
  }
  
  .btn-add:hover {
    background: #16a34a;
  }
  
  .btn-call {
    background: transparent;
    padding: 2px;
  }
  
  .btn-call:hover {
    background: rgba(34, 197, 94, 0.1);
  }
  
  .filter-section {
    background: #1a1a1a;
    padding: 8px;
    border-radius: 4px;
  }
  
  .filter-chip {
    padding: 4px 8px;
    background: #374151;
    color: #fff;
    border-radius: 12px;
    font-size: 10px;
    cursor: pointer;
  }
  
  .filter-chip:hover {
    background: #22c55e;
    color: #000;
  }
  
  .filter-chip-active {
    background: #22c55e;
    color: #000;
  }
  
  /* Transitions */
  .slide-enter-active,
  .slide-leave-active {
    transition: max-height 0.3s ease;
  }
  
  .slide-enter,
  .slide-leave-to {
    max-height: 0;
    overflow: hidden;
  }
  </style>