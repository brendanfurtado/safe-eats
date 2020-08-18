<template>
  <div class="login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="6">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row>
                  <v-col cols="12" md="8" class="pt-6 pb-6">
                    <v-card-text>
                      <v-card-title class="text-center display-1 mb-10"
                        >Login form</v-card-title
                      >
                      <v-spacer></v-spacer>
                      <v-form>
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
                      </v-form>
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
                    </v-card-text>
                    <v-card-actions>
                      <v-col class="text-center">
                        <v-btn color="primary">Login</v-btn>
                      </v-col>
                    </v-card-actions>
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
                        <v-btn dark outlined @click="step = 2">Sign Up</v-btn>
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
export default {
  name: "Login",
  data() {
    return {
      loginData: {
        email: null,
        password: null,
        token: null,
        isLoggedIn: false,
      },
      signInString: "Sign In",
    };
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
};
</script>

<style scoped>
.login {
  padding-top: 25px;
}
</style>
