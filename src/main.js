import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import AmplifyVue from '@aws-amplify/ui-vue';


Amplify.configure(awsExports);

createApp(App).use(store).use(router).use(AmplifyVue).mount('#app')
