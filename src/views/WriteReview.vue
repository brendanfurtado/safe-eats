<template>
  <div>
    <div v-if="this.restaurantData.restaurantName !== null">
      <v-container>
        <h1>Review Form</h1>

        <h2>{{ restaurantData.restaurantName }}</h2>
        <h3>{{ restaurantData.restaurantLocation }}</h3>
      </v-container>
      <v-container>
        <v-form @submit.prevent="submission">
          <h4>Rating (required)</h4>
          <v-rating
            @input="addRating($event, rating)"
            required
            :rules="starRules"
            v-model="rating"
            half-increments
            :hover="hover"
            :readonly="readonly"
          ></v-rating>
          <v-row justify="center">
            <v-col cols="10" md="5" sm="5">
              <v-textarea
                @input="addPost"
                v-model="post"
                clearable
                required
                counter
                :rules="rules"
                filled
                auto-grow
                label="Review Text"
                rows="8"
                row-height="40"
                shaped
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>

        <v-btn
          class="ma-2"
          color="primary"
          :loading="loading"
          :disabled="!isFormComplete"
          @click="loader = 'loading'"
          type="submit"
          >Submit Review</v-btn
        >
      </v-container>
    </div>
    <div v-else>
      <h1>Error in submitting form</h1>
    </div>
  </div>
</template>

<script>
// import database from "../firebase/firebaseInit";
import { mapGetters } from "vuex";

export default {
  name: "WriteReview",
  props: ["restaurant_id", "restaurant"],
  data() {
    return {
      readonly: false,
      rating: null,
      post: null,

      loader: null,
      loading: false,

      hover: true,
      rules: [
        (value) => !!value || "Required.",
        (value) =>
          (value || "").length <= 2000 ||
          "Review must be 2000 characters or less",
        (value) =>
          (value || "").length >= 15 || "Review must be 15 characters or more",
      ],
      starRules: [(rating) => !!rating || "Required."],

      restaurantID: null,
      restaurantData: {
        restaurantName: null,
        restaurantLocation: null,
        restaurant_id: null,
        rating: null,
        reviewPost: null,
      },
    };
  },

  methods: {
    addRating(value) {
      this.rating = value;
    },
    addPost(words) {
      this.post = words;
    },
  },
  computed: {
    ...mapGetters(["getRestaurants"]),
    isFormComplete() {
      return !this.isPostNull && this.rating !== null && this.post.length >= 15;
    },
    isPostNull() {
      return this.post === null || this.post === "";
    },
  },

  watch: {
    loader() {
      this.restaurantData.rating = this.rating;
      this.restaurantData.reviewPost = this.post;

      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 5000);

      this.loader = null;
    },
  },

  //When the review page is created check storage to get information
  //on the restaurant the user is reviewing
  async created() {
    this.restaurantID = this.restaurant_id;
    var restaurants = await this.getRestaurants;
    //Find the restaurant with the corresponding ID
    for (var i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id === this.restaurantID) {
        this.restaurantData.restaurantName = restaurants[i].name;
        this.restaurantData.restaurantLocation =
          restaurants[i].location.address1;
        break;
      }
    }
  },
};
</script>

<style scoped>
#app
  > div
  > main
  > div
  > div:nth-child(2)
  > div
  > div.container.container
  > form {
  align-content: center;
}

.centered-input input {
  text-align: center;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
</style>
