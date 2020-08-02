<template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import TheFooter from "@/components/TheFooter";
import NavBar from "@/components/NavBar";
import { mapActions } from "vuex";

export default {
  components: { NavBar },
  name: "App",
  data() {
    return {
      location: null,
      gettingLocation: false,
      errorStr: "",
    };
  },
  methods: {
    ...mapActions(["updateLocationState"]),

    // actionsReload() {
    //   // sessionStorage.clear();
    // },
  },
  //Check user location
  beforeCreate() {
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
  // created() {
  //   window.addEventListener("unload", this.actionsReload);
  // },
  destroyed() {
    sessionStorage.clear();
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
