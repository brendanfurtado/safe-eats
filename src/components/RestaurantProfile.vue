<template>
  <div class="container">
    <div v-if="this.restaurantID">
      <div v-if="loading && loadingReviews" class="loading">
        Loading...
      </div>
      <div v-else>
        <div>
          <h1>{{ profileData.name }}</h1>
        </div>
        <div>
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
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
        <v-container>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </v-container>

        <v-container>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </p>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RestaurantProfile",
  props: ["restaurantID"],

  computed: {
    ...mapGetters(["getProfile"]),
  },
  data() {
    return {
      loading: false,
      loadingReviews: false,

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
    restaurantID: function() {
      this.loading = true;
      this.loadingReviews = true;
      this.fetchData();
    },
  },

  methods: {
    ...mapActions(["fetchProfile"]),

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
  },
};
</script>

<style scoped>
/* .container {
  margin: 0 auto;
  float: left;
  max-width: 3000%;
} */
</style>
