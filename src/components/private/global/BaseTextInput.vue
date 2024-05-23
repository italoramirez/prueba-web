<script setup lang="ts">

import {useField} from "vee-validate"

const props = defineProps({
  name: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: ''
  },
})

// let value: any, errorMessage: any
// if (props.name) {
//   const field = useField(() => props.name, undefined, {
//     syncVModel: true,
//   })
//   value = field.value
//   errorMessage = field.errorMessage
// }
// import { useField } from 'vee-validate';

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});
</script>

<template>
  <label
      for="type"
      :class="labelClass"
  >
    {{ label }}
  </label>
  <input
      v-model="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="border border-gray-300 rounded-md bg-white w-full p-2 outline-none focus:border-gray-500 transition-all duration-300 mt-2"
      :class="`${{ 'base-text-input-error': errorMessage }} ${inputClass}`"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
  >
  <span class="text-red-500 text-xs mt-1 pl-2">{{ errorMessage }}</span>
</template>

<style scoped>
.base-text-input-error {
  @apply border-[#fd0b0be7] !important;
}

.base-text-input-error:focus {
  @apply border-[#fd0b0be7] !important;
}
</style>
