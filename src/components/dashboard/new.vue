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
            <div v-if="dat == 'New Pest'">
                <p>New Pests</p>
                
            </div>
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
        show: true
      }
    }, 
    created() {
    axios.get("http://127.0.0.1:5000/api/results")
      .then(res => {
        this.output = res.data;
        console.log(res)
        })
  }
  }
</script>