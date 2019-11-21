<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container fluid>
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl" />
            <v-text-field
              label="Select Image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              id="files"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            />
          </v-flex>
        </v-container>
        <div class="outBox">
          <v-layout row>
            <v-flex xs1>
              <!-- empty -->
            </v-flex>
            <v-flex xs10 md12 class="output">
              <div class="text-xs-center">
                <v-btn
                  :disabled="dialog"
                  :loading="dialog"
                  class="white--text"
                  color="primary"
                  @click="onUpload();"
                >Send</v-btn>

                <v-dialog v-model="dialog" hide-overlay persistent width="300">
                  <v-card color="primary" dark>
                    <v-card-text>
                      Please stand by
                      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>

              <v-snackbar
                v-model="snackbar"
                :bottom="y === 'bottom'"
                :left="x === 'left'"
                :multi-line="mode === 'multi-line'"
                :right="x === 'right'"
                :timeout="timeout"
                :top="y === 'top'"
                color="error"
                :vertical="mode === 'vertical'"
              >
                {{ text }}
                <v-btn color="primary darken-2" flat @click="snackbar = false">Close</v-btn>
              </v-snackbar>
              <div v-for="p in output" v-bind:item="p" v-bind:key="p.id">
                <v-layout row style="padding: 10px;">
                  <v-flex xs6 style="text-align: left;">
                    <strong color="info">Results</strong>
                    <v-card xs6 style="margin-top:20px">{{p.prediction}}</v-card>
                  </v-flex>
                  <v-layout style="margin-top: 41px; margin-left:100px">
                    <strong color="info"></strong>
                    <div v-if="p.prediction == 'Mango Seed Weevil'">
                      <v-flex>
                        <v-card>
                          <h2>Description</h2>
                          <p>Mango Seed Weevil is is widespread in most mango-growing regions</p>
                          <h2>Identification</h2>
                          <ul>
                            <li>
                              <p>
                                <b>Eggs:</b> These are elliptical, about 0.88mm long and 0.3mm wide and are creamy-white in color when freashly laid.
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Larvae:</b> They are white grubs with a cureved body, brown heads, legless and about 17mm long.
                              </p>
                            </li>
                          </ul>
                          <h2>CONTROL</h2>
                          <p>The following are the insecticide fit for use against mango seed weevil:</p>
                          <ul>
                            <li>
                              <p>LEXUS 245C 8ml/20ml</p>
                            </li>
                            <li>
                              <p>EMERALD 200SL 10ml/20l</p>
                            </li>
                            <li>
                              <p>PENTAGON 50EC 10ml/20ml</p>
                            </li>
                            <li>
                              <p>BACIGUARD 16WDG 15g/20l</p>
                            </li>
                          </ul>
                        </v-card>
                      </v-flex>
                    </div>
                    <div v-else-if="p.prediction == 'Fall Armyworm'">
                      <v-flex>
                        <h2>Description</h2>
                        <p>The Fall Armyworm (Spodoptera Frugiperda) is the larvae life stage of a Fall Armyworm moth.</p>
                        <h2>CONTROL</h2>
                        <p>The surest way to control this pest currently is through known tough insecticide combinations. They are as follow:</p>
                        <ul>
                          <li>Escort 50ml + Pentagon 40ml ( Kill in 5 hours)</li>
                          <li>Escort 50ml + Loyalty 10gm ( Kill in 5 hours)</li>
                          <li>Profile 30ml + Pentagon 40ml (Kill in 5 hours )</li>
                          <li>Ranger 40ml + Loyalty 10gm (Kill in 5 hours)</li>
                        </ul>
                      </v-flex>
                    </div>
                    <div v-else-if="p.prediction == 'New Pest'">
                      <p>This is a new pest in our system. We will work on it</p>
                    </div>
                  </v-layout>
                </v-layout>
              </div>
            </v-flex>
            <v-flex xs1>
              <!-- empty -->
            </v-flex>
          </v-layout>
        </div>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
export default {
  //props: ["oldImgUrl"],
  data() {
    //const token = localStorage.usertoken
    //console.log(token)
    return {
      title: "Image Upload",

      dialog: false,

      imageName: "",
      imageUrl: "",
      //imageFile: '',
      pleaseWait: "",
      indicator: "",
      error: "",
      output: null,
      alert: true,
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Please select a file first!"
    };
  },
  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 4000);
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    onUpload() {
      this.output = null;
      if (this.imageFile == null) {
        this.indicator = "";
        this.dialog = false;
        this.snackbar = true;
      } else {
        this.dialog = true;
        this.indicator = "";
        this.error = "";
        //this.pleaseWait = 'Please wait ...';
        const fd = new FormData();
        fd.append("file", this.imageFile, this.imageFile.name, this.email);
        console.log(this.email);
        //this.pleaseWait = 'Please wait...';
        axios.post("http://127.0.0.1:5000/api/predict", fd).then(res => {
          this.pleaseWait = "";
          this.error = "";
          console.log(res);
          this.output = res.data;
          this.imageFile = null;
          this.dialog = false;
          this.imageUrl = "";
          this.imageName = "";
        });
        this.imageFile = null;
      }
    }
  }
};
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>