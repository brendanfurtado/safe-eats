<template>
  <div>
    <div v-if="this.profileData">
      <h1>{{ profileData.name }}</h1>
      <h2>{{ profileData.location.address1 }}</h2>
    </div>
    <div v-else>
      Loading...
    </div>
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
      profileData: [],
    };
  },
  beforeCreate() {
    this.profileData = [];
  },
  async created() {
    this.id = this.restaurantID;
    await this.fetchProfile(this.id);
    this.profileData = this.getProfile;
    console.log(this.profileData);
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
