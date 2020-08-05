import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/jeans/skinny",
    name: "Skinny Jeans",
    component: () =>
      import(/* webpackChunkName: "jeans" */ "../views/Jeans.vue")
  },
  {
    path: "/shop-cart",
    name: "Shopping Cart",
    component: () =>
      import(/* webpackChunkName: "shopCart" */ "../views/ShopCart.vue")
  },
  {
    path: "*",
    name: "Page Not Found",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/PageNotFound.vue")
  }
];

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
