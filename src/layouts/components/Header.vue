<script setup lang="ts">
import BaseDropdown from "@/components/private/global/dropdown/BaseDropdown.vue"
import {
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/vue/24/solid"
import {ref} from "vue"
import DropdownUser from "@/layouts/components/DropdownUser.vue";

const props = defineProps<{
  isOpen: Boolean
}>()

const emit = defineEmits<{
  (event: 'open'): void
}>()

const toggleSideBar = () => {
  emit('open')
}


</script>

<template>
  <nav class="w-full h-full bg-gray-400">
    <div
        class="h-[50px] bg-gray-100 flex justify-between items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b">
      <Bars3Icon
          v-if="!isOpen"
          class="w-7 cursor-pointer font-bold"
          @click="toggleSideBar"
      />
      <XCircleIcon
          v-else
          class="w-8 cursor-pointer font-bold"
          @click="toggleSideBar"
      />
      <div class="w-20 ml-auto">
        <DropdownUser/>
      </div>
    </div>
    <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px]">
      <div class="border border-gray-300 rounded-md p-[20px] h-full">
        <router-view></router-view>
      </div>
    </div>
  </nav>
  <!--    main-->
</template>

<style scoped>

</style>
