<template>
<div>
  <v-container
    fluid
    grid-list-lg
    fill-height
    style="min-height: 434px"
  >
    <v-fade-transition mode="out-in">
      <v-layout v-if="show" key="0" wrap >
        <v-flex v-for="dat in output" v-bind:key="dat.id">
          <v-card
            width = "300"
          > 
            <v-img
              height="150"
              class="grey darken-4"
              
            ></v-img>
            <v-card-title class="title">{{dat.name}}</v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-fade-transition>
  </v-container>
</div>
</template>
<script>
//import { firestorage } from '@/firebase/firestorage'
import axios from 'axios'
  export default {
    data() {
      return{
        output: '',
        show: true,
        filePath: ''
      }
    }, 
    created() {
      const filePath1 = 'uploads/'
    axios.get("http://192.168.43.170:5000/api/results")
      .then(res => {
        this.output = res.data;
        this.filePath = filePath1 + res.image;
        console.log(res)
        })
  }
  }
</script>