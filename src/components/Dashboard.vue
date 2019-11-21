<template>
  <div>
    <v-app id="inspire" dark>
      <v-navigation-drawer v-model="drawer" fixed clipped app>
        <v-list dense>
          <v-list-tile v-for="item in items" :key="item.id" router :to="item.lin">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="primary" fixed clipped-left app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

        <v-toolbar-title class="mr-5 align-center">
          <span class="title">PESTFULL</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout row align-center style="max-width: 650px"></v-layout>

        <v-btn color="white" outline @click="logout" data-cy="logoutSubmitBtn">Logout</v-btn>
      </v-toolbar>
      <v-content>
        <v-container fill-height>
          <v-layout>
            <v-flex>
              <router-view />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Dashboard",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      drawer: null,

      items: [
        { icon: "dashboard", text: "Dashboard", lin: "/user" },
        { icon: "image", text: "Uploads", lin: "/uploads" }
      ],
      items2: [
        { picture: 28, text: "Joseph" },
        { picture: 38, text: "Apple" },
        { picture: 48, text: "Xbox Ahoy" },
        { picture: 58, text: "Nokia" },
        { picture: 78, text: "MKBHD" }
      ]
    };
  },
  props: {
    source: String
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>