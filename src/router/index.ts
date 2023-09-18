import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: 'gallery',
                name: 'Gallery',
                component: () => import('@/views/Gallery.vue')
            },
            {
                path: 'categories',
                name: 'Categories',
                component: () => import('@/views/categoriesSelection.vue')
            },
            {
                path: 'category',
                name: 'Category',
                component: () => import('@/views/Category.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
