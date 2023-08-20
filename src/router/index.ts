import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/callback",
      name: "callback",
      component: () => import("../views/Callback.vue"),
    },
    {
      path: "/user/toppage",
      name: "user_toppage",
      component: () => import("../views/UserPage.vue"),
    },
    {
      path: "/admin/toppage",
      name: "admin_toppage",
      component: () => import("../views/UserPage.vue"),
    },
    {
      path: "/sadmin/toppage",
      name: "sadmin_toppage",
      component: () => import("../views/UserPage.vue"),
    },
  ],
});

export default router;
