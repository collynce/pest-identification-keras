import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
//import * as tf from '@tensorflow/tfjs'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import colors from 'vuetify/es5/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase';
import '../node_modules/nprogress/nprogress.css'
import NProgress from 'nprogress';
import '@/firebase/firebase.js'

//import 'bulma/css/bulma.css'
//import iview from 'iview'
//import Element from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css';
/*import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'*/
//import 'iview/dist/styles/iview.css'
//import Buefy from 'buefy';
//import 'buefy/dist/buefy.css';

//Vue.use(Buefy);

//Vue.use(Element);
//Vue.use($);
Vue.use(colors);
Vue.use(Vuetify, {
  theme: {
    primary: '#4caf50',
    secondary: '#3f51b5',
    accent: '#2196f3',
    error: '#f44336',
    warning: '#00bcd4',
    info: '#e91e63',
    success: '#ff5722'
  }
})
//Vue.use(iview);
Vue.use(VeeValidate);
//Vue.use(tf);

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app) {
    new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
}) 



/*
// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([5], [1, 1])).print();
});
*/
