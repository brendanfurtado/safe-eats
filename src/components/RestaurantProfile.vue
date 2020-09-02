<template>
  <div class="container">
    <div v-if="this.restaurantID">
      {{ this.restaurantID }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RestaurantProfile",
  props: ["restaurantID"],

  computed: {
    ...mapGetters(["getProfile"]),
  },
  data() {
    return {
      loading: false,
      loadingReviews: false,

      profileData: [],
      reviews: [],
    };
  },

  methods: {
    ...mapActions(["fetchProfile"]),
  },

  created() {
    this.loading = true;
    this.loadingReviews = true;

    this.loading = false;
    this.loadingReviews = false;
  },
};
</script>

<style scoped></style>
