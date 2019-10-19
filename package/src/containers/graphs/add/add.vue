<style src="./add.css"></style>
<script src="./add.js"></script>
<template>
    <div class="add-graph-root">
      <div class="header-row">
        <div class="header">
          <h2>&nbsp; {{graphName}}</h2>
          <div class="settings">
            <div class="setting-name">Type:</div>
            <span class="setting-input">
              <select v-model="graphType">
                <option value="line">Line</option>
                <!-- <option value="bar">Bar</option> -->
                <!-- <option value="area">Area</option> -->
              </select>            
            </span>
            <br/>
            <span class="setting-name">Name:</span>
            <span class="setting-input">
              <input type="text" v-model="graphName">           
            </span>
          </div>
        </div>
        <div class="graph-container">
          <mm-graph 
            :endpoints='endpoints' 
            :name='graphName'
            :from="$store.state.from"
            :to="$store.state.to"
          > </mm-graph>
        </div>
      </div>

      <h3>Add endpoint</h3>
      <div class="selected-endpoints">
        <!-- <span class="endpoint-nodes"> -->
          <select v-model="selectedApi">
            <option :value="api['.key']" v-for="api in apis">{{api.name}}</option>
          </select>
          <select v-model="selectedSection">
            <option :value="section['.key']" v-for="section in sections">{{section.name}}</option>
          </select>
          <select v-model="selectedEndpoint">
            <option :value="metric['.key']" v-for="metric in metrics">{{metric.name}}</option>
          </select>
        <!-- </span> -->
        <!-- <v-select v-model="selectedApi" :options="apis"></v-select> -->
        <!-- <v-select v-model="selectedSection" :options="getKeys(root[selectedApi])"></v-select> -->
        <!-- <v-select v-model="selectedEndpoint" :options="getKeys(root[selectedApi][selectedSection])"></v-select> -->
        <input :disabled='! endPointSelected' type="button" value="Add" @click="add()">
      </div>        

      <h3>Selected endponts</h3>
      <div v-for="(endpoint, key) in endpoints" class="selected-endpoints">
        <span class="endpoint-nodes">
          <div class="endpoint-nodes-row">
            <select disabled>
              <option selected>{{getApiName(endpoint.api)}}</option>
            </select>
            <select disabled>
              <option selected>{{endpoint.section}}</option>
            </select>
            <select disabled>
              <option selected>{{endpoint.endpoint}}</option>
            </select>
          </div>
          <div class="endpoint-nodes-row last">
            <span class="label">Label: <input v-model='endpoint.label'></span>
            <span class="scale">Scale: <input v-model='endpoint.scale'></span>
          </div>
        </span>
        <span class="grow delete-container">
          <input type="button" value="Delete" @click="deleteEndpoint(key)">
        </span>
      </div>

      <!-- <div v-for="endpoint in selectedEndpoints"> -->
<!--  -->
      <!-- </div> -->

      <div class="submit-block">
        Scope:
        <select v-model="scope">
          <option v-for="_scope in $settings.scopes" :value='_scope.id'>{{_scope.name}}</option>
        </select>

        <input type="submit" value="Add graph" @click="save()">
      </div>

    </div>
</template>
