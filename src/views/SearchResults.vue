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
        >
          <v-hover v-slot:default="{ hover }">
            <!-- max-width="100%"
              min-width="50%" -->
            <v-card
              :elevation="hover ? 6 : 2"
              class="mx-auto"
              max-height="285"
              active-class="highlighted"
              @click="viewProfile(restaurant.id, $event)"
            >
              <v-container fluid>
                <v-row dense>
                  <v-col class="rows">
                    <v-card max-width="250" max-height="250">
                      <v-img
                        :src="restaurant.image_url"
                        class="white--text justify-center image mx-auto"
                        height="250"
                      >
                      </v-img>
                    </v-card>

                    <v-card-text>
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

                      <v-spacer></v-spacer>

                      <v-card-text class="text-primary">
                        <div>
                          {{ restaurant.location.address1 }},
                          {{ restaurant.location.city }}
                        </div>

                        <div>
                          {{ restaurant.display_phone }}
                        </div>
                      </v-card-text>

                      <v-row>
                        <v-col cols="6">
                          <v-btn
                            @click="openYelp(restaurant.url)"
                            color="primary"
                            medium
                            text
                          >
                            Yelp Page
                          </v-btn>
                        </v-col>
                        <!-- <v-spacer></v-spacer> -->
                        <v-col cols="6">
                          <router-link
                            v-bind:to="{
                              path: `/write/review/${restaurant.id}`,
                              params: { restaurant_id: restaurant.id },
                            }"
                          >
                            <v-btn color="primary" medium text
                              >Write a Review</v-btn
                            >
                          </router-link>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-hover>
        </v-container>
      </div>
      <!-- style="border: solid 2px red" -->
      <div class="profile">
        <v-container>
          <!-- <v-layout> -->
          <v-flex lg12>
            <v-container fluid>
              <RestaurantProfile
                :restaurantID="restaurantID"
              ></RestaurantProfile>
            </v-container>
          </v-flex>
          <!-- </v-layout> -->
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
  max-width: 45%;
}
.rows {
  display: flex;
  flex-direction: row;
}

.description {
  text-decoration-line: underline;
  /* overflow-y: auto; */
  /* justify-content: left; */
}

.scroll {
  float: left;
  overflow-x: scroll;
  overflow-y: auto;
  height: 680px;
}

.profile {
  /* max-width: 100%; */
  height: 680px;
  overflow-y: scroll;
  /* overflow-x: scroll; */
  /* overflow: hidden; */
}
/* .mainContainer {
  height: 100%;
} */
</style>
