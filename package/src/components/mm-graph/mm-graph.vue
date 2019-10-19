<style src="./mm-graph.css"></style>
<script src="./mm-graph.js"></script>
<template>
	<div>
		<keep-alive>
			<chartjs-line
	  			:options="options"
	  			:width="width"
	  			:height="height"

				:datalabel="name"
				:labels="graphDataLabels"
				:chartData="chartData"
				>			
			</chartjs-line>
		</keep-alive>
    </div>
</template>
