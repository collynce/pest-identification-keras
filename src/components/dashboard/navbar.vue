<template>
<div>
<div class="filler one"></div>
  <v-toolbar color="light" sticky-top fixed id="#navbar">
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">PESTFULL</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/login">LOGIN</v-btn>
        <v-btn flat to="/user">DASHBOARD</v-btn>
        <v-btn flat>ABOUT</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

