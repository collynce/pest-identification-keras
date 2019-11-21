import Vue from "vue";
import router from "vue-router";
//import Home from './views/Home.vue'
import User from "./components/dashboard/User.vue";
import Reports from "./components/dashboard/reports.vue";
import Admin from "./components/dashboard/admin.vue";
import Updates from "./components/dashboard/u.vue";
import New from "./components/dashboard/new.vue";
import Login from "./components/login/login.vue";
import Signup from "./components/login/signup.vue";
import log from "./components/login/sign.vue";
import Dashboard from "./components/Dashboard.vue";
import Uploads from "./components/upoads.vue";
//import iview from 'iview';
import Home from "@/components/Home.vue";
import goTo from "vuetify/lib/components/Vuetify/goTo";
//import { Upload } from 'element-ui';
import firebase from "firebase";

Vue.use(router);

let Router = new router({
  mode: "history",
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
      // meta: {
      //   requiresGuest: true
      // }
    },
    {
      path: "/log",
      name: "log",
      component: log,
      meta: {}
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
      // meta: {
      //   requiresGuest: true
      // }
    },
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      meta: {},
      children: [
        {
          path: "/reports",
          name: "Reports",
          component: Reports,
          meta: {}
        },
        {
          path: "/updates",
          name: "Updates",
          component: Updates,
          meta: {}
        },
        {
          path: "/new",
          name: "New",
          component: New,
          meta: {}
        }
      ]
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      // meta: {
      //   requiresAuth: true
      // },
      children: [
        {
          path: "/uploads",
          name: "upload",
          component: Uploads
          // meta: {
          //   requiresAuth: true
          // }
        },
        {
          path: "/user",
          name: "user",
          component: User
          // meta: {
          //   requiresAuth: true
          // }
        }
      ]
      // meta: {
      //   requiresAuth: true
      // }
    }
  ]
});
Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullpath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/user",
        query: {
          redirect: to.fullpath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default Router;
