<template>
  <div class="Searchbar">
    <v-container>
      <v-form @submit.prevent="onInput" class="container">
        <!-- <v-container> -->
        <v-row>
          <v-col class="pa-2" outlined tile>
            <v-text-field
              v-model="formData.restaurantName"
              solo
              label="Search Term"
              hide-details="auto"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>

          <v-col class="pa-2" outlined tile>
            <v-text-field
              v-model="formData.restaurantLocation"
              solo
              label="Location"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- </v-container> -->
        <v-btn type="submit" class="btn">Submit</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchBar",

  data() {
    return {
      formData: {
        restaurantName: null,
        restaurantLocation: null,
      },
    };
  },

  computed: mapGetters(["getLocation"]),

  methods: {
    ...mapActions(["fetchRestaurants"]),

    async onInput(event) {
      //Convert into object
      var parsedobj = JSON.parse(JSON.stringify(this.formData));
      var location = this.getLocation.position;
      if (
        parsedobj.restaurantLocation === null ||
        parsedobj.restaurantLocation === ""
      ) {
        parsedobj.restaurantLocation = location.coords;
      }

      if (parsedobj.restaurantName === "") {
        parsedobj.restaurantName = null;
      }

      //Call API with input params
      await this.fetchRestaurants(parsedobj);

      //Search routes depending on search bar inputs and route
      if (
        this.$router.currentRoute.name === "Home" ||
        this.$router.currentRoute.name === "CreatePosts"
      ) {
        if (parsedobj.restaurantName === null) {
          this.$router.push({
            name: "SearchResults",
            params: { name: parsedobj.restaurantLocation },
          });
        } else {
          this.$router.push({
            name: "SearchResults",
            params: {
              name: {
                term: parsedobj.restaurantName,
                location: parsedobj.restaurantLocation,
              },
            },
          });
        }
      } else {
        //Means the user is in SearchResults view page already
        this.$emit("termChange", event.target.value);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* div {
  text-align: center;
  margin: 20px;
  justify-content: center;
} */
</style>
