<template>
  <v-app class="mainContainer">
    <div v-if="getRestaurants.length">
      <SearchBar @termChange="onTermChange"></SearchBar>

      <div
        v-if="getRestaurants && getRestaurants.length"
        class="restaurantList container scroll"
      >
        <v-container
          v-for="restaurant in this.restaurants"
          :key="restaurant.id"
          fluid
          lg12
        >
          <v-layout>
            <v-flex sm6 md6 lg12>
              <v-hover v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 6 : 2"
                  class="mx-auto"
                  max-width="100%"
                  max-height="285"
                  active-class="highlighted"
                  @click="viewProfile(restaurant.id, $event)"
                >
                  <v-container fluid>
                    <v-row dense>
                      <v-col>
                        <!-- <v-flex align-center> -->
                        <v-card max-width="250" max-height="250">
                          <v-img
                            :src="restaurant.image_url"
                            class="white--text justify-center image"
                            height="250"
                          >
                          </v-img>
                        </v-card>
                        <!-- </v-flex> -->
                      </v-col>

                      <v-col>
                        <v-row align="center" class="description">
                          <v-card-title class="font-weight-black">
                            <router-link
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

                        <v-row align="center" class="mx-0">
                          <v-card-text>
                            {{ restaurant.location.address1 }},
                            {{ restaurant.location.city }}
                          </v-card-text>
                          <v-card-text>
                            {{ restaurant.display_phone }}
                          </v-card-text>
                        </v-row>

                        <v-row>
                          <v-card-actions>
                            <v-col md6 lg12>
                              <v-btn
                                @click="openYelp(restaurant.url)"
                                color="primary"
                                xlarge
                                text
                              >
                                Yelp Page
                              </v-btn>
                            </v-col>
                            <v-col md6 lg12>
                              <router-link
                                v-bind:to="{
                                  path: `/write/review/${restaurant.id}`,
                                  params: { restaurant_id: restaurant.id },
                                }"
                              >
                                <v-btn color="primary" xlarge text
                                  >Write a Review</v-btn
                                >
                              </router-link>
                            </v-col>
                          </v-card-actions>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <!-- style="border: solid 2px red" -->
      <div class="profile">
        <v-container>
          <v-layout>
            <v-flex sm6 md6 lg12>
              <v-container fluid>
                <RestaurantProfile
                  :restaurantID="restaurantID"
                ></RestaurantProfile>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </div>

      <v-divider class="mx-4" vertical inset light></v-divider>
    </div>

    <!-- Redirect to home if nothing here -->

    <div v-else @mousemove="redirect">
      <h1>
        No Results Found
      </h1>
    </div>
  </v-app>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import RestaurantProfile from "../components/RestaurantProfile.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchResults",
  components: {
    SearchBar,
    RestaurantProfile,
  },
  data() {
    return {
      restaurants: [],
      restaurantID: null,
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
      this.restaurantID = ID;
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
a {
  text-decoration: none;
}
#app > div > div > div.restaurantList.container.scroll {
  max-width: 50%;
}
.rows {
  display: flex;
  flex-direction: row;
}
/* .container {
} */

.description {
  text-decoration-line: underline;
  overflow-y: auto;
  justify-content: left;
}

.scroll {
  float: left;

  overflow-y: auto;
  height: 680px;
  max-width: 50%;
}

.profile {
  /* max-width: 100%; */
  height: 680px;
  overflow-y: auto;
  overflow-x: scroll;
  /* overflow: hidden; */
}
</style>
