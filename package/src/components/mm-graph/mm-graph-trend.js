import Vue from 'vue'
import Trend from 'vuetrend'

Vue.use(Trend)

require('lodash');

export default {
  name: 'mm-graph',
  props: {
    name: {
      type: String,
      default: ''
    },
    api: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    endpoint: {
      type: String,
      required: true
    },
    from: {
      default() { 
      	return new Date(Date.now() - 28*86400*1000) ;
      }
    },
    to: {
      default() { 
      	return new Date() ;
      }
    },
    options: {
	    type: Object,
	    default: () => { 
	    	return {
		        responsive:true,
		        maintainAspectRatio:true,
		        title: {
		            display: true,
		            position: 'bottom',
		            text: 'Custom Chart Title'
		        },
		        scales: {
		            yAxes: [{
		                display: true,
		                ticks: {
		                    beginAtZero:true,
		                }
		            }]	        
		        }
	    	}
	    }
	}
  },
  data: function() {
  	return {
		values: []
  	}
  },
  methods: {
  	loadValues() {
      this.$emit('data-ready', false)
  		var cRef = ['apis', this.api, 'sections', this.section, 'metrics', this.endpoint, 'items'].join('/');
  		this.$firestore.collection(cRef)
  			.where('date', '>=', this.from)
  			.where('date', '<=', this.to)
  			.get().then(snapshot => {
  				this.values = snapshot.docs.map(el=>el.data())
          this.$emit('data-ready', true)
  			})

  	}
  },
  computed: {
	graphDataLabels: function() {
		return this.values.map(el=>el.date.toISOString().slice(5,10))
	},
	graphDataValues: function() {
		return this.values.map(el=>el.value)
	}
  },
  watch : {
  	api: function(){this.loadValues()},
  	section: function(){this.loadValues()},
  	endpoint: function(){this.loadValues()},
  	to: function(){this.loadValues()},
  	from: function(){this.loadValues()},
  },
  created() {
  	this.loadValues();
  }  

}
