<template>
  <div class="container">
    <v-form ref="form" v-model="valid">
      <v-text-field
        prepend-icon="person"
        name="pname"
        label="Email"
        type="text"
        v-model="pname"
        required
        data-cy="signinEmailField"
      ></v-text-field>
      <v-text-field
        prepend-icon="lock"
        name="descr"
        label="Password"
        type="text"
        data-cy="signinPasswordField"
        v-model="descr"
        
        required
      ></v-text-field>
    </v-form>
    <v-btn @click="submit" class="btn btn-primary">Send</v-btn>
  </div>
</template>
<script>
//import { firestorage } from '@/firebase/firestorage'
import axios from "axios";
export default {
  data() {
    return {
      output: "",
      show: true,
      pname: "",
      descr: ""
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
      axios
        .post("http://127.0.0.1:5000/api/updates", {
          names: this.pname,
          description: this.descr
        })
        .then(res => {
          console.log(res);
          this.output = res.data;
          //window.location.replace("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
    }
  }
};
</script>