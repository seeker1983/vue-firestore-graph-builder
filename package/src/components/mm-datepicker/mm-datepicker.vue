<style src="./mm-datepicker.css"></style>
<script src="./mm-datepicker.js"></script>
<template>
    <div class="mm-datepicker-root">
      <datepicker v-model="$store.state.from"></datepicker>
      <span class='sep'>
      	&rarr;
      </span>
      <datepicker v-model="$store.state.to"></datepicker>
    </div>
</template>
