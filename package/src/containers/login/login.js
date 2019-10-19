import bus from 'shared/bus.js'
var firebase = require('firebase')

export default {
  name: 'login',
  data: function() {
    return {
      login: 'dummy@gmail.com',
      password: '',
      display_errors: false,
      auth_fail: false
    }
  },

  computed: {
    validation: function () {
      return {
        login: !!this.login.trim(),
        password: !!this.password.trim()
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },

  methods: {
    loginUser: function () {
      if (this.isValid) {
        this.display_errors = false
        firebase.auth().signInWithEmailAndPassword(this.login, this.password).then(
            (user) => {
              /* Login is handled in main.js onAuthStateChanged() */ 
            },
            (error) => {
              this.auth_fail = true;
            }
        );
      } else {
        this.display_errors = true;
        this.auth_fail = false;
      }
    }
  }
}



