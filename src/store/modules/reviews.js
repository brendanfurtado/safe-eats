import database from "../../firebase/firebaseInit";

const state = {
  reviews: [],
  shown: false,
};

const getters = {
  getReviews: (state) => {
    return state.reviews;
  },
  isShown: (state) => {
    return state.shown;
  },
};

const actions = {
  fetchReviews({ commit }) {
    state.reviews = []; //Reinitialze review buffer
    commit("setReviews", database);
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
              restaurant_id: doc.data().restaurant_id,
              restaurant_name: doc.data().restaurant_name,
              location: doc.data().location,
              rating: doc.data().rating,
              post: doc.data().post,
            };
            state.reviews.push(data);
          });
          state.shown = true;
        });
    }
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
