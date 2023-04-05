<template>
  <v-app id="inspire">
    <div>
      <v-app-bar color="transparent" :elevation="0" height="100px">
        <v-toolbar-title class="title">
          <router-link to="/" class="logo">GOLDN.</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down" id="pad">
          <v-btn text to="/login">Sign In</v-btn>
          <v-btn text to="/photographer">Register</v-btn>
          <!-- <v-btn text to="/search"><v-icon>mdi-magnify</v-icon></v-btn> -->
        </v-toolbar-items>
      </v-app-bar>
      <div class="reg" center>
        <h1>Register as a Photographer</h1>
        <p>
          Whether you're just getting started or a seasoned professional, we are
          so excited for you to join us! <br />
          In order to match you with the ideal client, please take time to
          accurately fill out the forms below.
        </p>
      </div>
      <div center class="bar">
        <v-form ref="form">
          <v-container>
            <v-row class="rowpad">
              <v-text-field
                v-model="firstname"
                :counter="10"
                label="First name"
                :rules="nameRules"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-text-field
                v-model="lastname"
                :counter="10"
                label="Last name"
                :rules="nameRules"
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
              <v-text-field
                v-model="about"
                :counter="100"
                label="About you"
                required
              ></v-text-field>
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
            <div @click="showMore(services)">CONTINUE</div>
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
            </div>
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
            </div>
          </v-container>
          <v-btn @click="validate"> Submit </v-btn>
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
        "Family",
        "Headshots",
        "Senior Portrait",
        "Sports",
        "Styled",
        "Wedding",
      ],
      services: [],
      wedding: false,
      bridal: false,
      engagements: false,
      headshots: false,
      senior: false,
      sports: false,
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
          if (value?.length <= 9) return true;

          return "E-mail or phone # is requred.";
        },
      ],
      nameRules: [
        (value) => {
          if (value) return true;

          return "Name is requred.";
        },
        (value) => {
          if (value?.length <= 10) return true;

          return "Name must be less than 10 characters.";
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
      const storageRef = ref(storage, id + "/" + type + "/" + item.name);
      uploadBytes(storageRef, item).then((snapshot) => {
        console.log("Uploaded a blob or file!");
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
      // var image = this.file[0];
      db.collection("photographers")
        .add({
          firstname: this.firstname,
          lastname: this.lastname,
          contact: this.contact,
          about: this.about,
          insta: this.insta,
          location: this.location,
          services: this.services,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.uploadImages(docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
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
.logo {
  color: #014023;
  text-decoration: none;
  font-family: "gimlet-display";
  font-weight: bold;
  font-size: 36px;
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
