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
        <div class="profile1">
          <div>
            <img :src="profile[0]" class="profilePic" />
          </div>
          <div class="profileInfo">
            <div class="iconHead">
              <!-- <v-icon color="#014023" class="icon">mdi-flare</v-icon> -->
              <h2>{{ fname }} {{ lname }}</h2>
            </div>
            <div class="iconHead">
              <v-icon color="#014023" class="icon">mdi-map-marker</v-icon>
              <h3>{{ location }}</h3>
            </div>
            <div class="iconHead">
              <v-icon color="#014023" class="icon">mdi-cellphone</v-icon>
              <h3>{{ contact }}</h3>
            </div>
            <div class="iconHead">
              <v-icon color="#014023" class="icon">mdi-instagram</v-icon>
              <h3>@{{ insta }}</h3>
            </div>
          </div>
        </div>
        <div class="about">{{ about }}</div>
        <h2>Pricing</h2>
        <div class="packages">
          <v-card class="package">
            <h3>Silver Package: ${{ min }}</h3>
            <li>1 hour session</li>
            <li>1 location</li>
            <li>80+ edited photos</li>
            <li>2 outfits</li>
          </v-card>
          <v-card class="package">
            <h3>Gold Package: ${{ max }}</h3>
            <li>1.5 hours of shooting</li>
            <li>90+ edited photos</li>
            <li>1 or 2 (close) locations</li>
            <li>High resolution digital and downloadable gallery</li>
          </v-card>
        </div>
        <h2 style="margin:36px">{{ type }} Gallery</h2>
        <v-container class="center">
          <v-row>
            <v-col
              v-for="(image, index) in images"
              :key="index"
              cols="3"
              
            >
              <v-img :src="image" class="gallery"></v-img>
            </v-col>
          </v-row>
        </v-container>
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

      imageLayout: [
        { cols: 4 },
        {
          cols: 8,
          children: [{ cols: 12 }, { cols: 12 }],
        },
        { cols: 6 },
        { cols: 3 },
        { cols: 9 },
        { cols: 4 },
        { cols: 8 },
      ],
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
.icon {
  margin-right: 12px;
}
.iconHead {
  display: flex;
  margin: 12px;
}
.profileInfo {
  margin-left: 36px;
}
.profile1 {
  display: flex;
  margin-bottom: 36px;
  align-items: center;
}
.profilePic {
  border-radius: 50%;
  height: 150px;
  width: 150px;
  object-fit: cover;
  margin: 12px;
}
.about {
  margin: 36px 0px;
  font-size: 16px;
  letter-spacing: 0.1rem;
  line-height: 1.5;
  /* text-align: center; */
}
.gallery {
  /* height: 100%;
  width: 100%;
  object-fit: cover; */
  margin: 12px;
}
.center {
  align-items: center;
  margin: auto;
}
.package {
  width: 30%;
  margin: 36px;
  padding: 16px 36px;
}
.packages {
  display: flex;
  justify-content: center;
}
</style>
