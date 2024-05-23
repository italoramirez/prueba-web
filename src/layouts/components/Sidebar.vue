<script setup lang="ts">

import {ref} from "vue"
import {
  HomeIcon,
  UserCircleIcon,
  UserIcon,
  EyeIcon,
  UserPlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookOpenIcon,
  PencilIcon
} from "@heroicons/vue/24/solid"
import Header from "@/layouts/components/Header.vue"
import {useAuthStore} from "@/stores/auth.store"
import Login from "@/components/public/auth/Login.vue";

const authStore = useAuthStore()
const isOpen = ref(false)


const menu = ref([
  {
    name: 'Usuarios',
    icon: UserCircleIcon,
    route: '',
    subMenu: [
      {
        name: 'Listado',
        route: '/users',
        icon: BookOpenIcon
      },
      {
        name: 'Perfil',
        route: '/user/profile',
        icon: PencilIcon
      }
    ]
  }
])
const showList = ref(ref(new Array(menu.value.length).fill(false)))

const toggleSideBar = () => {
  isOpen.value = !isOpen.value
}

const openList = (index: number) => {
  showList.value[index] = !showList.value[index]
}

const getInitialName = () => {
  if (authStore.user?.name) {
    const [firstName, lastName] = authStore.user.name.split(' ');
    return `${firstName[0]}${lastName ? lastName[0] : ''}`;
  }
  return '';
}

</script>

<template>
  <div
      class="flex | w-screen h-screen"
  >
    <!--  sidebar-->
    <aside
        v-show="isOpen"
        class="w-[350px] h-full | text-white bg-gray-300"
    >
      <div class="flex justify-center items-center | h-[50px] bg-primary-600">
        <div class="mx-auto">
          <h3 class="font-bold text-xl">Admin dashboard</h3>
        </div>
      </div>
      <div class="flex flex-row items-center bg-primary-900 py-3">
        <div class="avatar placeholder mx-3">
          <div class="bg-neutral text-neutral-content rounded-full w-10">
            <span>{{ getInitialName() }}</span>
          </div>
        </div>
        <p class="text-center text-sm">{{ authStore?.user?.email }}</p>
      </div>
      <div class="h-[calc(100vh-113px)] bg-primary-900 py-[20px]">
        <div class="flex flex-col justify-between h-full | px-[20px] space-y-[10px]">
          <div class="flex flex-col justify-between space-y-[10px]">
            <template
                v-for="(item, index) in menu"
                :key="index"
            >
              <router-link
                  :to="item?.route"
                  class="inline-flex w-full items-center | py-[10px] px-[10px] | text-sm hover:bg-white hover:text-black rounded"
                  :class="{'bg-gray-700': $route.path === item.route}"
                  @click="item.subMenu && item.subMenu.length > 0 ? openList(index) : null"
              >
                <component :is="item.icon" class="w-5 mx-2"/>
                <div class="text-left">
                  {{ item.name }}
                </div>
                <ChevronDownIcon
                    v-if="item.subMenu && showList[index]"
                    class="w-4 mx-2"
                />
                <ChevronUpIcon
                    v-if="item.subMenu && !showList[index]"
                    class="w-4 mx-2"
                />
              </router-link>
              <template v-if="!showList[index]">
                <ul
                    v-for="(subItem, i) in item.subMenu">
                  <router-link
                      :key="i"
                      :to="subItem.route"
                      :class="{'bg-gray-700': $route.path === subItem.route}"
                      class="inline-flex w-full items-end | py-[10px] px-[10px] | text-sm hover:bg-white hover:text-black rounded"
                  >
                    <Component :is="subItem.icon" class="w-5 mx-2"/>
                    <li class="text-center">{{ subItem.name }}</li>
                  </router-link>
                </ul>
              </template>
            </template>
          </div>
          <div class="h-[50px]">
            <router-link
                to="/configuration"
                class="inline-flex w-full items-center | py-[10px] px-[10px] | text-sm hover:bg-white hover:text-black rounded"
                :class="{'bg-gray-700': $route.path === '/configuration'}"
            >
              <EyeIcon class="w-5 mx-2"/>
              <div class="text-left">Configuración</div>
            </router-link>
          </div>
        </div>
      </div>
    </aside>
    <Header
        :isOpen="isOpen"
        @open="toggleSideBar"
    />
  </div>
</template>

<style scoped>

</style>
