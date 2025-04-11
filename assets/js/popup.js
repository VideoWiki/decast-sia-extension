import { createApp, h } from 'vue';
import store from './store/index.js';
import PopUp from './components/PopUp.vue';

import('floating-vue').then((FloatingVue) => {
  import('floating-vue/dist/style.css').then(() => {
    import('vuesax3').then((Vuesax) => {
      import('vuesax3/dist/vuesax.css').then(() => {
        const app = createApp({
          render: () => h(PopUp),
        });

        app.use(store);
        app.use(Vuesax.default);
        app.use(FloatingVue.default);
        app.mount('#app');

        chrome.runtime.sendMessage({ action: 'getLocalStorage' }, function (response) {
          if (chrome.runtime.lastError) {
            console.error('Error retrieving data:', chrome.runtime.lastError.message);
            return;
          }

          if (response && response.accessToken && response.userInfo) {
            const { accessToken, userInfo } = response;

            store.commit('setAccessToken', accessToken);
            store.commit('setUserInfo', userInfo);
          }
        });
      });
    });
  });
});