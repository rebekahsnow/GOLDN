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
          <v-btn text to="/photographer" class="nav">Register</v-btn>
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
            <v-btn class="btn">SAVE</v-btn>
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
        "Bridal",
        "Engagements",
        "Wedding",
        "Family",
        "Headshots",
        "Senior Portrait",
        "Sports",
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

  methods: {
    async validate() {
      const valid = await this.$refs.form.validate();
      console.log(valid);
      if (valid) {
        this.postPhotographer();
      }
    },
    showMore(items) {
      for (var service in items) {
        if (items[service] == "Wedding") {
          this.wedding = true;
        }
        if (items[service] == "Bridal") {
          this.bridal = true;
        }
        if (items[service] == "Engagements") {
          this.engagements = true;
        }
        if (items[service] == "Family") {
          this.family = true;
        }
        if (items[service] == "Headshots") {
          this.headshots = true;
        }
        if (items[service] == "Sports") {
          this.sports = true;
        }
        if (items[service] == "Senior Portrait") {
          this.senior = true;
        }
      }
    },
    uploadImage(item, id, type) {
      //upload wedding upage to firebase storage
      const storage = getStorage();
      console.log("jpeg?", item.type);
      const storageRef = ref(storage, id + "/" + type + "/" + item.name);
      uploadBytes(storageRef, item)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
          this.resetFields();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadImages(id) {
      for (var item in this.weddingFiles) {
        this.uploadImage(this.weddingFiles[item], id, "wedding");
      }
      for (var item in this.bridalFiles) {
        this.uploadImage(this.bridalFiles[item], id, "bridal");
      }
      for (var item in this.engagementsFiles) {
        this.uploadImage(this.engagementsFiles[item], id, "engagements");
      }
      for (var item in this.familyFiles) {
        this.uploadImage(this.familyFiles[item], id, "family");
      }
      for (var item in this.headshotsFiles) {
        this.uploadImage(this.headshotsFiles[item], id, "headshots");
      }
      for (var item in this.seniorFiles) {
        this.uploadImage(this.seniorFiles[item], id, "senior");
      }
      for (var item in this.sportsFiles) {
        this.uploadImage(this.sportsFiles[item], id, "sports");
      }
    },
    postPhotographer() {
      var items = [];
      for (var service in this.services) {
        console.log("this", this.services[service]);
        if (this.services[service] == "Wedding") {
          items.push({
            service: this.services[service],
            min: this.min_wedding,
            max: this.max_wedding,
          });
        }
        if (this.services[service] == "Bridal") {
          items.push({
            service: this.services[service],
            min: this.min_bridal,
            max: this.max_bridal,
          });
        }
        if (this.services[service] == "Engagements") {
          items.push({
            service: this.services[service],
            min: this.min_engagements,
            max: this.max_engagements,
          });
        }
        if (this.services[service] == "Family") {
          items.push({
            service: this.services[service],
            min: this.min_family,
            max: this.max_family,
          });
        }
        if (this.services[service] == "Headshots") {
          items.push({
            service: this.services[service],
            min: this.min_headshots,
            max: this.max_headshots,
          });
        }
        if (this.services[service] == "Senior Portrait") {
          items.push({
            service: this.services[service],
            min: this.min_senior,
            max: this.max_senior,
          });
        }
        if (this.services[service] == "Sports") {
          items.push({
            service: this.services[service],
            min: this.min_sports,
            max: this.max_sports,
          });
        }
      }
      db.collection("photographers")
        .add({
          firstname: this.firstname,
          lastname: this.lastname,
          contact: this.contact,
          about: this.about,
          insta: this.insta,
          location: this.location,
          services: items,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.uploadImages(docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    resetFields() {
      //successful registration
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
