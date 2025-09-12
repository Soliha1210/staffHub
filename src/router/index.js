import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from "../layout/DefaultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaultLayout',
      component: DefaultLayout,
      children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import ('@/views/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
        }
      },
      {
        path: '/employees',
        name: 'employees',
        component: () => import ('@/views/Employees.vue'),
        meta: {
          title: 'Employees',
        }
      },
      {
        path: '/documents',
        name: 'documents',
        component: () => import ('@/views/Documents.vue'),
        meta: {
          title: 'Documents',
        }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import ('@/views/Settings.vue'),
        meta: {
          title: 'Settings',
        }
      },
      
    ]
    },
  ],
})

export default router
