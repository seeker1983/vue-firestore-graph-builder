import Vue from 'vue'

var firebase = require('firebase')

var firebaseApp = firebase.initializeApp({
  projectId: 'vue-firestore-graph-builder',
  apiKey: "AIzaSyCwXEJsB4odbObpT-qNPKkV_XkGMYhIodc",
  authDomain: "vue-firestore-graph-builder.firebaseapp.com",         // Auth with popup/redirect
  databaseURL: "https://vue-firestore-graph-builder.firebaseio.com", // Realtime Database
  storageBucket: "vue-firestore-graph-builder.appspot.com"          // Storage
})

Vue.prototype.$firebase = firebaseApp
Vue.prototype.$db = firebaseApp.database()
let db = firebase.database()

db.escapeKey = function(key) {
	return key.replace(/[\[\]\.\#\$]/g, '-');
};

export { db as default, firebaseApp as firebase}

/* eslint-disable no-new */
