import mmGraph from 'components/mm-graph/mm-graph.vue'
import bus from 'shared/bus.js'
import firestore from 'shared/mm-firestore.js'

var changeCase = require('change-case')

export default {
  name: 'add-graph',
  firestore() {
    return {
        apis: firestore.collection('apis'),
        sections: firestore.collection('apis/ga/sections'),
        metrics: firestore.collection('apis/ga/sections/General/metrics'),
    }
  },
  data: function () {
    return {
      graphName: 'New graph',
      graphType: 'line',
      scope: this.$route.params.scope || 'user',
      selectedApi: 'ga',
      selectedSection: 'General',
      selectedEndpoint: '',
      endpoints: [
        {"api":"ga","section":"General","endpoint":"Facebook - Page views","label":"[Google Analytics] General - Facebook page views","scale":"362171"},
      ]
    }
  },
  methods: {
    getApiName (apiValue) {
      var api = this.apis.find(el => el['.key'] == apiValue);
      return api? api.name : '';
    },
    getKeys: (obj) => Object.keys(obj),
    add: function() {
      if(this.endPointSelected) { 
        var ref = ['', this.selectedApi, this.selectedSection, this.selectedEndpoint].join('/');

        var endpoint = {
            api: this.selectedApi,
            section: this.selectedSection,
            endpoint: this.selectedEndpoint,
            label: '[' + this.getApiName(this.selectedApi) + '] ' + changeCase.sentence(this.selectedSection) + ' - ' + changeCase.sentence(this.selectedEndpoint)
        };

        var that = this;
        this.$db.ref(ref).once('value').then(resp => {
          endpoint.scale = _.max(_.values(resp.val()))
          that.endpoints.push(endpoint);
        })        

      }
    },
    deleteEndpoint: function(key) {
      this.endpoints.splice(key, 1);
    },
    save: function() {
      var scope = this.scope == 'user' ? this.$db.escapeKey(this.$firebase.auth().currentUser.email) : this.scope;
      this.$db.ref('/graphList').child(scope).push(
        {
          name:this.graphName,          type:this.graphType,
          endpoints:this.endpoints
      }).then( () =>
        this.$router.push({path: '/graphs/' + this.scope})
      )
    },

  },
  components: {
    mmGraph
  },
  computed: {
    endPointSelected: function() {
      return this.selectedApi && this.selectedSection && this.selectedEndpoint ? true : false;
    }
  },
  watch: {
    selectedApi : function() {
      this.$binding('sections', this.$firestore.collection("apis").doc(this.selectedApi).collection('sections'))
      this.selectedSection = null;
    },
    selectedSection : function() {
      this.$binding('metrics', this.$firestore.collection("apis").doc(this.selectedApi).collection('sections').doc(this.selectedSection).collection('metrics'))
      this.selectedEndpoint = null;
    },
  },
  mounted: function () {
    bus.$emit('collapse', this.collapse );
  }

}
