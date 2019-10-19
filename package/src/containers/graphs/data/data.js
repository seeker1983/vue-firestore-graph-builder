import mmGraphTrend from 'components/mm-graph/mm-graph-trend.vue'
import db from 'shared/mm-firebase.js'
import mmDatePicker from 'components/mm-datepicker/mm-datepicker.vue'

import Vue from 'vue'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

var changeCase = require('change-case')

export default {
  name: 'data',
  props: {
    api: {
      type: String
    },
    section: {
      type: String
    },
  },
  data: function(){
    return {
      apiData: {},
      selectedSection: this.section,
      metrics: [],
      dataReady:false
    }
  },
  watch: {
    api: function() {
      this.$binding('apiData', this.$firestore.collection("apis").doc(this.api).collection('sections'))
      this.selectedSection = '';
    },
    selectedSection: function() {
      if(this.selectedSection) {
        this.$router.push({ path: '/data/' + this.api + '/' + this.selectedSection})
        this.$binding('metrics', this.$firestore.collection("apis").doc(this.api).collection('sections').doc(this.selectedSection).collection('metrics'))
      }
    }
  },
  methods: {
    convertCase: function(el) {
      return changeCase.sentence(el);

    },
    sections: function() {
      return this.apiData.map(api=>api.name)
    },
    setDataReady(val) {
      this.dataReady = val
    }
  },
  components: {
    mmGraphTrend, mmDatePicker
  },
  updated: function() {
  },
  created: function() {
    this.$binding('apiData', this.$firestore.collection("apis").doc('ga').collection('sections'))
  }
}
