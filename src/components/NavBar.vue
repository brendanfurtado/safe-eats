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

      <v-toolbar-title v-if="!isLoggedIn">
        <v-btn text right @click="$router.push('/users/login')">
          <span>Login</span>
        </v-btn>
      </v-toolbar-title>

      <!-- <v-toolbar-title>
        <v-btn text right @click="$router.push('/register')">
          <span>Register</span>
        </v-btn>
      </v-toolbar-title> -->

      <v-toolbar-title v-if="isLoggedIn">
        <v-btn v-on:click="logout" text right>
          <span>Logout</span>
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
    };
  },
  created() {
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.currentUser = user;
        vm.isLoggedIn = true;
      } else {
        vm.currentUser = null;
        vm.isLoggedIn = false;
      }
    });
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),

    logout() {
      //Set variables to non logged in status
      this.logoutUser(this.getUser.data.email);
      this.isLoggedIn = false;
      this.currentUser = null;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
#app > div > main > div > div.navbar > header {
  background-color: #f5f5f5;
}
</style>
