<template>
  <v-app id="inspire">
    <Header />
    <div>
      <div class="welcome">
        <h1>Find the perfect photographer</h1>
        <p>
          Welcome to Golden, the ultimate platform for finding the perfect local
          photographer for your event without breaking the bank! Whether you're
          planning a wedding, birthday party, or corporate event, we've got you
          covered. With our user-friendly search tool, you can easily filter
          through our database of talented photographers to find the perfect
          match for your needs and budget. Say goodbye to the hassle of endless
          searching and let us help you capture your special moments with ease.
          Let's get started!</p>
        
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
import Header from "../components/TheHeader.vue";
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
      budget_prices: [
        30, 40, 50, 60, 70, 80, 90, 100, 300, 400, 500, 600, 700, 800, 900,
        1000, 2000, 4000,
      ],
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
        } else if (change.type == "removed") {
          this.users = this.users.filter((user) => user.id != change.doc.id);
        } else if (change.type == "modified") {
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
        } else {
          console.log("error");
        }
      });
    });
  },
  methods: {
    search() {
      console.log("search");
      this.user_match = [];
      this.users.forEach((user) => {
        if (
          user.services[0].type == this.type_selected &&
          user.location == this.location_selected &&
          user.services[0].max >= this.budget_selected &&
          user.services[0].min <= this.budget_selected
        ) {
          console.log("match");
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
  components: {
    Header,
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

body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  background: url("https://images.unsplash.com/photo-1580196969807-cc6de06c05be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1579&q=80");
  background-size: cover;
  background-repeat: no-repeat;
}
.p {
  margin-bottom: 0px;
}

.welcome{
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
</style>
