import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import {firebase} from 'shared/mm-firebase'

require('firebase/firestore')
 
Vue.use(VueFirestore)

const firestore = firebase.firestore();

Vue.prototype.$firestore = firestore 
 
export default firestore

