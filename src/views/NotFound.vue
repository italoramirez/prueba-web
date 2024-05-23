<script setup lang="ts">
import {useRouter} from "vue-router"

const router = useRouter()
</script>

<template>
  <div class="grid place-items-center h-screen">
    <div class="text-center">
      <h2 class="text-9xl font-bold bg-gradient-to-r from-blue-350 to-cyan-350 bg-clip-text text-transparent animate-gradient">404</h2>
      <p class="mb-10">{{ $t('cant_you_find_it') }}</p>
      <button @click="router.push({name: 'home'})"></button>
    </div>
  </div>
</template>

<style scoped>

</style>
