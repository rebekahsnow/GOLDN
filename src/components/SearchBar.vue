<template>
  <div class="bar">
    <v-autocomplete
      :items="available_types"
      v-model="type_selected"
      placeholder="Style"
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
</template>

<script>
export default {
  data() {
    return {
      available_types: ["wedding", "engagements", "family", "senior portraits"],
      available_locations: ["St.George", "Cedar City", "Provo"],
      budget_prices: [
        30, 40, 50, 60, 70, 80, 90, 100, 300, 400, 500, 600, 700, 800, 900,
        1000, 2000, 4000,
      ],
      type_selected: "",
      location_selected: "",
      budget_selected: 0,
    };
  },
  created() {},
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
  },
};
</script>

<style>
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
