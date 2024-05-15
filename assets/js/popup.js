window.__VUE_OPTIONS_API__ = true;
window.__VUE_PROD_DEVTOOLS__ = false; 
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

import { createApp, h  } from 'vue';
import PopUp from './components/PopUp.vue';

const app = createApp({
  render: () => h(PopUp)
});

app.mount('#app');
