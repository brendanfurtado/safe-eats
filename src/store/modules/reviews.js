import database from "../../firebase/firebaseInit";

const state = {
  reviews: [],
  restaurantProfile: [],
  shown: false,
};

const getters = {
  getRestaurantProfile: (state) => {
    return state.restaurantProfile;
  },
  getReviews: (state) => {
    return state.reviews;
  },
  isShown: (state) => {
    return state.shown;
  },
};

const actions = {
  fetchReviews({ commit }) {
    commit("setReviews", database);
  },
  fetchReviewsByID({ commit }, id) {
    commit("setReviewsByID", database, id);
  },
};

//Get review data from firebase database
const mutations = {
  setReviews: (state, db) => {
    if (state.shown === false) {
      db.collection("reviews")
        .orderBy("rating")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id, //firebase id
              restaurantID: doc.data().restaurantID,
              restaurantName: doc.data().restaurantName,
              restaurantLocation: doc.data().restaurantLocation,
              rating: doc.data().rating,
              reviewPost: doc.data().reviewPost,
            };
            state.reviews.push(data);
          });
          state.shown = true;
        });
    }
  },

  setReviewsByID: (state, db, id) => {
    db.collection("reviews")
      .orderBy(id)
      .get();
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
