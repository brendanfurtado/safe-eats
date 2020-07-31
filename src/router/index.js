import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SearchResults from "../views/SearchResults.vue";
import CreatePosts from "../views/CreatePosts.vue";
import ViewPosts from "../views/ViewPosts.vue";
import WriteReview from "../views/WriteReview.vue";

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
    path: "/create/posts",
    name: "CreatePosts",
    component: CreatePosts,
  },
  {
    path: "/:post_id",
    name: "view-posts",
    component: ViewPosts,
  },
  {
    path: "/write/review/:restaurant_id",
    name: "write-review",
    component: WriteReview,
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
