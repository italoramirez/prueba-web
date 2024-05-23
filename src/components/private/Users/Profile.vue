<script setup lang="ts">

import {useAuthStore} from "@/stores/auth.store";
import {inject, onMounted, ref} from "vue";
import {USER_URL} from "@/constants/UsersConstant"

const useFetch = inject('useFetchDefault')
const authStore = useAuthStore()
const profile = ref({})

const get = async () => {
  try {
    const {data, response} = await useFetch(`${USER_URL}/${authStore.user.id}`).json()
    if (response.value?.ok) {
      profile.value = data.value
      console.log(profile.value)
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await get()
})


</script>

<template>
  <div class="p-1">
    <h3 class="mb-6 | text-center text-black text-2xl">Perfil de usuarior</h3>
  </div>

  <div class="grid grid-row-12 md:grid-cols-4 content-center gap-4">
    <div>
      <label class="text-xl text-black mx-1">Nombre:</label>
      <span class="text-lg text-black mx-1">{{ profile?.name }} {{ profile?.last_name }}</span>
    </div>
    <div>
      <label class="text-xl text-black mx-1">Email:</label>
      <span class="text-lg text-black mx-1">{{ profile?.email }}</span>
    </div>
    <div>
      <label class="text-xl text-black mx-1">Dirección:</label>
      <span class="text-lg text-black mx-1">{{ profile?.address }}</span>
    </div>
    <div>
      <label class="text-xl text-black mx-1">Teléfono:</label>
      <span class="text-lg text-black mx-1">{{ profile?.phone }}</span>
    </div>
    <div>
      <label class="text-xl text-black mx-1">Dirección:</label>
      <span class="text-lg text-black mx-1">{{ profile?.department?.name }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>