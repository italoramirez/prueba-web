<script setup lang="ts">

import BaseTextInput from "@/components/private/global/BaseTextInput.vue"
import DataTable from "@/components/private/global/DataTable.vue"
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowPathIcon
} from "@heroicons/vue/24/solid"
import {USERS_LIST} from "@/constants/UsersConstant"
import {inject, onMounted, provide, reactive, ref} from "vue";
import BaseSelectInput from "@/components/private/global/BaseSelectInput.vue";
import {DEPARTMENTS_URL} from "@/constants/DepartmensConstant";
import EditModal from "@/components/private/Users/EditModal.vue";

const useFetch = inject('useFetchDefault')

const dialogKey = ref(0)
const dialog = ref(false)
const table = ref(null)

const departmentOptions = ref([
  {
    id: 1,
    name: 'Marketing'
  },
  {
    id: 5,
    name: 'Ventas'
  },
  {
    id: 6,
    name: 'Recursos Humanos'
  },
  {
    id: 7,
    name: 'Desarrollo'
  },
  {
    id: 8,
    name: 'Finanzas'
  }
])

provide('departmentOptions', departmentOptions)

const getDepartments = async () => {
  try {
    const {response, data} = await useFetch(DEPARTMENTS_URL).json()
    if (response.value?.ok) {
      // departmentOptions.value = data
    }
  } catch (error) {
    console.error(error)
  }
}

const userSelected = reactive({
  id: null,
  name: '',
  phone: '',
  address: '',
  last_name: '',
  email: '',
  department_id: null
})

provide('userSelected', userSelected)

const closeModal = () => {
  for (const itemKey in userSelected) {
    userSelected[itemKey] = null
  }
  dialogKey.value += 1
  dialog.value = false
}

onMounted(async () => {
  await getDepartments()
})


const searchByName = ref({
  name: '',
  departmentId: null
})

const openModal = (item) => {
  for (const itemKey in userSelected) {
    userSelected[itemKey] = item[itemKey] || null
  }
  dialog.value = true
}

const headers = [
  {
    text: "Nombre",
    value: "name",
    alias: 'name'
  },
  {
    text: "Apellido",
    value: "last_name",
    alias: 'lastName'
  },
  {
    text: "Email",
    value: "email",
    alias: 'email'
  },
  {
    text: "Teléfono",
    value: "phone",
    alias: 'phone'
  },
  {
    text: "Departamento",
    value: "department.name",
    alias: 'department_id'
  },
  {
    text: "",
    value: "buttons",
    alias: ''
  },
]

const refresh = async () => {
  dialogKey.value += 1
  dialog.value = false
  refreshTable()
}

const clearSearch = () => {
  searchByName.value.name = ''
  searchByName.value.departmentId = null
}

const refreshTable = () => {
  table.value.getDataFromApi()
}



</script>

<template>
  <div class="flex space-x-4 py-5">
    <EditModal
        :key="dialogKey"
        :dialog="dialog"
        @close="closeModal"
        @save="refresh"
    />
    <div>
      <BaseTextInput
          v-model="searchByName.name"
          type="text"
          placeholder="Nombre"
          label="Nombre"
          :options="departmentOptions"
      />
    </div>
    <div class="mt-0">
      <div class="flex flex-col">
        <label class="ml-1">Departamento</label>
        <BaseSelectInput
            v-model="searchByName.departmentId"
            :options="departmentOptions"
            name="department"
            label-class="text-sm"
            input-class="text-sm bg-white"
            item-text="name"
            item-value="id"
        />
      </div>
    </div>
    <div class="flex flex-col px-1 justify-end mb-2.5">
      <a class="hover:cursor-pointer hover:bg-gray-400 text-gray-300 hover:text-black rounded-full w-8 h-8 flex justify-center items-center transition-all"
         :disabled="false"
         @click="clearSearch"
      >
        <ArrowPathIcon class="w-12 text-black" />
      </a>
    </div>
  </div>
  <DataTable
    :headers="headers"
    :url="`${USERS_LIST}/list`"
    table-class-name="border-none"
    header-class-name="text-grey-750 text-sm shadow-sm rounded"
    body-row-class-name="border-y text-grey-750"
    header-item-class-name="w-24 py-4 px-4 text-start text-xs"
    body-item-class-name="w-24 px-4 py-4"
    :search-value="searchByName"
    ref="table"
  >
    <template #loading>
      <div class="w-full flex justify-center">
            <span class="loading loading-spinner loading-lg text-gray-500">
            </span>
      </div>
    </template>
    <template #item-buttons="item">
      <div class="flex">
        <a class="text-gray-500 text-xl cursor-pointer mr-2">
          <PencilSquareIcon class="w-7" @click="openModal(item)" />
        </a>
        <a class="text-gray-500 text-xl cursor-pointer">
          <TrashIcon class="w-7" />
        </a>
      </div>
    </template>
  </DataTable>
</template>

<style scoped>

</style>
