import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Root from 'containers/root/root.vue'

import NotFound from 'containers/notFound/notFound.vue'
import AddGraph from 'containers/graphs/add/add.vue'
import DataGraphs from 'containers/graphs/data/data.vue'
import CommonGraphs from 'containers/graphs/common/common.vue'

// application routes
const routes = [
  { path: '/', name: 'root', component: Root },
  { path: '/graphs/:scope', name: 'graphs', component: CommonGraphs, props: true },
  { path: '/graphs/add', name: 'add-graph', component: AddGraph },
  { path: '/data/:api', name: 'data-graphs', component: DataGraphs,  props: true},
  { path: '/data/:api/:section', name: 'data-graphs-section', component: DataGraphs, props: true},
  { path: '*', name: 'notFound', component: NotFound }
]

// export router instance
export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})
