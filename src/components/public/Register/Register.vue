<script setup lang="ts">

import BaseButton from "@/components/private/global/BaseButton.vue"
import BaseTextInput from "@/components/private/global/BaseTextInput.vue"
import BaseSelectInput from "@/components/private/global/BaseSelectInput.vue"
import {reactive, ref} from "vue";
import {REGISTER_URL} from "@/constants/Authconstants";
import {useFetch} from "@vueuse/core";
import {notify} from "notiwind";
import {ALERT_TYPES} from "@/constants/AlertTypes"

const authStore = useAuthStore()
const router = useRouter()

import {useForm} from "vee-validate";
import * as yup from "yup";
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "vue-router";


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
//
interface initialState {
  id: null | number;
  name: string;
  last_name: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  department_id: null | number;
}

const model = reactive<initialState>({
  id: null,
  name: '',
  last_name: '',
  phone: '',
  address: '',
  email: '',
  password: '',
  department_id: null,
});
//
// const {handleSubmit} = useForm({
//   validationSchema: yup.object({
//     name: yup.string().required(),
//     last_name: yup.string().required(),
//     address: yup.string().required(),
//     email: yup.string().required(),
//     department_id: yup.number().required(),
//
//   }),
// })
//
// const onSubmit = handleSubmit(() => {
//   save()
// })
//
const save = async () => {
  try {
    const { response, data } = await useFetch(`${REGISTER_URL}`).post(model).json()
    if (response.value?.ok) {
      authStore.login(data , router)
      notify({
        group: "base",
        title: "Éxito",
        type: ALERT_TYPES.SUCCESS,
        text: "Proyecto creado exitosamente"
      }, 4000)
    }
  } catch (error) {
    if (error.response?.status === 404) {
      notify({
        group: "base",
        title: "Error",
        type: ALERT_TYPES.ERROR,
        text: "Usuario no encontrado"
      }, 4000)
    }
    console.error(error);
  }
}
</script>

<template>
  <div class="flex justify-center items-center h-full bg-[url('/Img/puzzle-login.jpg')]">
    <div class="card w-96 md:min-w-7xl bg-base-100 shadow-xl" data-theme="light">
      <div class="card-body">
        <form novalidate @submit.prevent="save">
          <div>
            <BaseTextInput
                v-model="model.name"
                type="text"
                placeholder="Nombre"
            />
            <BaseTextInput
                v-model="model.last_name"
                type="text"
                placeholder="Apellido"
            />
            <BaseTextInput
                v-model="model.phone"
                type="text"
                placeholder="Teléfono"
            />
            <BaseTextInput
                v-model="model.address"
                type="text"
                placeholder="Dirección"
            />
            <BaseTextInput
                v-model="model.password"
                type="password"
                placeholder="Contraseña"
            />
            <BaseTextInput
                v-model="model.email"
                type="email"
                placeholder="Email"
            />
            <BaseSelectInput
                v-model="model.department_id"
                type="text"
                placeholder="Selccione"
                :options="departmentOptions"
                item-value="id"
                item-text="name"
                input-class="bg-white mt-2 w-full border-gray-400"
            />
          </div>
          <div class="flex justify-end mt-3">
            <BaseButton type="submit">Registrarse</BaseButton>
          </div>
          <div class="flex">
            <a class="text-blue-600 text-xs" href="/login">Iniciar sesión</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>