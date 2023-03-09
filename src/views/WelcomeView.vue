<template>
  <v-app id="inspire">
    <!-- <Header /> -->
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
      <div class="welcome">
        <h1 style="font-weight: bold">Find the perfect photographer</h1>
        <h3 id="info">For your next golden hour</h3>
      </div>
      <div class="bar">
        <v-autocomplete
          :items="available_types"
          v-model="type_selected"
          placeholder="Photoshoot Type"
          rounded
        ></v-autocomplete>
        <v-autocomplete
          :items="available_locations"
          v-model="location_selected"
          placeholder="Location"
          rounded
        ></v-autocomplete>

        <v-autocomplete
          :items="budget_prices"
          v-model="budget_selected"
          placeholder="Max Budget?"
          rounded
        ></v-autocomplete>

        <div class="search">
          <v-icon @click="search()">mdi-magnify</v-icon>
        </div>
      </div>
      <v-card>
        <div class="col-md-6">
          <!-- <div>match {{ user_match }}</div> -->
          <div v-for="user in user_match" :key="user.id">
            <h3>{{ user.fname }} {{ user.lname }}</h3>
            {{ user.services[0].type }} Photographer in {{ user.location }}
            <br />
            Packages from ${{ user.services[0].min }} to ${{
              user.services[0].max
            }}
          </div>
        </div>
      </v-card>
    </div>
  </v-app>
</template>
<script>
// import Header from "../components/TheHeader.vue";
import { db } from "../config.js";
export default {
  data() {
    return {
      users: [],
      type_selected: "",
      location_selected: "",
      budget_selected: 0,
      min_selected: 0,
      available_types: ["Wedding", "Engagements", "Family", "Senior Portraits"],
      available_locations: ["St.George", "Cedar City", "Provo"],
      budget_prices: [
        30, 40, 50, 60, 70, 80, 90, 100, 300, 400, 500, 600, 700, 800, 900,
        1000, 2000, 4000,
      ],
      show_results: false,
      user_match: [],
    };
  },
  methods: {
    search() {
      localStorage.setItem("type", this.type_selected);
      localStorage.setItem("location", this.location_selected);
      localStorage.setItem("budget", this.budget_selected);
      this.$router.push({
        path: "/search",
      });
    },
  },
  // components: {
  // Header,
  // },
};
</script>
<style scoped>
* {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  background-size: cover;
  background-repeat: no-repeat;
}

.p {
  margin-bottom: 0px;
}
#inspire {
  background-image: url("../assets/horizon.png");
  background-repeat: no-repeat, repeat;
  background-size: cover;
  position: relative;
  height: 100%;
  width: 100%;
}

.welcome {
  width: 700px;
  justify-content: center;
  margin: auto;
  padding-top: 125px;
}
#info {
  color: #014023;
  margin: 16px;
  text-transform: uppercase;
}

.bar {
  width: 830px;
  background: white;
  box-shadow: 0 0 5px hsl(0 0% 78%);
  height: 70px;
  border-radius: 100vw;
  display: flex;
  justify-content: center;
  font-size: 0.6rem;
  margin: auto;
  margin-top: 120px;
}

.bar div {
  border-radius: inherit;
  padding: 1.2rem 1.5rem;
  transition: background 250ms ease;
}

.bar div:hover {
  background: hsl(0 0% 94%);
}

.location {
  width: 34%;
}
.check-in,
.check-out,
.guests {
  width: 22%;
}
.search {
  display: flex;
}
input[type="text"] {
  background: none;
  border: none;
  padding: 0.2rem 0 0 0;
}

input[type="text"]:focus {
  outline: none;
}

::placeholder {
  font-size: 0.75rem;
}

.guests {
  position: relative;
}
#span {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: #ff385c;
  color: white;
  font-size: 0.8rem;
  padding: 0.7rem;
  border-radius: 50%;
}

.bar > div {
  position: relative;
}

.bar > div::before {
  position: absolute;
  content: "";
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 55%;
  background: hsl(0 0% 90%);
}

.bar > div:nth-of-type(1)::before {
  background: transparent;
}

.bar > div:hover::before {
  background: transparent;
}

.selections {
  border-style: none !important;
}
.logo {
  color: #014023;
  text-decoration: none;
  font-family: "Gopher-Heavy";
  font-size: 36px;
  margin: 36px;
}
#pad {
  color: #014023;
  margin-right: 36px;
  font-family: "Gopher";
}
</style>
