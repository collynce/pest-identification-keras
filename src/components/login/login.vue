<template>
  <v-app>
    <v-toolbar class="light" fixed clipped-left app>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">PESTFULL</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px"></v-layout>
    </v-toolbar>
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs10 sm12 md6>
          <v-card class="elevation-2">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login Form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="Email"
                  type="email"
                  v-model="email"
                  :rules="emailRules"
                  required
                  data-cy="signinEmailField"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  data-cy="signinPasswordField"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-form>
              <p>
                Not yet registered?
                <a href="/signup">Register</a>
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!valid"
                @click="submit"
                data-cy="signinSubmitBtn"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import router from "../../router.js";
export default {
  name: "login",
  data() {
    return {
      alert: true,
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Please select a file first!",
      //
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be greater than 6 characters"
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
            }
      /*if (this.$refs.form.validate()) {
       axios
          .post("http://192.168.43.170:5000/api/login", {
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res);
            localStorage.setItem("user", res.data);
            console.log(localStorage);
            this.email = "";
            this.password = "";
            //router.push({ name: 'user' })
            window.location.replace("/user");
          })
          .catch(err => {
            console.log(err);
             this.snackbar = true;
          });
      }*/
    }
  }
};
</script>
