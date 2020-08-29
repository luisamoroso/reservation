import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: () => import("../views/Reservation.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.customerForm) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: () => import("../views/Confirmation.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.state.confirmationPage) next({ name: "Home" });
      else next();
    },
  },
  {
    path: "/impressum",
    name: "Impressum",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Impressum.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
