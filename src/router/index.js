import Vue from "vue";
import VueRouter from "vue-router";
//import firebase from "firebase";
import store from "../store/index.js";

import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user) {
      next({
        path: "/signin",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
