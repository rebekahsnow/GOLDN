<template>
  <v-app-bar app color="transparent" :elevation="0" height="100px">
    <v-toolbar-title class="title">
      <router-link to="/" class="logo">GOLDEN</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" id="pad">
      <!-- <v-btn text to="/login" class="nav">Sign In</v-btn> -->
      <v-btn text to="/register">Register</v-btn>
      <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
    </v-toolbar-items>
  </v-app-bar>
</template>
<style scoped>
.logo {
  color: #014023;
  text-decoration: none;
  font-family: "ivymode";
  font-size: 36px;
  font-weight: bold;
  letter-spacing: .2rem;
  margin: 36px;
}
#pad {
  color: #014023;
  margin-right: 36px;
  font-family: "Gopher";
}
</style>
