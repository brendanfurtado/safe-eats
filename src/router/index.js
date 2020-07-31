import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";
import Posts from "../views/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/post",
    name: "Posts",
    component: Posts,
  },
  {
    //Router for search results for now
    path: "/search/restaurants/results",
    alias: "/search/restaurants/",

    name: "SearchResults",
    component: SearchResults,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
