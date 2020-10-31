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
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="registerData.firstName"
                              id="firstName"
                              label="First Name"
                              name="firstName"
                              prepend-icon="mdi-account"
                              type="text"
                              required
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              v-model="registerData.lastName"
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              prepend-icon="mdi-account"
                              type="text"
                              required
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-text-field
                          v-model="registerData.email"
                          id="email"
                          label="Email"
                          name="email"
                          prepend-icon="mdi-account"
                          type="text"
                        ></v-text-field>
                        <!-- required -->

                        <v-text-field
                          v-model="registerData.password"
                          id="password"
                          label="Password"
                          name="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-validate="'required|min:6|customPassword'"
                          data-vv-name="password"
                          ref="password"
                        ></v-text-field>
                        <!-- required -->
                        <ul style="color:red" class="overline text-left">
                          <li v-for="(error, index) in errors" :key="index">
                            <span>{{ error }}</span>
                          </li>
                        </ul>

                        <v-text-field
                          v-model="registerData.verifyPassword"
                          id="verifyPassword"
                          label="Verify Password"
                          name="verifyPassword"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-validate="{
                            required: true,
                            is: registerData.password,
                          }"
                          data-vv-as="password"
                          data-vv-name="verifyPassword"
                          required
                        ></v-text-field>
                        <ul style="color:red" class="overline text-left">
                          <li v-for="(error, index) in errors" :key="index">
                            <span>{{ error }}</span>
                          </li>
                        </ul>

                        <v-card-actions>
                          <v-col class="text-center">
                            <v-btn
                              type="submit"
                              form="check-register-form"
                              color="grey"
                              :disabled="!valid"
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
// import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// // create custom error message for custom rule
// var errorMessage =
//  " min length 8 chars, and must include 1 lower-case, upper-case, numeral and special character (#!@$%^*-)";

// // create custom rule
// extend("customPassword", {
//   message: field => "The " + `${field}` + errorMessage,
//   validate: value => {
//     var notTheseChars = /["'?&/<>\s]/;
//     var mustContainTheseChars = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^*-]).{8,}$/;
//     var containsForbiddenChars = notTheseChars.test(value);
//     var containsRequiredChars = mustContainTheseChars.test(value);
//     if (containsRequiredChars && !containsForbiddenChars) {
//       return true;
//     } else {
//         if (containsForbiddenChars) {
//           errorMessage = ' contains forbidden characters: " ' + " ' ? & / < > or space";
//         }
//         else { errorMessage = " min length 8 chars, and must include 1 lower-case, upper-case, numeral and special character ($@$!%*#?&)";
//         }
//         return false;
//       }
//     }
// });

export default {
  name: "Register",

  data() {
    return {
      registerData: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        verifyPassword: null,
        token: null,
        isLoggedIn: false,
        errors: null,
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
  // components: {ValidationProvider, ValidationObserver},

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
              if (err.message !== null || err.message !== "") {
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
