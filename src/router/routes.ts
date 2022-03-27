import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { transition: 'slide-left' }
      },
      {
        path: 'recipe/:key',
        component: () => import('pages/RecipePage.vue'),
        meta: { transition: 'slide-right' }
      }
    ]
  },
  // {
  //   path: '/recipe/',
  //   component: () => import('layouts/RecipeLayout.vue'),
  //   children: [
  //     {
  //       path: ':key',
  //       component: () => import('pages/RecipePage.vue')
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
