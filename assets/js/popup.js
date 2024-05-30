import { createApp, h } from 'vue';
import store from './store/index.js';
import PopUp from './components/PopUp.vue';

const app = createApp({
  render: () => h(PopUp)
});

// Using the Vuex store
app.use(store);

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
  } else {
    alert("unable to find userdata, please login to decast.live to continue")
    window.open("https://decast.live", "_blank");
    console.error('Invalid response:', response);
  }
});
