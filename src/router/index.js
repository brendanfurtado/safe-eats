import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";
import CreatePosts from "../views/CreatePosts.vue";
import ViewRestaurantProfile from "../views/ViewRestaurantProfile.vue";
import WriteReview from "../views/WriteReview.vue";
import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";

import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/create/posts",
    name: "CreatePosts",
    component: CreatePosts,

    //to protect against non logged in users
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/restaurants/view/:restaurantID",
    name: "ViewRestaurantProfile",
    props: true,
    component: ViewRestaurantProfile,
  },
  {
    path: "/write/review/:restaurant_id",
    name: "write-review",
    props: true,
    component: WriteReview,

    //to protect against non logged in users
    meta: {
      requiresAuth: true,
    },
  },
  {
    //Router for search results for now
    path: "/search/restaurants/results",
    alias: "/search/restaurants/",
    props: true,

    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/users/login",
    props: true,

    name: "Login",
    component: Login,

    //to protect against logged in users
    meta: {
      requiresGuest: true,
    },
  },

  {
    path: "/register",
    props: true,

    name: "Register",
    component: Register,

    //to protect against logged in users
    meta: {
      requiresGuest: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//Nav Guards
router.beforeEach((to, from, next) => {
  //Check for requiredAuth guard
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Check if not logged in
    if (!firebase.auth().currentUser) {
      //go to login
      next({
        path: "/users/login", //redirect to this path
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      //There is a user logged in so proceed
      //Proceed to route
      next();
    }
  }
  //Check for requiredGuest guard
  else if (to.matched.some((record) => record.meta.requiresGuest)) {
    //Check if logged in
    if (firebase.auth().currentUser) {
      //go to login
      next({
        path: "/", //redirect to this path
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      //There is a user logged in so proceed
      //Proceed to route
      next();
    }
  } else {
    next(); //Proceed to  route
  }
});

export default router;
