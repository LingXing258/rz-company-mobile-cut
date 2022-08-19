import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css'
import vant from 'vant'
import 'vant/lib/index.css';
import "default-passive-events";
import 'lib-flexible/flexible.js';
import './/style/app.scss'
import VueClipboard from 'vue-clipboard2'
createApp(App).use(router).use(router).use(vant).use(VueClipboard).mount('#app')
