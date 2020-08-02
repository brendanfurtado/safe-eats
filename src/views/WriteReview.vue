<template>
  <div>
    <div v-if="this.restaurantData.restaurantName !== null">
      <h1>Review Form</h1>
      <div>
        <h2>{{ restaurantData.restaurantName }}</h2>
        <h3>{{ restaurantData.restaurantLocation }}</h3>
      </div>
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
      restaurantID: null,
      restaurantData: {
        restaurantName: null,
        restaurantLocation: null,
      },
      rating: 0,
      post: null,
    };
  },
  computed: {
    ...mapGetters(["getRestaurants"]),
  },
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
div {
  margin-top: 50px;
}
</style>
