<template>
  <v-app id="inspire">
    <div>
      <v-app-bar color="transparent" :elevation="0" height="100px">
        <v-toolbar-title class="title">
          <router-link to="/" class="logo">GOLDN</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" id="pad">
          <v-btn text to="/login" class="nav">Sign Out</v-btn>
          <v-btn text to="/register" class="nav">Register</v-btn>
          <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
        </v-toolbar-items>
      </v-app-bar>
      <div class="reg" center>
        <h2>My Profile</h2>
        <p>
          Edit your profile information below to keep your prices and services
          up to date.
        </p>
      </div>
      <!-- <v-btn @click="prepServices()"> SERVICE </v-btn> -->

      <div center class="bar">
        <v-form ref="form">
          <v-container>
            <v-row class="rowpad">
              <v-text-field
                v-model="firstname"
                label="First name"
                :rules="[(v) => !!v || 'First name is required']"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-text-field
                v-model="lastname"
                label="Last name"
                :rules="[(v) => !!v || 'Last name is required']"
              ></v-text-field>
            </v-row>

            <v-row class="rowpad">
              <v-text-field
                v-model="contact"
                label="Preferred contact"
                required
                :rules="contactRules"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-text-field
                v-model="insta"
                :counter="50"
                label="Link to instagram profile"
                :rules="[(v) => !!v || 'URL is required']"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-textarea
                height="50px"
                v-model="about"
                :counter="1000"
                label="About you"
                required
                variant="underlined"
                :rules="[(v) => !!v || 'About you is required']"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-select
                clearable
                chips
                variant="underlined"
                v-model="location"
                :items="locations"
                :rules="[(v) => !!v || 'Selection is required']"
                label="Location"
                required
              ></v-select>
            </v-row>
            <v-row class="rowpad">
              <v-select
                clearable
                chips
                label="Select photography services offered"
                :items="types"
                v-model="services"
                multiple
                variant="underlined"
                :rules="[(v) => !!v || 'Selection is required']"
              ></v-select>
            </v-row>
            <!-- <v-btn class="btn" @click="showMore(services)">CONTINUE</v-btn> -->
            <v-btn class="btn" @click="updateDB()">SAVE</v-btn>
            <div v-if="bridal">
              <!-- Upload examples of your bridal photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Bridal Images"
                v-model="bridalFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_bridal"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_bridal"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
            <div v-if="engagements">
              <!-- Upload examples of your engagement photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Engagement Images"
                v-model="engagementsFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_engagements"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_engagements"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
            <div v-if="wedding">
              <!-- Upload examples of your wedding photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Wedding Images"
                v-model="weddingFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_wedding"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_wedding"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
            <div v-if="family">
              <!-- Upload examples of your family photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Family Images"
                v-model="familyFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_family"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_family"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
            <div v-if="headshots">
              <!-- Upload examples of your headshot photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Headshot Images"
                v-model="headshotsFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_headshots"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_headshots"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
            <div v-if="sports">
              <!-- Upload examples of your senior photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Sports Images"
                v-model="sportsFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_sports"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_sports"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
            <div v-if="senior">
              <!-- Upload examples of your senior photography -->
              <v-file-input
                multiple
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Senior Images"
                v-model="seniorFiles"
              ></v-file-input>
              <v-text-field
                prefix="$"
                type="number"
                v-model="min_senior"
                placeholder="Minimum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
              <v-text-field
                prefix="$"
                type="number"
                v-model="max_senior"
                placeholder="Maximum Price?"
                :rules="[(v) => !!v || 'Price is required']"
              ></v-text-field>
            </div>
          </v-container>
          <div
            v-if="
              senior ||
              sports ||
              headshots ||
              family ||
              wedding ||
              engagements ||
              bridal
            "
          >
            <v-btn class="btn" @click="validate"> Submit </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </v-app>
</template>
<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../config.js";

