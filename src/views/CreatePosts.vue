<template>
  <div>
    <h1>Search the Restaurant to Review!</h1>

    <SearchBar></SearchBar>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
export default {
  name: "CreatePosts",
  components: {
    SearchBar,
  },
};
</script>

<style scoped>
div {
  margin-top: 50px;
}
</style>
