import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";
import CreatePosts from "../views/CreatePosts.vue";
import ViewRestaurantProfile from "../views/ViewRestaurantProfile.vue";
import WriteReview from "../views/WriteReview.vue";
import Login from "../views/user/Login.vue";
import Register from "../views/user/Register.vue";

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
  },

  {
    path: "/register",
    props: true,

    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
