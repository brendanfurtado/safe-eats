<template>
  <div>
    <div v-if="getRestaurants.length">
      <SearchBar @termChange="onTermChange"></SearchBar>
      <div
        v-if="getRestaurants && getRestaurants.length"
        class="restaurantList"
      >
        <v-card v-for="restaurant in this.restaurants" :key="restaurant.id">
          <v-card class="mx-auto" max-width="600">
            <v-img
              class="white--text align-end"
              height="300px"
              :src="restaurant.image_url"
            >
              <v-card-title class="font-weight-black">{{
                restaurant.name
              }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"
              >Rating: {{ restaurant.rating }} stars</v-card-subtitle
            >

            <v-card-text class="text--primary">
              <div>{{ restaurant.location.city }}</div>

              <div>{{ restaurant.location.address1 }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" x-large text>
                <a :href="restaurant.url">Explore</a>
              </v-btn>
              <v-spacer></v-spacer>
              <router-link
                v-bind:to="{
                  path: `/write/review/${restaurant.id}`,
                  params: { restaurant_id: restaurant.id },
                }"
              >
                <v-btn color="primary" x-large text
                  >Write a Safety Review</v-btn
                >
              </router-link>
            </v-card-actions>
          </v-card>
        </v-card>
      </div>
    </div>
    <div v-else @mousemove="redirect">
      <h1>
        No Results Found
      </h1>
    </div>

    <!-- Redirect to home if nothing here -->
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchResults",
  components: {
    SearchBar,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  computed: {
    ...mapGetters(["getRestaurants"]),
  },
  async beforeMount() {
    this.restaurants = await this.getRestaurants;
  },
  methods: {
    async onTermChange() {
      this.restaurants = await this.getRestaurants;
    },

    redirect() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
div {
  margin-top: 50px;
}
p {
  font-size: 25px;
}
a {
  text-decoration: none;
}
</style>
