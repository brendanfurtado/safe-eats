<template>
  <div>
    <div v-if="getRestaurants.length">
      <SearchBar @termChange="onTermChange"></SearchBar>
      <div
        v-if="getRestaurants && getRestaurants.length"
        class="restaurantList"
      >
        <v-card v-for="restaurant in this.restaurants" :key="restaurant.id">
          <p>{{ restaurant.name }}</p>
          <p>{{ restaurant.location.address1 }}</p>
          <v-img
            position="center"
            contain
            :src="restaurant.image_url"
            :aspect-ratio="16 / 9"
          >
          </v-img>

          <a :href="restaurant.url">{{ restaurant.url }}</a>
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
      //   this.$router.push("/");
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
</style>
