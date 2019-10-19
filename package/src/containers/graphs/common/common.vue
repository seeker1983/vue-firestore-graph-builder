<style src="./common.css"></style>
<script src="./common.js"></script>
<template>
    <div class="common-root">
    	<h1>{{scopeName}} charts </h1>
    	<keep-alive>
    		<mm-date-picker></mm-date-picker>
    	</keep-alive>
    	<div v-for="graph in graphs">
	    	<h3> {{graph.name}}</h3>
	    	<div class='desc'> {{graph.description}}</div>
	        <mm-graph 
	          :endpoints='graph.endpoints' 
	          :name='graph.name'
	          :width='800'
	          :height='400'
              :from="$store.state.from"
              :to="$store.state.to"
	          >
	      	</mm-graph>
	      	<div class="center">
	      		<input type=button value="Delete" class="delete-graph" @click="deleteGraph(graph)">
	      	</div>
    	</div>
	    <router-link class="button-add-graph" tag="button" :to="{name: 'add-graph', params: {scope:scope}}"> Add graph </router-link>
    </div>
</template>
