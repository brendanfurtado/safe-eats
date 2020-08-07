<template>
  <div>
    <div v-if="getRestaurants.length">
      <SearchBar @termChange="onTermChange"></SearchBar>
      <div
        v-if="getRestaurants && getRestaurants.length"
        class="restaurantList"
      >
        <v-container
          v-for="restaurant in this.restaurants"
          :key="restaurant.id"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              max-width="800"
              :elevation="hover ? 12 : 2"
              height="285"
              @click="viewProfile(restaurant.id, $event)"
            >
              <v-container>
                <v-row dense>
                  <v-col class="rows">
                    <v-card max-width="250" height="250">
                      <v-img
                        :src="restaurant.image_url"
                        class="white--text align-end"
                        height="250px"
                      >
                      </v-img>
                    </v-card>

                    <v-card-text class="description">
                      <v-row align="center">
                        <v-card-title class="font-weight-black"
                          ><router-link
                            v-bind:to="{
                              path: `/restaurants/view/${restaurant.id}`,
                              params: { restaurantID: restaurant.id },
                            }"
                          >
                            {{ restaurant.name }}
                          </router-link>
                        </v-card-title>
                      </v-row>

                      <v-row align="center" class="mx-0">
                        <v-rating
                          :value="restaurant.rating"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        ></v-rating>
                        <div class="ml-4">
                          {{ restaurant.rating }}
                        </div>
                      </v-row>

                      <v-spacer></v-spacer>

                      <v-card-text class="text--primary">
                        <div>{{ restaurant.location.city }}</div>

                        <div>{{ restaurant.location.address1 }}</div>
                      </v-card-text>

                      <v-row>
                        <v-card-actions>
                          <v-col cols="6">
                            <v-btn
                              @click="openYelp(restaurant.url)"
                              color="primary"
                              x-large
                              text
                            >
                              Yelp Page
                            </v-btn>
                          </v-col>
                          <v-spacer></v-spacer>

                          <v-col cols="6">
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
                          </v-col>
                        </v-card-actions>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
              <v-spacer></v-spacer>
            </v-card>
          </v-hover>
          <v-spacer></v-spacer>
        </v-container>
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

    viewProfile(ID) {
      this.$router.push({
        path: `/restaurants/view/${ID}`,
        params: { restaurantID: ID },
      });
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
/* .button-wrapper {
  background: #00e389;
} */

.rows {
  display: flex;

  flex-direction: row;
}
/* .description {
  margin-top: -25px;
} */
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
