import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import location from "./modules/location";
import search from "./modules/search";
import reviews from "./modules/reviews";
import restaurantProfiles from "./modules/restaurantProfiles";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    location,
    search,
    reviews,
    restaurantProfiles,
  },
});
