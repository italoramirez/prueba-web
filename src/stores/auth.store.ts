import { defineStore } from "pinia";
import {useLocalStorage} from "@vueuse/core"
import router from "@/router";
import { inject } from 'vue'



const useFetch = inject('useFetchDefault')


export const useAuthStore = defineStore('users', {
  state: () => ({
    user: useLocalStorage('auth/user',{}),
    token: useLocalStorage('auth/tk',null)
  }),
  actions: {
    async login(data: object, router: any) {
      try {
        this.setToken(data.value.token);
        this.setUser(data.value.user);
        await router.push('users')
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    setToken(token: any) {
      useLocalStorage('auth/tk',token)
      this.token = token
    },
    setUser(user: any) {
      useLocalStorage('auth/user',user)
      this.user = user
    },
    logout(){
      this.setUser(null)
      this.setToken(null)
    }
  },
  getters: {
    isAuthenticated(state): Boolean {
      return !!state.token?.length
    }
  }
})
