import api from "../../api/yelp";

const state = {
  profile: [],
};

const getters = {
  getProfile: (state) => {
    return state.profile;
  },
};

const actions = {
  async fetchProfile({ commit }, restaurantID) {
    if (restaurantID !== null || restaurantID !== undefined) {
      const response = await api.getProfile(restaurantID);
      if (typeof response !== "undefined") {
        commit("setProfile", response.data);
      }
    }
  },
};

const mutations = {
  setProfile: (state, response) => {
    state.profile = response;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
