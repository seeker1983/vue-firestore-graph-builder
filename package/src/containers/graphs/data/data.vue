<style src="./data.css"></style>
<script src="./data.js"></script>
<template>
    <div class="data-root">
        <div class="sections">
            <span>Select section: </span>
            <v-select v-model='selectedSection' :options='sections()'></v-select>
        </div>
        <mm-date-picker></mm-date-picker>
        <div class="graphs" v-if="section">
            <span v-for="metric in metrics">
                <h3 v-if='dataReady'>{{convertCase(metric.name)}}</h3>
 
                <mm-graph-trend v-on:data-ready='setDataReady'
                    :api="api"
                    :section="section"
                    :endpoint="metric.name"
                    :from="$store.state.from"
                    :to="$store.state.to"
                    >
                </mm-graph-trend>

            </span>
        </div>
    </div>
</template>
