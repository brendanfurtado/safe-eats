<template>
  <div>
    <div v-if="getRestaurants.length">
      <SearchBar @termChange="onTermChange"></SearchBar>
      <div
        v-if="getRestaurants && getRestaurants.length"
        class="restaurantList"
      >
        <!-- <v-container>
          <v-row>
            <v-col cols="12">
              <v-card max-width="550" class="mx-auto">
                <v-card-title>
                  Title
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title class="headline"></v-card-title>

                    <v-card-subtitle>Text</v-card-subtitle>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img>
                      height="300"
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"</v-img
                    >
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->
        <v-card :loading="loading" class="mx-auto my-12" max-width="374" shaped>
          <v-img
            height="300"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>Cafe Badilico</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                4.5 (413)
              </div>
            </v-row>

            <div class="my-4 subtitle-1">
              $ • Italian, Cafe
            </div>

            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>
        </v-card>

        <v-card
          class="mx-auto"
          max-width="600"
          v-for="restaurant in this.restaurants"
          :key="restaurant.id"
        >
          <v-img
            class="white--text align-end"
            height="300px"
            :src="restaurant.image_url"
          >
            <v-card-title class="font-weight-black">{{
              restaurant.name
            }}</v-card-title>
          </v-img>

          <v-card-actions>
            <router-link
              v-bind:to="{
                path: `/restaurants/view/${restaurant.id}`,
                params: { restaurantID: restaurant.id },
              }"
            >
              <v-btn class="ma-2 button-wrapper" outlined color="grey"
                >View Details & Reviews
              </v-btn>
            </router-link>
          </v-card-actions>

          <v-card-subtitle class="pb-0"
            >Rating: {{ restaurant.rating }} stars</v-card-subtitle
          >

          <v-card-text class="text--primary">
            <div>{{ restaurant.location.city }}</div>

            <div>{{ restaurant.location.address1 }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              @click="openYelp(restaurant.url)"
              color="primary"
              x-large
              text
            >
              Yelp Page
            </v-btn>
            <v-spacer></v-spacer>
            <router-link
              v-bind:to="{
                path: `/write/review/${restaurant.id}`,
                params: { restaurant_id: restaurant.id },
              }"
            >
              <v-btn color="primary" x-large text>Write a Safety Review</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <!-- Redirect to home if nothing here -->

    <div v-else @mousemove="redirect">
      <h1>
        No Results Found
      </h1>
    </div>
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

    openYelp(searchUrl) {
      window.open(searchUrl);
    },

    redirect() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.button-wrapper {
  background: #00e389;
}

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
