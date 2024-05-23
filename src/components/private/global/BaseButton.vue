<template>
  <button
      class="bg-black hover:shadow-lg hover:text-cyan-350 font-semibold text-white rounded-lg px-4 transition-all h-10"
      :disabled="disabled"
      @click="emit('click')">{{text}}<slot></slot>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  disabled?: {
    type: Boolean,
    default: false,
  },
  text: String,
}>()
const emit = defineEmits<{
  (event: 'click'): void,
}>()
</script>
