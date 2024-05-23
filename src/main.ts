import './assets/main.css'

import {createApp} from 'vue'
import {useAuthStore} from "@/stores/auth.store"
import {createPinia} from 'pinia'
import {i18n} from './translation'
import DropdownMenu from 'v-dropdown-menu'
import useFetchDefault from './plugins/useFetch'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import "vue3-easy-data-table/dist/style.css"
import './index.css'
import main from './main.vue'
import router from './router'
import Notifications from 'notiwind'

const pinia = createPinia()
const app = createApp(main)

app.use(pinia)
app.component('EasyDataTable',Vue3EasyDataTable)

app.use(useFetchDefault, {
  authStore: useAuthStore(),
  router: router
})
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(Notifications);
app.use(i18n)
app.use(DropdownMenu)
app.mount('#app')
