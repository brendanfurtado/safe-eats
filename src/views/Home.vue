<template>
  <div class="home">
    <h2>Safe Eats</h2>
    <p>
      Search for restaurants that accommodate your dietary restrictions
    </p>
    <SearchBar></SearchBar>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
  },

  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: "",
    };
  },
  methods: {
    ...mapActions(["updateLocationState"]),
  },
  //Check user location
  beforeMount() {
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    this.gettingLocation = true;
    //get position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.gettingLocation = false;
        this.location = position;
        //Update vuex module
        this.updateLocationState({ position });
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
};
</script>

<style scoped>
div {
  margin-top: 50px;
}
</style>
