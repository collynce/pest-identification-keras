<template>
  <div class="">
    <v-flex>
    <v-form ref="form" v-model="valid">
      <div class="form-row">
        <div class="form-group col-md-8">
          <label for="inputEmail4">Pest Name</label>
          <v-text-field
            type="text"
            name="pname"
            v-model="pname"
            id="pestname"
            placeholder="Name"
            :rules="nameRules"
            required
          ></v-text-field>
        </div>
        <div class="form-group col-md-8">
          <label for="inputPassword4">Description</label>
          <v-textarea
            
            id="sescr"
            name="descr"
            v-model="descr"
            placeholder="Brief Description"
            :rules="descRules"
            required
          ></v-textarea>
        </div>

        <div class="form-group col-md-8">
          <label for="inputAddress">Control and Management</label>
          <v-textarea
            
            id="control"
            placeholder="Control Measures"
            name="control"
            v-model="control"
            :rules="contRules"
            required
          ></v-textarea>
        </div>
      </div>
    </v-form>
    <v-btn @click="submit" :disabled="!valid" class="btn btn-primary">Send</v-btn>
    </v-flex>
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
      valid: false,
      pname: "",
      descr: "",
      control: "",
      nameRules: [
        v => !!v || "Name is required",
        
      ],
      descRules: [
        v => !!v || "Decription is required",
        
      ],
      contRules: [
        v => !!v || "Control Description is required",
        
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://192.168.43.170:5000/api/updates", {
            names: this.pname,
            description: this.descr,
            contr: this.control
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