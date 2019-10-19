import VueCharts from 'vue-chartjs'
import { Bar, Line, mixins } from 'vue-chartjs'

import db from 'shared/mm-firebase.js'

const { reactiveProp } = mixins

require('lodash');

var chartjsLine = {
  name: 'chartjs-line',
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {fill:false})
  }
}


export default {
  name: 'mm-graph',
  props: {
    endpoints: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    from: {
      default: (Date.now() - Date.now() % 86400000)/1000 - 30*86400
    },
    to: {
      default: (Date.now() - Date.now() % 86400000)/1000
    },
    height: {
      default: 250
    },
    width: {
      default: 400
    },
    options: {
      type: Object,
      default: function () {
        return {
          responsive:false,
          maintainAspectRatio:true
        }
      }
    },
    colors: {
      type: Array,
      default: function () {
        return ['blue','green', 'yellow', 'black', 'cyan', 'purple', 'red', 'fuchsia','olive','maroon','aqua','lime','teal','navy', 'silver','gray']
        //['blue','green', 'yellow', 'black', 'cyan']
      }
    },
  },
  data: function () {
    return {
      sourceData : [],
      datasets: []
    }
  },    

//    options: {
//	    type: Object,
//	    default: () => { 
//	    	return {
//		        responsive:false,
//		        maintainAspectRatio:true,
//		        title: {
//		            display: true,
//		            position: 'bottom',
//		            text: 'Custom Chart Title'
//		        },
//		        scales: {
//		            yAxes: [{
//		                display: true,
//		                ticks: {
//		                    beginAtZero:true,
//		                }
//		            }]	        
//		        }
//	    	}
//	     }
//	   }
  methods: {
    loadValues : function () {
      var refs = this.endpoints.map(
        ep => ['apis', ep.api, 'sections', ep.section, 'metrics', ep.endpoint, 'items'].join('/')
      )

      var promises = refs.map(
        ref => this.$firestore.collection(ref)
          .where('date', '>=', this.from)
          .where('date', '<=', this.to)
          .get()
      );

      Promise.all(promises).then(snapshots => {
//        var sourceData = snapshots.map(snapshot=>{var i = {}; snapshot.docs.map(el=>{var data = el.data();  i[Math.floor(data.date.getTime()/1000)]=data.value}); return i; })
        var sourceData = snapshots.map(snapshot=>{var i = {}; snapshot.docs.map(el=>{var data = el.data();  i[Math.floor(data.date.getTime()/1000)]=data.value}); return i; })
//        console.log('sd', sourceData)
        this.setSourceData(sourceData)
//        console.log('loaded', snapshots)
//        window.s = snapshots
//          this.values = snapshot.docs.map(el=>el.data())
      })

    },
    setSourceData(data) {
      this.datasets = data.map((el, index) => {
        var scale = this.endpoints[index].scale > 0 ? this.endpoints[index].scale : 1;
        var elDates = Object.keys(el)
        return {
          label: this.endpoints[index].label || this.endpoints[index].endpoint,
          fill:false,
          backgroundColor: this.colors[index],
          data: this.timeStamps.map(ts => {
            var found = _.keys(el).find(__el => __el>= ts && __el <= ts+86400)
            return found ? el[found]/scale : 0
          })
        }
      })
    },

    filterDates : function(refData){
      var from = this.from instanceof Date ? this.from.getTime() / 1000 : this.from;
      var to = this.to instanceof Date ? this.to.getTime() / 1000 : this.to;

      return _.pickBy(refData, (val, key) => {
        return key >= from && key <=to
      });
    },
  },
  computed: {
    timeStamps: function() {
      return _.range(mmg.from.getTime()/1000, mmg.to.getTime()/1000, 86400);
    },
    graphDataLabels: function() {
      var labels = this.timeStamps.map( 
        d => (new Date(d * 1000)).toISOString().slice(5,10)
      );
      return labels;
    },
    chartData: function(){
      return {
          labels: this.graphDataLabels,
          datasets: this.datasets
        };
      }
  },
  watch: {
    endpoints () {
      this.loadValues();
    },
    from () {
      this.loadValues();
    },
    to () {
      this.loadValues();
    }
  },
  created: function (){
    window.mmg=this;
  },
  mounted: function (){
    this.loadValues();
  },

  components: {chartjsLine}
}

