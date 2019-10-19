import mmGraph from 'components/mm-graph/mm-graph.vue'
import mmDatePicker from 'components/mm-datepicker/mm-datepicker.vue'


export default {
  name: 'root',
  components: {
  	mmGraph, mmDatePicker
  },
  data: function() {
  	return {
  		revenuesVsDistributions : [
		    {
		        "api": "revenues",
		        "section": "Cars",
		        "endpoint": "Canada",
		        "scale": 1000,
		        "label": "Car Revenues, scale 1000"
		    },
		    {
		        "api": "distributions",
		        "section": "cars",
		        "endpoint": "Canada",
		        "scale": 10,
		        "label": "Car Distributions, scale 10"
		    }
		]
  	}
  }
}
