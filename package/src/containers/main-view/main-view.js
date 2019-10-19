import mmGraph from 'components/mm-graph/mm-graph.vue'
import mmMenu from 'components/mm-menu/mm-menu.vue'

import Vue from 'vue'

var VueFire = require('vuefire')

Vue.use(VueFire)

export default {
  name: 'main-view',
  data: function () {
    return {
    }
  },
  methods: {
  },
  components: {
    mmMenu, mmGraph
  },
  updated: function (){
    if(this.$children && this.$children[0] && this.$children[0].init)
      this.$children[0].init();
  },
  computed: {
    customMessage: function () {
      return `This is ${this.message}`
    }
  }
}