// import { storage } from "../config.js";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      contact: "",
      about: "",
      insta: "",
      locations: ["Cedar City", "St.George", "Utah County"],
      location: "",
      types: [
        "Couple",
        "Family",
        "Bridal/Wedding",
        "Portrait",
      ],
      services: [],
      wedding: false,
      bridal: false,
      engagements: false,
      headshots: false,
      senior: false,
      sports: false,
      family: false,
      min_bridal: "",
      max_bridal: "",
      min_engagements: "",
      max_engagements: "",
      min_wedding: "",
      max_wedding: "",
      min_family: "",
      max_family: "",
      min_headshots: "",
      max_headshots: "",
      min_senior: "",
      max_senior: "",
      min_sports: "",
      max_sports: "",
      familyFiles: [],
      weddingFiles: [],
      bridalFiles: [],
      engagementsFiles: [],
      headshotsFiles: [],
      seniorFiles: [],
      sportsFiles: [],
      // file: [],
      contactRules: [
        (value) => {
          if (value) return true;

          return "E-mail or phone # is requred.";
        },
        (value) => {
          if (value?.length >= 9) return true;

          return "E-mail or phone # is requred.";
        },
      ],
      valid: true,
    };
  },
  async mounted() {
    this.loadPhotographer();

  },
  methods: {
    updateDB(){
      // update fields in database
      db.collection("photographers")
        .doc(this.photographerId)
        .update({
          firstname: this.firstname,
          lastname: this.lastname,
          contact: this.contact,
          about: this.about,
          insta: this.insta,
          location: this.location,
          services: this.services,
        })
        .then(() => {
          alert("Document successfully updated!");

        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
    populateServices(photographer){
      photographer.services.forEach(type => {
        this.services.push(type.service);
      });
    },
    loadPhotographer(){
        const photographer = JSON.parse(localStorage.getItem("photographer"));
        this.photographerId = photographer.id;
        this.firstname = photographer.firstname;
        this.lastname = photographer.lastname;
        this.contact = photographer.contact;
        this.about = photographer.about;
        this.insta = photographer.insta;
        this.location = photographer.location;
        this.populateServices(photographer);
    //     this.wedding = photographer.wedding;
    //     this.bridal = photographer.bridal;
    //     this.engagements = photographer.engagements;
    //     this.headshots = photographer.headshots;
    //     this.senior = photographer.senior;
    //     this.sports = photographer.sports;
    //     this.family = photographer.family;
    //     this.min_bridal = photographer.min_bridal;
    //     this.max_bridal = photographer.max_bridal;
    //     this.min_engagements = photographer.min_engagements;
    //     this.max_engagements = photographer.max_engagements;
    //     this.min_wedding = photographer.min_wedding;
    //     this.max_wedding = photographer.max_wedding;
    //     this.min_family = photographer.min_family;
    //     this.max_family = photographer.max_family;
    //     this.min_headshots = photographer.min_headshots;
    //     this.max_headshots = photographer.max_headshots;
    //     this.min_senior = photographer.min_senior;
    //     this.max_senior = photographer.max_senior;
    //     this.min_sports = photographer.min_sports;
    //     this.max_sports = photographer.max_sports;
    //     this.familyFiles = photographer.familyFiles;
    //     this.weddingFiles = photographer.weddingFiles;
    //     this.bridalFiles = photographer.bridalFiles;
    //     this.engagementsFiles = photographer.engagementsFiles;
    //     this.headshotsFiles = photographer.headshotsFiles;
    //     this.seniorFiles = photographer.seniorFiles;
    //     this.sportsFiles = photographer.sportsFiles;
    }
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
.v-select--chips .v-select__selections {
  min-height: 0px;
}
#inspire {
  background-color: #f2ede4;
}
.btn {
  display: flex;
  margin: auto;
}
.logo {
  color: #014023;
  text-decoration: none;
  font-family: "ivymode";
  font-size: 36px;
  font-weight: bold;
  letter-spacing: .2rem;
  margin: 36px;
}
p {
  margin: 32px 0px;
}
.bar {
  width: 80%;
  background: white;
  box-shadow: 0 0 5px hsl(0 0% 78%);
  border-radius: 20px;
  padding: 30px;
  margin: auto;
  margin-top: 36px;
}
.reg {
  width: 80%;
  margin: auto;
}
.rowpad {
  padding: 16px 0px;
}
</style>
