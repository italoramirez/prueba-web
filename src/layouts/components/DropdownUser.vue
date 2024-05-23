<script setup lang="ts">
import {inject, onMounted, ref} from "vue"
import {useAuthStore} from "@/stores/auth.store"
import {LOGOUT_URL} from "@/constants/Authconstants"
import {useRouter} from "vue-router"


const useFetch = inject('useFetchDefault')


const router = useRouter()


const isOPen = ref(false)
const authStore = useAuthStore()
const selectOptions = ref<any>({value: null, text: 'Seleccione'})
const options = ref([
  {
    value: 'profile',
    text: 'Perfil',
    path: '/profile'
  },
  {
    value: 'logout',
    text: 'Salir',
    path: '/logout'
  }
])

const toggleDropdown = () => {
  isOPen.value = !isOPen.value
}

const getInitialName = () => {
  if (authStore.user?.name) {
    const [firstName, lastName] = authStore.user?.name?.split(' ');
    return `${firstName[0]}${lastName ? lastName[0] : ''}`;
  }
  return '';
}

const logout = async () => {
  try {
    const { response, data } = await useFetch(LOGOUT_URL).post()
    authStore.logout()
    setTimeout(() => {
      router.push({name: 'login'})
    }, 500)
    // if (response.status === 401) {
    //   console.log('logout')
    //   await router.push({name: 'login'})
    //   authStore.logout()
    // }
  } catch (error) {
    console.error(error)
  }
}

const selectOption = (option: { value: string, text: string }): void => {
  selectOptions.value = option
  isOPen.value = false
}
</script>

<template>
  <div class="relative" @click="toggleDropdown">
    <div class="avatar placeholder cursor-pointer">
      <div class="bg-neutral text-neutral-content rounded-full w-11">
        <span>{{ getInitialName() }}</span>
      </div>
    </div>

    <div
        v-if="isOPen"
        class="absolute right-10 z-[1000]"
    >
      <div class="flex items-center w-full justify-center">

        <div class="max-w-xs">
          <div class="bg-white shadow-xl rounded-lg py-3">
            <div class="p-2">
              <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{{ authStore?.user?.name }}</h3>
              <table class="text-xs my-3">
                <tbody><tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Dirección</td>
                  <td class="px-2 py-2">{{ authStore?.user?.address }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Teléfono</td>
                  <td class="px-2 py-2">{{ authStore?.user?.phone }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">{{ authStore?.user?.phone }}</td>
                </tr>
                </tbody></table>

              <div class="text-center my-3">
                <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="/user/profile">Ver perfil</a>
              </div>
              <div class="flex justify-center">
                <button class="text-sm" @click="logout">Salir</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
