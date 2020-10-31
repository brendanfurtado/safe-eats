<template>
  <div class="home">
    <div class="header">
      <h1>Safe Eat</h1>
      <p>
        Search for restaurants that accommodate your dietary restrictions
      </p>
      <SearchBar></SearchBar>
    </div>
    <div v-if="getReviews" class="reviews">
      <h2>Featured Safe Eats Restaurants</h2>
      <v-card
        v-for="review in this.postedReviews"
        :key="review.id"
        class="mx-auto featured"
        max-width="600"
      >
        <v-card-title class="font-weight-black">
          {{ review.restaurantName }}
        </v-card-title>
        <p>{{ review.reviewPost }}</p>
        <div>
          <router-link
            v-bind:to="{
              path: `/restaurants/view/${review.restaurantID}`,
              params: { restaurantID: review.restaurantID },
            }"
          >
            <v-btn class="ma-2" outlined color="grey"
              >View Restaurant & Reviews
            </v-btn>
          </router-link>
        </div>
      </v-card>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import TheFooter from "@/components/TheFooter.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
    TheFooter,
  },
  data() {
    return {
      postedReviews: [],
    };
  },

  computed: mapGetters(["getReviews"]),

  methods: {
    ...mapActions(["fetchReviews"]),
  },
  beforeCreate() {
    sessionStorage.clear();
    this.postedReviews = [];
  },

  //Fetch reviews from the veux store which call firestore database
  created() {
    this.fetchReviews();
    this.postedReviews = this.getReviews; //Coming from modules/reviews
  },
  destroyed() {},
};
</script>

<style scoped>
/* div {
  margin-top: 50px;
} */

a {
  text-decoration: none;
}
.header {
  background-color: #add8e6;
  padding-top: 50px;
  padding-bottom: 100px;
}
.reviews {
  padding-top: 50px;
}
.featured {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
