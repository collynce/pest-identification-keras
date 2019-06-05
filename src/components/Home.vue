<template>
  <div id="app">
    <v-app light>
      <navbar/>
      <v-content>
        <section>
          <v-parallax :src="getImgUrl('hom.jpg')" height="600">
            <v-layout column align-center justify-center class="white--text">
              <h1 class="white--text mb-2 display-1 text-xs-center">PestControl</h1>
              <div class="subheading mb-3 text-xs-center">Best way to control crop pests</div>
              <v-btn class="blue lighten-2 mt-5" dark large to="/signup">Get Started</v-btn>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-layout column wrap class="my-5" align-center>
            <v-flex xs12 sm4 class="my-3">
              <div class="text-xs-center" id="services">
                <h2 class="headline">The best way to control pests</h2>
                <span class="subheading">Here is how...</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Capture</div>
                      </v-card-title>
                      <v-card-text>
                        Capture an image of a pest on your farm
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Upload</div>
                      </v-card-title>
                      <v-card-text>
                        Take an image of any crop pest in the farm, then upload the image using this great tool.
                        Wait for analysis of the image.
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Get results</div>
                      </v-card-title>
                      <v-card-text>
                        Get quick and accurate results within a few seconds with the best measures to prevent and eradicate the identified pest
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>

        <section>
          <v-parallax :src="getImgUrl('dam3.jpg')" height="380">
            <v-layout column align-center justify-center>
              <div
                class="headline white--text mb-3 text-xs-center"
              >Controlling has never been easier and more efficient</div>
              <em>Try it out today</em>
              <v-btn class="blue lighten-2 mt-5" dark large to="/signup">Get Started</v-btn>
            </v-layout>
          </v-parallax>
        </section>
<v-fab-transition>
             
            </v-fab-transition>
        <section>
          <v-container grid-list-xl id="about">
            <v-layout row wrap justify-center class="my-5">
              <v-flex xs12 sm4>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Company info</div>
                  </v-card-title>
                  <v-card-text>
                    This is the next big thing in the farming sector.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 sm4 offset-sm1>
                <v-card class="elevation-0 transparent">
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contact us</div>
                  </v-card-title>
                  <v-card-text></v-card-text>
                  <v-list class="transparent">
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>077-867-5309</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">place</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>Nairobi, KE</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon class="blue--text text--lighten-2">email</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>info@pestfull.ga</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
        
        <v-footer class="blue darken-2">
          <v-layout row wrap align-center>
            <v-flex xs12>
              <div class="white--text ml-3"></div>
            </v-flex>
          </v-layout>
        </v-footer>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import navbar from "@/components/dashboard/navbar.vue";

export default {
  name: "home",
  components: {
    navbar
  },
  methods: {
    getImgUrl(img) {
      return require("@/assets/" + img);
    }
  }
};
</script>
