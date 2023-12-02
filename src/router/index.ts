import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    redirect: { name: 'Categories' },
    children: [
      {
        path: "gallery",
        name: "Gallery",
        component: () => import("@/views/Gallery.vue")
      },
      {
        path: "categories",
        name: "Categories",
        component: () => import("@/views/categoriesSelection.vue")
      },
      {
        path: "category/:text",
        name: "Category",
        component: () => import("@/views/Category.vue")
      },
      {
        path: "creation/:text/:id?",
        name: "Creation",
        component: () => import("@/views/Creation.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
