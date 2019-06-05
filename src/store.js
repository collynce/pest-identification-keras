import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search',
        user: null,
        isAuthenticated: false,
        userRecipes: []
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setUserRecipes(state, payload) {
            state.userRecipes = payload;
        }
    },
    actions: {
        async getRecipes({ state, commit }, plan) {
            try {
                let response = await axios.get(`${state.apiUrl}`, {
                    params: {
                        q: plan,
                        app_id: '5b6623d5',
                        app_key: "AIzaSyAMnTncgDrqzRj8yu__d0r0edkM_lvFb1g",
                        from: 0,
                        to: 9
                    }
                });
                // sbdinc keys
                // let response = await axios.get(`${state.apiUrl}`, {
                //     params: {
                //         q: plan,
                //         app_id: '903de977',
                //         app_key: '1b5fbf78de2db637b392f141c524222c\t',
                //         from: 0,
                //         to: 9
                //     }
                // });
                commit('setRecipes', response.data.hits);
            } catch (error) {
                commit('setRecipes', []);
            }
        },
        userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    //alert(`You are logged in as ${user.email}`);
                    this.$router.push('/user');
                })
                .catch( error => {
                    switch (error.code) {
                      case 'auth/wrong-password':
                      alert('Oops!! Invalid email/password!');
                      case 'auth/user-not-found':
                      alert('Oops!! Invalid email/password!');
                      }
                  });
                
        },
        userLog({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    //alert(`You are logged in as ${user.email}`);
                    window.location.replace("/reports");
                })
                .catch( error => {
                    switch (error.code) {
                      case 'auth/wrong-password':
                      alert('Oops!! Invalid email/password!');
                      case 'auth/user-not-found':
                      alert('Oops!! Invalid email/password!');
                      }
                  });
                
        },
        userJoin({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/user');
                    //Email Verification
                    firebase.auth().currentUser.sendEmailVerification().then(function() {
                      // Email sent.
                     }, function(error) {
                      // An error happened.
                     });
                    
                })
                .catch(error => {
                  switch (error.code) {
                    case 'auth/email-already-in-use':
                    alert(error.message);
                    case 'auth/invalid-email':
                    alert(error.message);
                    case 'auth/operation-not-allowed':
                    alert(error.message);
                    //case 'auth/weak-password':
                      //console.log('Password is not strong enough. Add additional characters including special characters and numbers.')
                  }
                });
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        },
        createImages ({commit, getters}, payload) {
            const meetup = {
              imageUrl: payload.imageUrl,
              
            }
            firebase.database().ref('meetups').push(meetup)
              .then((data) => {
                const key = data.key
                commit('createImages', {
                  ...meetup,
                  id: key
                })
              })
              .catch((error) => {
                console.log(error)
              })
            // Reach out to firebase and store it
          },
        getUserRecipes({ state, commit }) {
            return firebase
                .database()
                .ref('users/' + state.user.user.uid)
                .once('value', snapshot => {
                    commit('setUserRecipes', snapshot.val());
                });
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    }
});

