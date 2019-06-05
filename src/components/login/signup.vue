<template>
  <v-app>
    <v-toolbar class="light" fixed clipped-left app>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">PESTFULL</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px"></v-layout>
    </v-toolbar>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs110 sm8 md6>
                <v-card class="elevation-2">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Join Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field prepend-icon="person" name="email" label="Email" type="email"
                                          v-model="email" :rules="emailRules" data-cy="joinEmailField" required>
                            </v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password"
                                          type="password" required v-model="password" :rules="passwordRules"
                                          data-cy="joinPasswordField">
                            </v-text-field>
                        </v-form>
                        <p>Registered?<a href="/login">Login</a></p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click="submit" data-cy="joinSubmitBtn">Join</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
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
        this.$store.dispatch("userJoin", {
          email: this.email,
          password: this.password
        });
      }
    
      /*if (this.$refs.form.validate()) {
      axios.post('http://192.168.43.170:5000/api/signup', {
          email: this.email,
          password: this.password
        })
        .then(res => {
        console.log(res);
        this.output = res.data;
        window.location.replace("/login");
        }).catch((err) => {
        console.log(err)
      })
      }*/

    }
  }
};
</script>