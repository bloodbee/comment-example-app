import { createApp } from 'vue';

// Common for Commentary & Admin modules
import store from './Shared/store';
import './Shared/styles/index.css'
import router from './Shared/router';

// Main App
import App from './App.vue';

// Mount app
createApp(App).use(store).use(router).mount('#app');
