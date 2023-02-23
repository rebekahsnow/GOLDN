<template>
  <div class="row justify-content-center">
    <v-card
      class="d-flex mx-10 mt-10 mb-15 pt-4 px-10"
      outlined
      id="search-bar-wrap"
    >
      <v-container
        >search for your photographer
        <v-autocomplete
          :items="available_types"
          v-model="type_selected"
          placeholder="Select an event type"
        ></v-autocomplete>
        <v-autocomplete
          :items="available_locations"
          v-model="location_selected"
          placeholder="Select your preferred location"
        ></v-autocomplete>
        <!-- <v-autocomplete
          :items="min_prices"
          v-model="min_selected"
          placeholder="What is your minimum budget? *change selection styling eventually*"
        ></v-autocomplete> -->
        <v-autocomplete
          :items="budget_prices"
          v-model="budget_selected"
          placeholder="What is your maximum budget?"
        ></v-autocomplete>
        <v-btn @click="search()">Search</v-btn>
      </v-container>
    </v-card>
    <div class="col-md-6">
      <div>match {{ user_match }}</div>
      <div v-for="user in users" :key="user.id">
        {{ user.services[0].type }}
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../config.js";

export default {
  data() {
    return {
      users: [],
      type_selected: "",
      location_selected: "",
      budget_selected: 0,
      min_selected: 0,
      available_types: ["wedding", "engagements", "family", "senior portraits"],
      available_locations: ["St.George", "Cedar City", "Provo"],
      budget_prices: [30, 40, 50, 60, 70, 80, 90, 100, 300, 400, 500, 600, 700, 800, 900, 1000, 2000,4000],
      show_results: false,
      user_match: [],
    };
  },
  created() {
    db.collection("users").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          this.users.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }else if (change.type == "removed") {
          this.users = this.users.filter((user) => user.id != change.doc.id);
        }else if (change.type == "modified") {
          this.users = this.users.map((user) => {
            if (user.id == change.doc.id) {
              return {
                ...change.doc.data(),
                id: change.doc.id,
              };
            } else {
              return user;
            }
          });
        }else{
          console.log("error")
        }
      });
    });
  },
  methods: {
    search() {
      this.user_match = [];
      this.users.forEach((user) => {
        if (
          user.services[0].type == this.type_selected &&
          user.location == this.location_selected &&
          user.services[0].max >= this.budget_selected &&
          user.services[0].min <= this.budget_selected
        ) {
          console.log("match")
          this.user_match.push(user);
        }
      });
    },
    // onFormSubmit(event) {
    //   event.preventDefault();
    //   db.collection("users")
    //     .add(this.user)
    //     .then(() => {
    //       alert("User successfully created!");
    //       this.user.name = "";
    //       this.user.email = "";
    //       this.user.phone = "";
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>
