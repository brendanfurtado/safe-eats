<template>
  <div>
    <div v-if="this.restaurantData.restaurantName !== null">
      <v-container>
        <h1>Review Form</h1>

        <h2>{{ restaurantData.restaurantName }}</h2>
        <h3>{{ restaurantData.restaurantLocation }}</h3>
      </v-container>
      <v-container>
        <v-form>
          <v-rating
            @input="addRating($event, rating)"
            required
            v-model="rating"
            :empty-icon="emptyIcon"
            :full-icon="fullIcon"
            :half-icon="halfIcon"
            :half-increments="halfIncrements"
            :hover="hover"
            :readonly="readonly"
          ></v-rating>
          <v-row justify="center">
            <v-col cols="10" md="5" sm="5">
              <v-textarea
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
      emptyIcon: "mdi-heart-outline",
      fullIcon: "mdi-heart",
      halfIcon: "mdi-heart-half-full",
      halfIncrements: true,
      readonly: false,
      rating: 0,
      post: null,

      hover: true,
      rules: [
        (value) => !!value || "Required.",
        (value) =>
          (value || "").length <= 2000 ||
          "Review must be 2000 characters or less",
      ],
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
  },
  computed: {
    ...mapGetters(["getRestaurants"]),
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
</style>
