<template>
  <v-app id="inspire">
    <div>
      <v-app-bar color="transparent" :elevation="0" height="100px">
        <v-toolbar-title class="title">
          <router-link to="/search" class="logo">GOLDN.</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" id="pad">
          <v-btn text to="/login">Sign In</v-btn>
          <v-btn text to="/register">Register</v-btn>
          <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
        </v-toolbar-items>
      </v-app-bar>
      <div>
        <h2>Register as a ...</h2>
        <v-btn disabled>Client</v-btn>
        <v-btn text to="/photographer">Photographer</v-btn>
      </div>
    </div>
  </v-app>
</template>
<script>
// import Header from "../components/TheHeader.vue";
// import { db } from "../config.js";

export default {
  data() {
    return {};
  },

  methods: {
    routePhotographerRegistration() {
      this.$route.push("registrationPhotographer");
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
#inspire {
  background-color: #f2ede4;
}
.logo {
  font-family: "gimlet-display";
  font-weight: bold;
  color: #014023;
  text-decoration: none;
  font-size: 36px;
  margin: 36px;
}
#pad {
  color: #014023;
  margin-right: 36px;
  font-family: "Gopher";
}

.p {
  margin-bottom: 0px;
}

.selections {
  border-style: none !important;
}
</style>
