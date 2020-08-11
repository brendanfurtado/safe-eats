import database from "../../firebase/firebaseInit";
const state = {
  reviews: [],
  emptyArray: [],
  restaurantID: "",
};

const getters = {
  getReviews: (state) => {
    return state.reviews;
  },
  getReviewsByID: (state) => {
    return state.reviewsByID;
  },
  isShown: (state) => {
    return state.shown;
  },
};

const actions = {
  fetchReviews({ commit }) {
    commit("setReviews", database);
  },
};

//Get review data from firebase database
const mutations = {
  setReviews: (state, db) => {
    state.reviews = [];
    db.collection("reviews")
      .orderBy("rating")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
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
        state.reviews.reverse();
      });
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
