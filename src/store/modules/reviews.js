import database from "../../firebase/firebaseInit";
//TEMPORARY FILE PROBABLY DELETE LATER
const state = {
  reviews: [],
  reviewsByID: [],
  restaurantID: "",
  shown: false,
  shownReviews: false,
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
  fetchReviewsByID({ commit }, restaurantID) {
    state.restaurantID = restaurantID;
    commit("setReviewsByID", { database, restaurantID });
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

  setReviewsByID: (state, { database, restaurantID }) => {
    localStorage.setItem("database", database);
    localStorage.setItem("restaurantID", restaurantID);
    if (state.shownReviews === false) {
      database
        .collection("reviews")
        .where("restaurantID", "==", restaurantID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id, //firebase data id inside the store
              reviewPost: doc.data().reviewPost,
              rating: doc.data().rating,
            };

            state.reviewsByID.push(data);
          });
          state.shownReviews = true;
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
