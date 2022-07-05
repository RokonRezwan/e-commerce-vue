import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Index.vue"),
  },

  {
    path: "/products",
    name: "Products",
    component: () => import("../views/products/Index.vue"),
  },

  {
    path: "/category/:id",
    name: "CategoryWiseProducts",
    component: () => import("../views/products/CategoryWiseProducts.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
  },

  {
    path: "/product/:id",
    name: "ProductDetails",
    component: () => import("../views/products/Details.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
  },

  {
    path: "/cart",
    name: "CartPage",
    component: () => import("../pages/CartPage.vue"),
  },

  {
    path: "/checkout",
    name: "Checkout",
    component: () => import('../pages/Checkout.vue'),
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/auth/Login.vue"),
  },

  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/auth/Register.vue"),
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
