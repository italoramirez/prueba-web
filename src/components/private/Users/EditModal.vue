<script setup lang="ts">

import BaseModal from "@/components/private/global/BaseModal.vue"
import {useForm} from "vee-validate"
import * as yup from "yup"
import {inject, reactive, watch} from "vue";
import BaseTextInput from "@/components/private/global/BaseTextInput.vue";
import BaseSelectInput from "@/components/private/global/BaseSelectInput.vue";
import BaseButton from "@/components/private/global/BaseButton.vue";
import {ALERT_TYPES} from "@/constants/AlertTypes.ts"

import {USER_URL} from "@/constants/UsersConstant"
import {notify} from "notiwind";

const useFetch = inject('useFetchDefault')
const userSelected = inject('userSelected')
const departmentOptions = inject('departmentOptions')

defineProps<{
  dialog: Boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'save'): Object
}>()


const close = () => {
  emit('close')
}

const {handleSubmit} = useForm({
  validationSchema: yup.object({
    // name: yup.string().required(),
    // last_name: yup.string().required(),
    // address: yup.string().required(),
    // email: yup.string().required(),
    // phone: yup.string().required().matches(/^[0-9]+$/, 'El campo solo puede contener números'),
    // department_id: yup.number().required(),
  }),
})

interface initialState {
  id: null | number;
  name: string;
  last_name: string;
  phone: string;
  address: string;
  email: string;
  department_id: null | number;
}

const model = reactive<initialState>({
  id: null,
  name: '',
  last_name: '',
  phone: '',
  address: '',
  email: '',
  department_id: null,
})

const onSubmit = handleSubmit(() => {
  save()
})

const save = async () => {
  try {
    const {response} = await useFetch(`${USER_URL}/${model.id}`).put(model).json()
    if (response.value?.ok) {
      notify({
        group: "base",
        title: "Éxito",
        type: ALERT_TYPES.SUCCESS,
        text: "Proyecto creado exitosamente"
      }, 4000)
      emit('save')
      close()
    }
  } catch (error) {
    notify({
      group: "base",
      title: "Error",
      type: ALERT_TYPES.ERROR,
      text: "Error inesperado"
    }, 4000)
    console.error(error)
  }

}

watch(() => userSelected, () => {
  for (const itemKey in model) {
    model[itemKey] = userSelected[itemKey] || null
  }
}, {deep: true})
</script>

<template>
  <BaseModal
      title="Editar perfil"
      :dialog="dialog"
      classes="max-w-full md:w-[1000px] items-start"
      @close="close"
  >
    <template #content>
      <div class="bg-white md:rounded-xl w-full">
        <form
            @submit="onSubmit"
            class="flex flex-wrap gap-y-2"
        >
          <div class="flex flex-col w-full md:w-1/2 px-2">
            <BaseSelectInput
                v-model="model.department_id"
                input-class="bg-white"
                label="Departamentos"
                :name="'languageId'"
                :options="departmentOptions"
                item-text="name"
                item-value="id"
            />
          </div>
          <div class="flex flex-col w-full md:w-1/2 px-2">
            <BaseTextInput
                v-model="model.name"
                input-class="bg-white"
                label="Nombre"
                :name="'name'"
            />
          </div>
          <div class="flex flex-col w-full md:w-1/2 px-2">
            <BaseTextInput
                v-model="model.last_name"
                input-class="bg-white"
                label="Apellidos"
                :name="'lastName'"
            />
          </div>
          <div class="flex flex-col w-full md:w-1/2 px-2">
            <BaseTextInput
                v-model="model.address"
                input-class="bg-white"
                label="Dirección"
                :name="'address'"
            />
          </div>
          <div class="flex flex-col w-full md:w-1/2 px-2">
            <BaseTextInput
                v-model="model.phone"
                input-class="bg-white"
                label="Teléfono"
                :name="'phone'"
            />
          </div>
          <div class="w-full mt-10 flex justify-end">
            <BaseButton type="submit" text="Guardar"/>
          </div>
        </form>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>

</style>