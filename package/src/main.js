import Vue from 'vue'

import store from './store'
import router from './router'

import App from './App'
import bus from 'shared/bus.js'
import settings from 'shared/mm-settings.js'

var firebase = require('firebase')

var app = null;

Vue.config.devtools = true;

firebase.auth().onAuthStateChanged(user => {
  console.log('Firebase auth', user)
  store.logined = user;
  bus.$emit('login-status-changed', user);

  if(! app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App },
      firebase: function () {
        return {
          fbRoot: {
            source: firebase.database().ref('/'),
            asObject: true
          }
        }
      }      
    })
  }
})
