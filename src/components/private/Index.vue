<script setup lang="ts">

import Home from "@/components/private/Home.vue"

import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

let reloadKey = ref(0);

onBeforeMount(() => {
  const route = useRoute();
  route.meta.reloadKey = reloadKey;
})
</script>

<template>
  <Home :key="reloadKey" />
</template>

<style scoped>

</style>