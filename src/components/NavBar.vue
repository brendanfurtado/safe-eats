<template>
  <div class="navbar">
    <v-app-bar flat app height="60" hide-on-scroll>
      <v-toolbar-title class="text-uppercase">
        <v-btn @click="$router.push('/')">Safe Eats</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title>
        <v-btn text @click="$router.push('/post')">Post a Review</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-btn text @click="$router.push('/about')">About</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-btn text right>
          <span>Sign In</span>
        </v-btn>
      </v-toolbar-title>

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
