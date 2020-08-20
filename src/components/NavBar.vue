<template>
  <div class="navbar">
    <v-app-bar flat app height="60" hide-on-scroll>
      <v-toolbar-title class="text-uppercase">
        <v-btn @click="$router.push('/')">Safe Eats</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title>
        <v-btn text @click="$router.push('/create/posts')"
          >Write a Safety Review</v-btn
        >
        <v-spacer></v-spacer>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-btn text @click="$router.push('/about')">About</v-btn>
        <v-spacer></v-spacer>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-btn text right @click="$router.push('/users/login')">
          <span>Login</span>
        </v-btn>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-btn text right @click="$router.push('/register')">
          <span>Register</span>
        </v-btn>
      </v-toolbar-title>

      <v-toolbar-title>
        <v-btn v-on:click="logout" text right>
          <span>Logout</span>
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "NavBar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/users/login");
        });
      console.log(this.isLoggedIn);
    },
  },
};
</script>

<style scoped>
#app > div > main > div > div.navbar > header {
  background-color: #f5f5f5;
}
</style>
