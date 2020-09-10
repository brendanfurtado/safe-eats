<template>
  <div class="login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="6">
          <v-card class="elevation-12" color="blue lighten-5">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="8" class="pt-6 pb-6">
                    <v-card-text>
                      <v-card-title class="text-center display-1 mb-10"
                        >Login</v-card-title
                      >
                      <v-spacer></v-spacer>
                      <v-form @submit.prevent="login" id="check-login-form">
                        <v-text-field
                          v-model="loginData.email"
                          id="email"
                          label="Email"
                          name="email"
                          prepend-icon="mdi-account"
                          type="text"
                        ></v-text-field>

                        <v-text-field
                          v-model="loginData.password"
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                        ></v-text-field>
                        <div class="text-center">
                          <a
                            href="#"
                            class="mt-3 overline no-text-decoration"
                            :class="`${bgColor}--text`"
                            @click="step = 3"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <v-card-actions>
                          <v-col class="text-center">
                            <!-- v-on:click="login" -->
                            <v-btn
                              type="submit"
                              color="primary"
                              form="check-login-form"
                              >Login</v-btn
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
                        <h1 class="text-center headline mb-3">Not a User?</h1>
                        <h5 class="text-center overline mb-3">
                          Please Sign Up to continue
                        </h5>
                      </v-card-text>
                      <div class="text-center mb-6">
                        <a
                          class="mt-3 overline no-text-decoration"
                          :class="`${fgColor}--text`"
                          @click="$router.push('/register')"
                        >
                          Sign Up
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loginData: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  props: {
    bgColor: {
      type: String,
      default: "blue",
    },
    fgColor: {
      type: String,
      default: "white",
    },
  },
  components: {},
  methods: {
    ...mapActions(["fetchUser"]),

    async login(event) {
      var loginDone = false;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(
            this.loginData.email,
            this.loginData.password
          )
          .then(
            (user) => {
              this.fetchUser(this.loginData);
              alert(`You are logged in as ${user.user.email}`);
              loginDone = true;
            },
            (err) => {
              alert(err.message);
            }
          );
      } catch (error) {
        alert(error.message);
      }
      //Workaround of redirecting after a user logs in
      if (loginDone) {
        const homePath = `/`;
        this.$router.push("/");
        if (this.$router.path !== homePath) this.$router.go({ path: homePath });
      }
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.login {
  padding-top: 25px;
}
</style>
