<template>
  <v-app id="inspire">
    <div>
      <v-app-bar color="transparent" :elevation="0" height="100px">
        <v-toolbar-title class="title">
          <router-link to="/" class="logo">GOLDN</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" id="pad">
          <v-btn text to="/login" class="nav">Sign In</v-btn>
          <v-btn text to="/register" class="nav">Register</v-btn>
          <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
        </v-toolbar-items>
      </v-app-bar>

      <div class="bar">
        <v-autocomplete
          :items="available_types"
          v-model="type_selected"
          placeholder="Type"
          rounded
        ></v-autocomplete>
        <v-autocomplete
          :items="available_locations"
          v-model="location_selected"
          placeholder="Photoshoot Location"
          rounded
        ></v-autocomplete>

        <v-text-field
          model-value="10.00"
          prefix="$"
          type="number"
          v-model="budget_selected"
          placeholder="Max Budget?"
          rounded
        ></v-text-field>

        <div class="search">
          <v-icon @click="search()">mdi-magnify</v-icon>
        </div>
      </div>
      <div v-if="!photographer_match.length" class="no_results">
        <v-progress-circular
          :size="100"
          color="#014023"
          indeterminate
        ></v-progress-circular>
      </div>

      <div class="photographer_card">
        <v-card
          max-width="30%"
          max-height="45%"
          class="ma-4"
          v-for="photographer in photographer_match"
          :key="photographer.id"
        >
          <!-- <div class="result_images">
            <img :src="photographer.images[0]" class="image_size" />
            <img :src="photographer.images[1]" class="image_size" />
            <img :src="photographer.images[2]" class="image_size" />
          </div> -->
          <v-carousel
            show-arrows-on-hover
            hide-delimiter-background
            class="image_size"
          >
            <v-carousel-item
              cover
              v-for="(item, i) in photographer.images"
              :key="i"
              :src="photographer.images[i]"
            ></v-carousel-item>
          </v-carousel>
          <div class="photographer_details">
            <div id="name">
              {{ photographer.fname }} {{ photographer.lname }}
            </div>
            <!-- <div class="detail">{{ photographer.location }}</div> -->
            <div class="detail">
              {{ photographer.type }} Packages <br />
              from ${{ photographer.min }} to ${{ photographer.max }}
            </div>
            <v-btn @click="viewMore(photographer.id)" id="green_btn">
              VIEW MORE
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </v-app>
</template>
<script>
// import Header from "../components/TheHeader.vue";
import { db } from "../config.js";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

