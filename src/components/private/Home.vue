<script setup lang="ts">

import {useAuthStore} from "@/stores/auth.store"

const authStore = useAuthStore()

</script>

<template>
  <div class="flex justify-center | mb-5">
    <h1 class="text-black text-4xl">Bienvenido</h1>
  </div>
  <div class="flex justify-center">
    <p class="text-2xl">{{ authStore?.user?.name }} {{ authStore?.user?.last_name }}</p>
  </div>
</template>

<style scoped>

</style>