const state = {
  location: null,
};

const actions = {
  updateLocationState({ commit }, location) {
    commit("setUserLocation", location);
  },
};

const getters = {
  getLocation: (state) => state.location,
};

const mutations = {
  setUserLocation: (state, location) => {
    state.location = location;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
