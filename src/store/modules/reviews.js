import database from "../../firebase/firebaseInit";

const state = {
  reviews: [],
};

const getters = {
  getReviews: (state) => {
    return state.reviews;
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
          if (state.reviews) state.reviews.push(data);
        });
      });
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
