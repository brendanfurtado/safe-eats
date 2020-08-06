<template>
  <div class="home">
    <h2>Safe Eats</h2>
    <p>
      Search for restaurants that accommodate your dietary restrictions
    </p>
    <SearchBar></SearchBar>

    <div v-if="getReviews">
      <h2>Featured Safe Eats Restaurants</h2>
      <v-card
        v-for="review in this.postedReviews"
        :key="review.id"
        class="mx-auto"
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
div {
  margin-top: 50px;
}
a {
  text-decoration: none;
}
</style>
