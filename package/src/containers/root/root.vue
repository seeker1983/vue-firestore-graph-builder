<style src="./root.css"></style>
<script src="./root.js"></script>
<template>
  <div class="root">
  	<h3>Team revenues based on distributions</h3>
	<div class="desc">
		Graph of total revenues in comparison with team distributions
	</div>
      <keep-alive>
        <mm-date-picker></mm-date-picker>
      </keep-alive>
    <mm-graph name="Intro"
    	:endpoints="revenuesVsDistributions"
        :width='800'
        :height='400'
        :from="$store.state.from"
        :to="$store.state.to"
    ></mm-graph>
  </div>
</template>
