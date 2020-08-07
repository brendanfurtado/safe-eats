<template>
  <div>
    <div v-if="getRestaurants.length">
      <SearchBar @termChange="onTermChange"></SearchBar>
      <div
        v-if="getRestaurants && getRestaurants.length"
        class="restaurantList"
      >
        <v-container>
          <v-card max-width="1000" max-height="600">
            <v-container>
              <v-row dense>
                <v-col class="rows">
                  <v-card max-width="350">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                      class="white--text align-end"
                      :contain="true"
                    >
                    </v-img>
                  </v-card>
                  <v-card-text class="description">
                    <v-card-title>Cafe</v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>
                      <div class="text">asd</div>
                      <div>asd</div>
                      <div>asd</div>
                    </v-card-subtitle>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
            <v-spacer></v-spacer>
          </v-card>
        </v-container>

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

.rows {
  display: flex;

  flex-direction: row;
}
.description {
  margin-top: -25px;
}
/* div {
  margin-top: 50px;
} */
p {
  font-size: 25px;
}
a {
  text-decoration: none;
}
</style>
