import Vue, { createApp } from 'vue';
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

createApp(App).mount('#app')
