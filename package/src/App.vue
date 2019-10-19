<template>
  <div id="app" class="app">
  	<div v-if="logined">
  		<main-view></main-view>
  	</div>
  	<div v-else>
  		<login v-on:></login>
  	</div>
  </div>
</template>

<script>
import login from 'containers/login/login.vue'
import bus from 'shared/bus.js'
import mainView from 'containers/main-view/main-view.vue'

var firebase = require('firebase')

export default {
  name: 'app',
  components: {
  	login, mainView
  },
  data:  function() { return {
      logined: firebase.auth().currentUser
      }
  },
  created: function() {
      bus.$on('login-status-changed', (user) => this.logined = user );
      bus.$on('logout', () => firebase.auth().signOut() );
  }
}
</script>

