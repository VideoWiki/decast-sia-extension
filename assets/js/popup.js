import { createApp, h } from 'vue';
import store from './store/index.js';
import PopUp from './components/PopUp.vue';
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css';
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'
const app = createApp({
  render: () => h(PopUp)
});

app.use(store);
app.use(Vuesax);
app.use(FloatingVue);
app.mount('#app');

chrome.runtime.sendMessage({ action: 'getLocalStorage' }, function(response) {
  if (chrome.runtime.lastError) {
    console.error('Error retrieving data:', chrome.runtime.lastError.message);
    return; 
  }
  
  if (response && response.accessToken && response.userInfo) {
    const { accessToken, userInfo } = response;

    store.commit('setAccessToken', accessToken);
    store.commit('setUserInfo', userInfo);

    // console.log('Data retrieved successfully:', response);
  } 
  else {
    // console.error('Invalid response:', response);
  }
});



