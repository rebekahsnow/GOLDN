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
          <v-btn text to="/photographer">Register</v-btn>
          <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
        </v-toolbar-items>
      </v-app-bar>

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
          placeholder="Photoshoot Location"
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

      <div
        v-for="photographer in photographer_match"
        :key="photographer.id"
        style="margin: 30px 0px"
      >
        <v-card class="results">
          <div>
            <div class="align2"></div>
            <div class="align2" id="photographer_details">
              <h3 style="color: #014023">
                {{ photographer.fname }} {{ photographer.lname }}
              </h3>
              {{ photographer.location }}
              {{ photographer.type }} packages from ${{ photographer.min }} to
              ${{ photographer.max }}
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </v-app>
</template>
<script>
// import Header from "../components/TheHeader.vue";
import { db } from "../config.js";

export default {
  data() {
    return {
      photographers: [],
      type_selected: "",
      location_selected: "",
      budget_selected: 0,
      min_selected: 0,
      available_types: [
        "Bridal",
        "Engagements",
        "Family",
        "Headshots",
        "Senior Portrait",
        "Sports",
        "Styled",
        "Wedding",
      ],
      available_locations: ["St.George", "Cedar City", 'Utah County'],
      budget_prices: [
        30, 40, 50, 60, 70, 80, 90, 100, 300, 400, 500, 600, 700, 800, 900,
        1000, 2000, 4000,
      ],
      show_results: true,
      photographer_match: [],
      loading: false,
      selection: 1,
    };
  },
  created() {
    this.getPhotographers();
    this.populateSearch();

    //why isnt search being called with a full list of photographers?
    this.search();
  },
  methods: {
    populateSearch() {
      this.type_selected = localStorage.getItem("type");
      this.location_selected = localStorage.getItem("location");
      console.log(this.location_selected);
      this.budget_selected = parseInt(localStorage.getItem("budget"));
    },
    getPhotographers() {
      db.collection("photographers").onSnapshot((res) => {
        const changes = res.docChanges();
        changes.forEach((change) => {
          if (change.type == "added") {
            this.photographers.push({
              ...change.doc.data(),
              id: change.doc.id,
            });
          }
          // else if (change.type == "removed") {
          //   this.photographers = this.photographers.filter(
          //     (photographer) => photographer.id != change.doc.id
          //   );
          // } else if (change.type == "modified") {
          //   this.photographers = this.photographers.map((photographer) => {
          //     if (photographer.id == change.doc.id) {
          //       return {
          //         ...change.doc.data(),
          //         id: change.doc.id,
          //       };
          //     } else {
          //       return photographer;
          //     }
          //   });
          // } else {
          //   console.log("error");
          // }
        });
      });
    },
    search() {
      console.log("search");
      this.photographer_match = [];
      console.log("this should be full", this.photographers);

      this.photographers.forEach((photographer) => {
        //loop through services

        photographer.services.forEach((service) => {
          if (
            service.type == this.type_selected &&
            photographer.location == this.location_selected &&
            // service.max >= this.budget_selected &&
            service.min <= this.budget_selected
          ) {
            console.log("match");
            this.photographer_match.push({
              fname: photographer.fname,
              lname: photographer.lname,
              location: photographer.location,
              type: service.type,
              max: service.max,
              min: service.min,
            });
          } else {
            console.log("no match");
          }
        });
      });
    },
  },
  // components: {
  //   Header,
  // },
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
.v-select__slot {
  margin-bottom: 24px;
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

.p {
  margin-bottom: 0px;
}

.welcome {
  border: 6px solid #ca6b0b;
  padding: 36px;
  padding-right: 136px;
  text-align: left;
  background-color: #ca6b0b;
  margin-right: -100px;
  border-radius: 32px;
}

.bar {
  width: 70%;
  background: white;
  box-shadow: 0 0 5px hsl(0 0% 78%);
  height: 70px;
  border-radius: 100vw;
  display: flex;
  justify-content: center;
  font-size: 0.6rem;
  margin: auto;
  margin-top: 36px;
}
.results {
  height: 250px;
  width: 70%;
  border-radius: 40px;
  margin: auto;
}
.alignContainer {
  padding: 20px;
}
.align2 {
}
.result_images {
  width: 200px;
  display: flex;
}
#photographer_details {
  text-align: center;
  color: #014023;
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
.v-select__slot {
  margin-bottom: 24px;
}
</style>
