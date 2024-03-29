const state = {
  user: {
    isLoggedIn: false,
    data: null,
  },
};

const getters = {
  getUser: (state) => state.user,
};

const actions = {
  fetchUser({ commit }, user) {
    console.log("Logging In");
    console.log(state.user.data)
    commit("SET_LOGGED_IN", user !== null);

    if (user) {
      commit("SET_USER", {
        // displayName: user.displayName,
        email: user.email,
      });
    } else {
      commit("SET_USER", null);
    }
  },

  logoutUser({ commit }, user) {
    console.log("Logging out");
    commit("SET_LOGGED_IN", user === null);
    commit("SET_USER", {
      email: null,
    });
  },
};

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.user.isLoggedIn = value;
  },

  SET_USER(state, data) {
    state.user.data = data;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
