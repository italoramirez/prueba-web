<script setup lang="ts">
import {reactive, ref} from "vue"
import {useAuthStore} from "@/stores/auth.store"
import {useRouter} from "vue-router"
import BaseTextInput from "@/components/private/global/BaseTextInput.vue"
import {LOGIN_URL} from "@/constants/Authconstants"
import { inject } from 'vue'
import BaseButton from "@/components/private/global/BaseButton.vue"
import {notify} from "notiwind";
import {ALERT_TYPES} from "@/constants/AlertTypes"

const useFetch = inject('useFetchDefault')

const model = reactive({
  email: '',
  password: ''
})

const email = ref('');
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const submit = async () => {
  try {
    const { response, data } = await useFetch(`${LOGIN_URL}`).post(model).json()
    if (response.value.ok) {
      authStore.login(data , router)
    }
  } catch (error) {
    if (error.response?.status === 404) {
      notify({
        group: "base",
        title: "Error",
        type: ALERT_TYPES.ERROR,
        text: "Usuario no encontrado"
      }, 4000)
    }
    console.warn(error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-full bg-[url('/Img/puzzle-login.jpg')]">
    <div class="card w-96 bg-base-100 shadow-xl" data-theme="light">
      <div class="card-body">
        <form novalidate @submit.prevent="submit">
          <div>
            <BaseTextInput
                v-model="model.email"
                type="email"
                placeholder="Email"
            />
            <BaseTextInput
                v-model="model.password"
                type="password"
                placeholder="Password"
            />
          </div>
          <div class="flex justify-end mt-3">
            <BaseButton type="submit">Login</BaseButton>
          </div>
          <div class="flex">
            <a class="text-blue-600 text-xs" href="/register">Registrarse</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
