<template>
  <div class="register">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="6">
          <v-card class="elevation-12" color="grey lighten-5">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="8" class="pt-6 pb-6">
                    <v-card-text>
                      <v-card-title class="text-center display-1 mb-10"
                        >Register</v-card-title
                      >
                      <v-spacer></v-spacer>
                      <v-form
                        @submit.prevent="register"
                        id="check-register-form"
                      >
                        <v-text-field
                          v-model="registerData.email"
                          id="email"
                          label="Email"
                          name="email"
                          prepend-icon="mdi-account"
                          type="text"
                        ></v-text-field>

                        <v-text-field
                          v-model="registerData.password"
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                        ></v-text-field>
                        <v-card-actions>
                          <v-col class="text-center">
                            <!-- v-on:click="register" -->

                            <v-btn
                              type="submit"
                              form="check-register-form"
                              color="grey"
                              >Register</v-btn
                            >
                          </v-col>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                    class="darken-2 vcenter"
                    :class="`${bgColor}`"
                  >
                    <div>
                      <v-card-text :class="`${fgColor}--text`">
                        <h1 class="text-center headline mb-3">
                          Already a User?
                        </h1>
                        <h5 class="text-center overline mb-3">
                          Login here!
                        </h5>
                      </v-card-text>
                      <div class="text-center mb-6">
                        <a
                          class="mt-3 overline no-text-decoration"
                          :class="`${fgColor}--text`"
                          @click="$router.push('/users/login')"
                        >
                          Sign In
                        </a>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      registerData: {
        email: null,
        password: null,
        token: null,
        isLoggedIn: false,
      },
    };
  },
  props: {
    bgColor: {
      type: String,
      default: "blue-grey",
    },
    fgColor: {
      type: String,
      default: "white",
    },
  },
  components: {},

  methods: {
    ...mapActions(["fetchUser"]),

    async register(event) {
      var loginDone = false;
      const homePath = `/`;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.registerData.email,
            this.registerData.password
          )
          .then(
            (user) => {
              //setting login parameters
              var object = {
                email: this.registerData.email,
                password: this.registerData.password,
              };
              this.fetchUser(object);
              alert(`Account created for ${user.user.email}`);
              loginDone = true;

              this.$router.go({ path: this.$router.path });
            },
            (err) => {
              alert(err.message);
              if (
                err.message ===
                "The email address is already in use by another account."
              ) {
                this.$router.push("/users/login");
              } else {
                this.$router.push("/");
                if (this.$router.path !== homePath)
                  this.$router.go({ path: homePath });
              }
            }
          );
      } catch (error) {
        alert(error.message);
      }

      if (loginDone) {
        this.$router.push("/");
        if (this.$router.path !== homePath) this.$router.go({ path: homePath });
      }

      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.register {
  padding-top: 25px;
}
</style>
