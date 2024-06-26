import { createApp, h } from 'vue';
import store from './store/index.js';
import PopUp from './components/PopUp.vue';
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css';
const app = createApp({
  render: () => h(PopUp)
});

app.use(store);
app.use(FloatingVue);
app.mount('#app');

// Sending message to background script to retrieve local storage data
chrome.runtime.sendMessage({ action: 'getLocalStorage' }, function(response) {
  if (chrome.runtime.lastError) {
    console.error('Error retrieving data:', chrome.runtime.lastError.message);
    return; 
  }

  // Checking if response is valid
  if (response && response.accessToken && response.userInfo) {
    const { accessToken, userInfo } = response;

    // Commiting a mutation to update the data in the Vuex store
    store.commit('setAccessToken', accessToken);
    store.commit('setUserInfo', userInfo);

    console.log('Data retrieved successfully:', response);
  } 
  else {
    console.error('Invalid response:', response);
  }
});
