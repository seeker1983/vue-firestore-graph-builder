import Vue from 'vue'
import store from 'store'

var settings = {
	scopes: [
            {
                  'id' : 'common',
                  'name' : 'Common'
            },
            {
                  'id' : 'user',
                  'name' : 'User Graphs'
            },
            {
                  'id' : 'rev',
                  'name' : 'Revenue Graphs'
            },
            {
            	'id' : 'dist',
            	'name' : 'Distribution Graphs'
            }
	],
	apis: [
            {
            	'id' : 'revenues',
            	'name' : 'Revenues'
            },
            {
            	'id' : 'distributions',
            	'name' : 'Distributions'
            }
	], 
      findById:function(arr, id){
            return arr.find(el => el.id == id);
      }
}

store.state.from = new Date();
store.state.from.setMonth(store.state.from.getMonth() - 2);    
store.state.to = new Date();

Vue.prototype.$settings = settings

export default settings