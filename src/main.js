import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {useVuelidate} from '@vuelidate/core'
import {loadFonts} from './plugins/webfontloader'
import store from "@/store/index";

loadFonts()

createApp(App)
    .use(router)
    .use(vuetify)
    .use(store)
    .provide('$vuelidate', useVuelidate())
    .mount('#app')
