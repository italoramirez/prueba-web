import {createRouter, createWebHistory} from 'vue-router'
import auth from '@/middleware/auth'
import {useAuthStore} from "@/stores/auth.store";
import middlewarePipeline from "@/middleware/middlewarePipeline";
import guest from "@/middleware/guest"

const router = createRouter({
  history: createWebHistory(/*import.meta.env.BASE_URL*/),
  routes: [
    {
      path: '/user/profile',
      name: 'edit',
      component: () => import('../components/private/Users/Profile.vue'),
      meta: {
        middleware: [
          auth
        ],
        layout: 'BasicLayout',
        title: 'Inicio'
      }
    },
    {
      path: '/register',
      name: 'register',
        component: () => import('../components/public/Register/Register.vue'),
        meta: {
            middleware: [
                guest
            ],
            layout: 'AppLayout',
            title: 'Registro'
        }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/public/auth/Login.vue'),
      meta: {
        middleware: [
          guest
        ],
        layout: 'AppLayout',
        title: 'Iniciar sesión'
      }
    },
    {
      path: '/users',
      name: 'users',
      meta: {
        middleware: [
          auth
        ],
        layout: 'BasicLayout',
        title: 'Usuarios'
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/components/private/Users/Index.vue'),
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
      meta: {
        middleware: [
          auth
        ],
        layout: 'AppLayout',
        title: 'not_found'
      }
    }
  ]
})

router.beforeEach(async (to, from, next): Promise<void> => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware: any = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store: useAuthStore()
  }
  // Actualizar el título de la página
  document.title = to.meta.title ? (`${to.meta.title}`) : ('Alcaldía Ibagué');

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
