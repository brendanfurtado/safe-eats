<template>
  <div class="register">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="6">
          <v-card class="elevation-12" color="red lighten-5">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="8" class="pt-6 pb-6">
                    <v-card-text>
                      <v-card-title class="text-center display-1 mb-10"
                        >Register</v-card-title
                      >
                      <v-spacer></v-spacer>
                      <v-form @submit.prevent="register">
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
                            <v-btn type="submit" color="red">Register</v-btn>
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
                        <v-btn
                          dark
                          outlined
                          @click="$router.push('/users/login')"
                          >Sign In</v-btn
                        >
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
// import firebase from "firebase";

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
      default: "red",
    },
    fgColor: {
      type: String,
      default: "white",
    },
  },
  components: {},

  methods: {
    register(event) {
      console.log(this.registerData.email);
      console.log(this.registerData.password);

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
