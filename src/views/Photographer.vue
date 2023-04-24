<template>
  <v-app id="inspire">
    <div>
      <v-app-bar color="transparent" :elevation="0" height="100px">
        <v-toolbar-title class="title">
          <router-link to="/search" class="logo">GOLDN</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" id="pad">
          <v-btn text to="/login" class="nav">Sign In</v-btn>
          <v-btn text to="/register" class="nav">Register</v-btn>
          <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
        </v-toolbar-items>
      </v-app-bar>
      <div class="body">
        <div>
          <img
            :src="profile[0]"
            alt="profile picture"
            width="300px"
            height="300px"
          />
          <h2>{{ fname }} {{ lname }}</h2>
          <v-icon color="#014023">mdi-map-marker</v-icon>
          <h3>{{ location }}</h3>
          <v-icon color="#014023">mdi-email</v-icon>
          <h3>{{ contact }}</h3>
          <v-icon color="#014023">mdi-instagram</v-icon>
          <h3>@{{ insta }}</h3>
        </div>
        <h3>{{ about }}</h3>
      </div>
    </div>
  </v-app>
</template>
<script>
// import Header from "../components/TheHeader.vue";
// import { db } from "../config.js";

export default {
  name: "photographer",
  data() {
    return {
      fname: "",
      lname: "",
      about: "",
      contact: "",
      id: "",
      images: [],
      insta: "",
      location: "",
      max: null,
      min: null,
      type: "",
      profile: [],
    };
  },
  async mounted() {
    this.getPhotographer();
  },
  methods: {
    getPhotographer() {
      //get photographer from local storage
      let photographer = localStorage.getItem("photographer");
      //parse the string to JSON
      photographer = JSON.parse(photographer);
      //set the data
      this.fname = photographer.fname;
      this.lname = photographer.lname;
      this.about = photographer.about;
      this.contact = photographer.contact;
      this.id = photographer.id;
      this.images = photographer.images;
      this.insta = photographer.insta;
      this.location = photographer.location;
      this.max = photographer.max;
      this.min = photographer.min;
      this.type = photographer.type;
      this.profile = photographer.profile;
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
  height: 120%;
}
.body {
  margin: 36px 120px;
}
#inspire {
  background-color: #f2ede4;
}
.logo {
  color: #014023;
  text-decoration: none;
  font-family: "ivymode";
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 0.2rem;
  margin: 36px;
}
#pad {
  color: #014023;
  margin-right: 36px;
}

.p {
  margin-bottom: 0px;
}

.selections {
  border-style: none !important;
}
.v-btn {
  font-family: "ivyepic", sans-serif;
  letter-spacing: 0.1rem;
  font-style: bold;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  text-align: center;
}
</style>
