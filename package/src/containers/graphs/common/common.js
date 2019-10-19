import mmGraph from 'components/mm-graph/mm-graph.vue'
import mmDatePicker from 'components/mm-datepicker/mm-datepicker.vue'
import db from 'shared/mm-firebase.js'

export default {
  name: 'graphs',
  props: {
    scope: {
      type: String, 
      default: 'common'
    },
  },
  data: function () {
    return {
      graphs: []
    }
  },
  methods: {
    deleteGraph(graph) {
      if(confirm('Are sure?'))
        this.$firebaseRefs.graphs.child(graph['.key']).remove()
    },
    loadData() {
      var user_email = this.$db.escapeKey(this.$firebase.auth().currentUser.email);
      var graphKey = this.scope == 'user' ? user_email : this.scope
      this.$bindAsArray('graphs', db.ref('/graphList/' + graphKey))
    }

  },
  computed: {
    scopeName: function() {
      return this.$settings.findById(this.$settings.scopes, this.scope).name;
    },
  },
  components: {
    mmGraph, mmDatePicker
  },
  created: function(){
    this.loadData()

  },
  watch: {
    scope : function(sc) {
      this.loadData()
    }
  }

}
