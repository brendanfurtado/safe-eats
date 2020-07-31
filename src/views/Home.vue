<template>
  <div class="home">
    <h2>Safe Eats</h2>
    <p>
      Search for restaurants that accommodate your dietary restrictions
    </p>
    <SearchBar></SearchBar>

    <div v-if="this.reviews.length">
      <h2>Featured Reviews</h2>
      <v-card
        v-for="review in this.reviews"
        :key="review.id"
        class="mx-auto"
        max-width="600"
      >
        <v-card-title class="font-weight-black">
          {{ review.restaurant_name }}
        </v-card-title>
        <p>{{ review.post }}</p>
      </v-card>
    </div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import TheFooter from "@/components/TheFooter.vue";

import database from "../firebase/firebaseInit";
export default {
  name: "Home",
  components: {
    SearchBar,
    TheFooter,
  },
  data() {
    return {
      reviews: [],
    };
  },
  created() {
    database
      .collection("reviews")
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
          this.reviews.push(data);
        });
      });
  },
};
</script>

<style scoped>
div {
  margin-top: 50px;
}
</style>
