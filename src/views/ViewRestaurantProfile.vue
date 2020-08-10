<template>
  <div>
    <SearchBar></SearchBar>
    <div v-if="loading && loadingReviews" class="loading">
      Loading...
    </div>
    <div v-else>
      <div>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
          touch
        >
          <v-carousel-item v-for="(photo, i) in profileData.photos" :key="i">
            <v-row align="center" justify="center">
              <v-img
                class="white--text align-end"
                height="auto"
                max-width="500"
                :src="profileData.photos[i]"
              >
              </v-img>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div>
        <h1>{{ profileData.name }}</h1>
        <h2>{{ profileData.location.address1 }}</h2>
      </div>

      <div v-if="this.reviews.length >= 1">
        <div v-for="review in this.reviews" :key="review.id">
          <h1>{{ review.reviewPost }}</h1>
          <h2>{{ review.rating }}</h2>
        </div>
      </div>
      <div v-else>
        <div>
          <h2>
            No Safe Eats Reviews Yet! <br />
            Be the first one:
          </h2>
        </div>
        <router-link
          v-bind:to="{
            path: `/write/review/${this.restaurantID}`,
            params: { restaurant_id: this.restaurantID },
          }"
        >
          <v-btn color="primary" x-large text>Write a Safety Review</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import { mapGetters, mapActions } from "vuex";
import SearchBar from "@/components/SearchBar.vue";

export default {
  //This file will call the vuex store that gets a restaurant profile based on ID
  name: "ViewRestaurantProfile",
  props: ["restaurantID"],
  computed: mapGetters(["getProfile", "getReviewsByID"]),
  components: {
    SearchBar,
  },

  data() {
    return {
      loading: false,
      loadingReviews: false,

      id: null,
      reviewPost: null,
      rating: null,

      profileData: [],
      reviews: [],
    };
  },

  created() {
    this.loading = true;
    this.loadingReviews = true;
    this.fetchData();
  },

  watch: {
    $route: "fetchData",
  },

  methods: {
    async fetchData() {
      //Get profile data
      await this.fetchProfile(this.restaurantID);
      this.profileData = this.getProfile;
      //Get all reviews for the given restaurant
      db.collection("reviews")
        .where("restaurantID", "==", this.restaurantID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              reviewPost: doc.data().reviewPost,
              rating: doc.data().rating,
            };
            this.reviews.push(data);
          });
        });
      this.loading = false;
      this.loadingReviews = false;
    },
    ...mapActions(["fetchProfile", "fetchReviewsByID"]),
  },
};
</script>

<style scoped>
/* div {
  margin-top: 50px;
} */
a {
  text-decoration: none;
}
</style>
