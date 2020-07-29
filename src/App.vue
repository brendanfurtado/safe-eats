<template>
  <v-app>
    <v-main>
      <NavBar></NavBar>
      <router-view />
      <TheFooter></TheFooter>
    </v-main>
  </v-app>
</template>

<script>
// import TheFooter from "@/components/TheFooter";
import NavBar from "@/components/NavBar";
import TheFooter from "@/components/TheFooter";

export default {
  components: { NavBar, TheFooter },
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
