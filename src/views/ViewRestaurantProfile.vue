<template>
  <div>
    <h1>Here is where current data & reviews for a restaurant!</h1>
  </div>
</template>

<script>
// import database from "../firebase/firebaseInit";
import { mapGetters, mapActions } from "vuex";

export default {
  //This file will call the vuex store that gets a restaurant profile based on ID
  name: "ViewRestaurantProfile",
  props: ["restaurantID"],
  computed: mapGetters(["getProfile"]),
  methods: {
    ...mapActions(["fetchProfile"]),
  },

  data() {
    return {
      id: null,
      profileData: null,
    };
  },
  async created() {
    this.id = this.restaurantID;
    await this.fetchProfile(this.id);
    this.profileData = this.getProfile;
  },

  // beforeRouteEnter(to, from, next) {
  //   // ...
  // },
};
</script>

<style scoped>
div {
  margin-top: 50px;
}
</style>
