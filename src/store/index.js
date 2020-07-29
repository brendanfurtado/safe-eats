import Vue from "vue";
import Vuex from "vuex";
import location from "./modules/location";
import search from "./modules/search";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    location,
    search,
  },
});
