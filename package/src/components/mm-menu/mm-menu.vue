<style src="./mm-menu.css"></style>
<script src="./mm-menu.js"></script>
<template>
    <div id="mm-menu" class="sidenav">

    <a v-if="visible" href="javascript:void(0)" class="closebtn" @click="collapse()">&larr;</a>
    <a v-else href="javascript:void(0)" class="closebtn" @click="expand()">&rarr;</a>
   	<div>
	    <router-link  :to="{name: 'root'}"> Dashboard </router-link>
	    <router-link  :to="{name: 'graphs', params:{scope:'common'}}"> General charts </router-link>
      <router-link v-for="scope in $settings.scopes" v-if="! 'common,user'.includes(scope.id)" class="sub" :to="{name: 'graphs', params:{scope:scope.id}}"">
        {{scope.name}}
      </router-link>

	    <router-link  :to="{name: 'graphs', params:{scope:'user'}}"> User charts </router-link>
	    <router-link  :to="{name: 'data-graphs', params:{api:'ga'}}"> Data Overview</router-link>
	    <router-link v-for="api in apis" class="sub" :to="{name: 'data-graphs', params:{api:api['.key']}}">
  			{{api.name}}
  		</router-link>
      <a href="javascript:void(0)"> &nbsp;</a>
      <a href="javascript:void(0)" @click="logout()"> Logout </a>
	</div>
    </div>
</template>

