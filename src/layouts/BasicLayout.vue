<script setup lang="ts">
import Sidebar from "@/layouts/components/Sidebar.vue"
</script>

<template>
  <div class="flex max-h-screen bg-slate-100">
    <Sidebar class="flex-none"/>
    <div class="grow max-h-full overflow-hidden overflow-y-auto">
      <router-view/>
    </div>
  </div>
</template>