export default {
  name: "search",
  data() {
    return {
      names: [],
      url: "",
      photographers: [],
      type_selected: "",
      location_selected: "",
      budget_selected: null,
      available_types: [
        "Couple",
        "Family",
        "Bridal/Wedding",
        "Portrait",
      ],
      available_locations: ["St.George", "Cedar City", "Utah County"],
      show_results: true,
      photographer_match: [],
      loading: false,
      selection: 1,
    };
  },
  async mounted() {
    this.getPhotographers();
  },
  methods: {
    viewMore(id) {
      // loop through each photographer in photographer_match and compare to id
      this.photographer_match.forEach((item, index) => {
        console.log(item);
        if (item.id == id) {
          localStorage.setItem("photographer", JSON.stringify(item));
          this.$router.push("/photographer");
        }
      });
    },
    populateSearch() {
      this.type_selected = localStorage.getItem("type");
      this.location_selected = localStorage.getItem("location");
      this.budget_selected = parseInt(localStorage.getItem("budget"));
    },
    getProfilePhoto(id) {
      var names = [];
      var urls = [];
      const storage = getStorage();
      const listRef = ref(storage, id + "/profile/");
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            var temp = itemRef.name.toString();
            names.push(temp);
            console.log(names);
          });
          for (let i = 0; i < names.length; i++) {
            const starsRef = ref(storage, id + "/profile/" + names[i]);
            // Get the download URL
            getDownloadURL(starsRef)
              .then((url) => {
                // Insert url into an <img> tag to "download"
                urls.push(url);
              })
              .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case "storage/object-not-found":
                    // File doesn't exist
                    break;
                  case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break;
                  case "storage/canceled":
                    // User canceled the upload
                    break;

                  case "storage/unknown":
                    // Unknown error occurred, inspect the server response
                    break;
                }
              });
          }
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(urls);
        }, 2000);
      });
    },

    getImages(id, folder) {
      var names = [];
      var urls = [];
      const storage = getStorage();
      const listRef = ref(storage, id + "/" + folder + "/");
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            var temp = itemRef.name.toString();
            names.push(temp);
            console.log(names);
          });
          for (let i = 0; i < names.length; i++) {
            const starsRef = ref(storage, id + "/" + folder + "/" + names[i]);
            // Get the download URL
            getDownloadURL(starsRef)
              .then((url) => {
                // Insert url into an <img> tag to "download"
                urls.push(url);
              })
              .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case "storage/object-not-found":
                    // File doesn't exist
                    break;
                  case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break;
                  case "storage/canceled":
                    // User canceled the upload
                    break;

                  case "storage/unknown":
                    // Unknown error occurred, inspect the server response
                    break;
                }
              });
          }
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(urls);
        }, 2000);
      });
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
        this.populateSearch();
        this.search();
      });
    },
    resetLocalStorage() {
      localStorage.setItem("type", this.type_selected);
      localStorage.setItem("location", this.location_selected);
      localStorage.setItem("budget", this.budget_selected);
    },
    search() {
      this.resetLocalStorage();
      this.photographer_match = [];
      this.photographers.forEach((photographer) => {
        //loop through services
        photographer.services.forEach((service) => {
          var min = Number(service.min);
          var max = Number(service.max);
          console.log(min);
          var type = service.service;
          var folder = type.toLowerCase();
          console.log("type", type);
          if (this.type_selected == "Bridal/Wedding"){
            folder = "wedding";
          }
          if (
            type == this.type_selected &&
            photographer.location == this.location_selected &&
            min <= this.budget_selected
          ) {
            this.getImages(photographer.id, folder).then((urls) => {
              console.log("first name", photographer.firstname);
              this.getProfilePhoto(photographer.id).then((url) => {
                console.log("url", url);
                this.photographer_match.push({
                  id: photographer.id,
                  fname: photographer.firstname,
                  lname: photographer.lastname,
                  contact: photographer.contact,
                  about: photographer.about,
                  insta: photographer.insta,
                  location: photographer.location,
                  type: type,
                  min: min,
                  max: max,
                  images: urls,
                  profile: url,
                });
              });
              // this.photographer_match.push({
              //   id: photographer.id,
              //   fname: photographer.firstname,
              //   lname: photographer.lastname,
              //   contact: photographer.contact,
              //   about: photographer.about,
              //   insta: photographer.insta,
              //   location: photographer.location,
              //   type: type,
              //   min: min,
              //   max: max,
              //   images: urls,
              // });
            });
          } else {
            // console.log(service)
            // console.log(photographer.location)
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
  font-family: "ivymode";
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 0.2rem;
  margin: 36px;
}
#pad {
  color: #014023;
  margin-right: 36px;
  /* font-family: "Gopher"; */
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
.photographer_card {
  display: flex;
  flex-wrap: wrap;
  margin: 3% 14%;
  justify-content: center;
}
.results {
  /* height: 250px;
  width: 70%; */
  border-radius: 40px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.result_images {
  padding: 18px 0px 14px 18px;
}
.image_size {
  object-fit: cover;
  object-position: 50% 50%;
  float: left;
  /* max-height: 300px;
  max-width: 500px; */
  padding: 8px;
  border-radius: 10px;
  max-height: 400px;
  max-width: 400px;
}
.photographer_details {
  text-align: center;
  color: #014023;
  padding: 18px 52px;
}
#name {
  font-size: 24px;
  text-transform: uppercase;
}
.detail {
  padding-bottom: 16px;
}
#green_btn {
  padding: 20px 15px 20px 25px;
  color: #ffffff;
  background-color: #014023;
  text-transform: uppercase;
  border-radius: 16px;
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
.v-btn {
  font-family: "ivymode", sans-serif;
  letter-spacing: 0.1rem;
  font-style: bold;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  text-align: center;
}
.no_results {
  text-align: center;
  margin: 250px 120px;
}
</style>
