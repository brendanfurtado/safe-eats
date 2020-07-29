import api from "../../api/yelp";

const state = {
  restaurants: [],
};

const getters = {
  getRestaurants: (state) => state.restaurants,
};

const actions = {
  async fetchRestaurants({ commit }, searchQuery) {
    const response = await api.getRestaurants(searchQuery);
    commit("setRestaurants", response.data);
  },
};

const mutations = {
  setRestaurants: (state, response) => {
    state.restaurants = response.businesses;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
