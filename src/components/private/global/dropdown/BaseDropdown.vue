<script setup lang="ts">

import {computed, ref} from "vue"
import {
  ChevronDownIcon,
    ChevronUpIcon,
  XMarkIcon
} from "@heroicons/vue/24/solid"
import {useField} from "vee-validate";

const isOPen = ref<Boolean>(false)
const clearable = ref<Boolean>(false)

const props = defineProps<{
  textLabel?: string,
  name: string,
  options: Array<{ value: string, text: string }>
}>()

const selectOptions = ref<any>({value: null, text: 'Seleccione'})

const toggleDropdown = () => {
  isOPen.value = !isOPen.value
}

const clearSelection = () => {
  selectOptions.value = {value: null, text: 'Seleccione'}
  clearable.value = true
}

const selectOption = (option: { value: string, text: string }): void => {
  selectOptions.value = option
  isOPen.value = true
}

const { value, errorMessage } = useField(() => props.name, undefined, {
  syncVModel: true,
});

</script>

<template>
  <div class="relative" @click="toggleDropdown">
    <label v-if="textLabel">{{ textLabel }}</label>
    <div
        class="flex flex-row justify-between bg-white text-gray px-4 rounded border border-gray-200 py-2 focus:outline-8 mt-2"
        :name="name"
    >
      <p class="text-gray-400 font-light">
        {{ selectOptions.text }}
      </p>
      <div>
        <XMarkIcon
            v-if="selectOptions.value"
            class="w-7 cursor-pointer"
            @click="clearSelection"
        />
        <ChevronUpIcon v-else-if="isOPen" class="w-7" />
        <ChevronDownIcon v-else  class="w-7" />
      </div>
    </div>
    <div v-if="isOPen" class="absolute w-full top-full mt-2 bg-white border border-gray-300 rounded shadow-lg">
      <ul class="py-0">
        <li
            v-for="(option, index) in options"
            :key="index"
            @click="selectOption(option)"
        >
          <a
              class="block px-4 py-2 text-gray-800 hover:bg-blue-100"
              :class="{'bg-blue-100': selectOptions.value === option.value, 'pt-0': index === 0, 'pb-0': index === options.length - 1}"
          >
            {{ option.text }}
          </a>
        </li>
      </ul>
    </div>
    <span class="text-[#fd0b0be7] text-xs mt-1">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>

</style>
