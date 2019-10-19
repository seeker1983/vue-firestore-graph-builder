<style src="./login.css"></style>
<script src="./login.js"></script>
<template>
  <div class="login-page">
    <div class="login-container">
      <form id="form" v-on:submit.prevent="loginUser">
        <div class="login-label">User name </div>
        <input v-bind="$store.login" placeholder="Username" type="text" v-model="login">
        <div class="login-error" v-show="display_errors && !validation.login">
          User name cannot be empty.
        </div>

        <div class="login-label"> Password </div>
        <input placeholder="Password" type="password" v-model="password">
        <div class="login-error" v-show="display_errors && !validation.password">
          Password is required.
        </div>
 
        <div class="center">
          <input type="submit" value="Authorize user">
        </div>
        <div class="login-error" v-show="auth_fail">
          Incorrect user name or password.
        </div>
      </form>
    </div>
  </div>
</template>
