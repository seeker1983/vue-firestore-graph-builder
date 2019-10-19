<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.js"></script>
<style src="./mm-graph.css"></style>
<script src="./mm-graph-trend.js"></script>
<template>
	<div>
		{{name}}
		<trend
		  :data="graphDataValues"
		  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
		  auto-draw
		  smooth>
		</trend>
    </div>
</template>
