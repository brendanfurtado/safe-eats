<template>
  <div class="home">
    <h2>Safe Eats</h2>
    <p>
      Search for restaurants that accommodate your dietary restrictions
    </p>
    <SearchBar></SearchBar>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "Home",
  components: {
    SearchBar,
    TheFooter,
  },
};
</script>

<style scoped>
div {
  margin-top: 50px;
}
</style>
