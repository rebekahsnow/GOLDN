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
      <div class="reg" center v-if="view1">
        <h2>Photographer Registration</h2>
        <p>
          Whether you're just getting started or a seasoned professional, we are
          so excited for you to join us! <br />
          In order to match you with the ideal client, please take time to
          accurately fill out the forms below.
        </p>
      </div>
      <div class="reg" center v-if="view2">
        <h2>Upload Images to Your Portfolio</h2>
        <p>
          For the best results crop your photos to 350px by 350px. For services
          that may overlap in category <br />
          (i.e. wedding and couple) you may need to include the same information
          in both categories to ensure you are matched with the right client!
        </p>
      </div>
      <div center class="bar" v-if="view1">
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
                v-model="email"
                label="Email"
                required
                :rules="[(v) => !!v || 'Email is required']"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                label="Profile Photo"
                v-model="profilePhoto"
              ></v-file-input>
            </v-row>

            <v-row class="rowpad">
              <v-text-field
                v-model="contact"
                label="Preferred contact"
                required
                :rules="[(v) => !!v || 'Contact information is required']"
              ></v-text-field>
            </v-row>
            <v-row class="rowpad">
              <v-text-field
                v-model="insta"
                :counter="50"
                label="Instagram handle"
                :rules="[(v) => !!v || 'Instagram username is required']"
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
                variant="underlined"
                v-model="services"
                :items="types"
                label="Select photography services offered"
                :rules="[(v) => v.length > 0 || 'Selection is required']"
                multiple
                required
              ></v-select>
            </v-row>
          </v-container>
        </v-form>
      </div>
      <div v-if="view1" class="btns">
        <v-btn class="btn" @click="validate(services)">NEXT</v-btn>
      </div>

      <!-- VIEW 2 -->

      <div v-if="couple">
        <div v-if="view2" center class="bar">
          <v-form ref="form2">
            <v-container>
              <!-- Upload examples of your couple photography -->
              <v-row class="rowpad">
                <v-file-input
                  multiple
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Couple Images"
                  v-model="coupleFiles"
                ></v-file-input>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="min_couple"
                  label="Minimum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="max_couple"
                  label="Maximum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  type="number"
                  v-model="couple_types"
                  label="# Different Couple Packages Offered"
                  variant="underlined"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>

      <div v-if="family">
        <div v-if="view2" center class="bar">
          <v-form ref="form2">
            <v-container>
              <!-- Upload examples of your family photography -->
              <v-row class="rowpad">
                <v-file-input
                  multiple
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Family Images"
                  v-model="familyFiles"
                ></v-file-input>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="min_family"
                  label="Minimum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="max_family"
                  label="Maximum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  type="number"
                  v-model="family_types"
                  label="# Different Family Packages Offered"
                  variant="underlined"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>

      <div v-if="wedding">
        <div v-if="view2" center class="bar">
          <v-form ref="form2">
            <v-container>
              <!-- Upload examples of your wedding photography -->
              <v-row class="rowpad">
                <v-file-input
                  multiple
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Wedding Images"
                  v-model="weddingFiles"
                ></v-file-input>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="min_wedding"
                  label="Minimum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="max_wedding"
                  label="Maximum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  type="number"
                  v-model="wedding_types"
                  label="# Different Bridal/Wedding Packages Offered"
                  variant="underlined"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>

      <div v-if="portrait">
        <div v-if="view2" center class="bar">
          <v-form ref="form2">
            <v-container>
              <!-- Upload examples of your portrait photography -->
              <v-row class="rowpad">
                <v-file-input
                  multiple
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Portrait Images"
                  v-model="portraitFiles"
                ></v-file-input>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="min_portrait"
                  label="Minimum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="max_portrait"
                  label="Maximum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  type="number"
                  v-model="portrait_types"
                  label="# Different Portrait Packages Offered"
                  variant="underlined"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>

      <div v-if="sports">
        <div v-if="view2" center class="bar">
          <v-form ref="form2">
            <v-container>
              <!-- Upload examples of your senior photography -->
              <v-row class="rowpad">
                <v-file-input
                  multiple
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Sports Images"
                  v-model="sportsFiles"
                ></v-file-input>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="min_sports"
                  label="Minimum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  prefix="$"
                  type="number"
                  v-model="max_sports"
                  label="Maximum Price?"
                  :rules="[(v) => !!v || 'Price is required']"
                ></v-text-field>
              </v-row>
              <v-row class="rowpad">
                <v-text-field
                  type="number"
                  v-model="sports_types"
                  label="# Different Sports Packages Offered"
                  variant="underlined"
                ></v-text-field>
              </v-row>
            </v-container>
          </v-form>
        </div>
      </div>

      <div v-if="view2" class="btns">
        <v-btn class="btn" @click="back()">BACK</v-btn>
        <v-btn class="btn" @click="validate2()">NEXT</v-btn>
      </div>

      <!-- VIEW 3 -->
      <div v-if="couple">
        <div v-for="index in couple_types" :key="index">
          <div v-if="view3" center class="bar">
            <v-form ref="form3">
              <v-container>
                <p>Couple Package {{ index }}</p>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Name"
                    :rules="[(v) => !!v || 'Package Name is required']"
                    v-model="couple_names[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Description. Ex (1 hour, 2 locations, 50 edited images, 2 outfits)"
                    :rules="[(v) => !!v || 'Package Description is required']"
                    v-model="couple_descriptions[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Price"
                    :rules="[(v) => !!v || 'Price is required']"
                    v-model="couple_prices[index]"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </div>

      <div v-if="family">
        <div v-for="index in family_types" :key="index">
          <div v-if="view3" center class="bar">
            <v-form ref="form3">
              <v-container>
                <p>Family Package {{ index }}</p>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Name"
                    :rules="[(v) => !!v || 'Package Name is required']"
                    v-model="family_names[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Description. Ex (1 hour, 2 locations, 50 edited images, 2 outfits)"
                    :rules="[(v) => !!v || 'Package Description is required']"
                    v-model="family_descriptions[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Price"
                    :rules="[(v) => !!v || 'Price is required']"
                    v-model="family_prices[index]"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </div>

      <div v-if="wedding">
        <div v-for="index in wedding_types" :key="index">
          <div v-if="view3" center class="bar">
            <v-form ref="form3">
              <v-container>
                <p>Bridal/Wedding Package {{ index }}</p>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Name"
                    :rules="[(v) => !!v || 'Package Name is required']"
                    v-model="wedding_names[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Description. Ex (1 hour, 2 locations, 50 edited images, 2 outfits)"
                    :rules="[(v) => !!v || 'Package Description is required']"
                    v-model="wedding_descriptions[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Price"
                    :rules="[(v) => !!v || 'Price is required']"
                    v-model="wedding_prices[index]"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </div>

      <div v-if="portrait">
        <div v-for="index in portrait_types" :key="index">
          <div v-if="view3" center class="bar">
            <v-form ref="form3">
              <v-container>
                <p>Portrait Package {{ index }}</p>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Name"
                    :rules="[(v) => !!v || 'Package Name is required']"
                    v-model="portrait_names[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Description. Ex (1 hour, 2 locations, 50 edited images, 2 outfits)"
                    :rules="[(v) => !!v || 'Package Description is required']"
                    v-model="portrait_descriptions[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Price"
                    :rules="[(v) => !!v || 'Price is required']"
                    v-model="portrait_prices[index]"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </div>

      <div v-if="sports">
        <div v-for="index in sports_types" :key="index">
          <div v-if="view3" center class="bar">
            <v-form ref="form3">
              <v-container>
                <p>Sports Package {{ index }}</p>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Name"
                    :rules="[(v) => !!v || 'Package Name is required']"
                    v-model="sports_names[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Description. Ex (1 hour, 2 locations, 50 edited images, 2 outfits)"
                    :rules="[(v) => !!v || 'Package Description is required']"
                    v-model="sports_descriptions[index]"
                  ></v-text-field>
                </v-row>
                <v-row class="rowpad">
                  <v-text-field
                    label="Package Price"
                    :rules="[(v) => !!v || 'Price is required']"
                    v-model="sports_prices[index]"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </div>
      <div v-if="view3" class="btns">
        <v-btn @click="back2()" class="btn">BACK</v-btn>
        <v-btn @click="submit()" class="btn">SUBMIT</v-btn>
      </div>
    </div>
  </v-app>
</template>
<script>
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { db } from "../config.js";

// import { storage } from "../config.js";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      profilePhoto: [],
      contact: "",
      about: "",
      insta: "",
      locations: ["Cedar City", "St.George", "Utah County"],
      location: "",
      types: ["Couple", "Family", "Bridal/Wedding", "Portrait"],

      services: [],

      couple: false,
      family: false,
      wedding: false,
      portrait: false,
      sports: false,

      min_couple: "",
      max_couple: "",
      min_family: "",
      max_family: "",
      min_wedding: "",
      max_wedding: "",
      min_portrait: "",
      max_portrait: "",
      min_sports: "",
      max_sports: "",

      coupleFiles: [],
      familyFiles: [],
      weddingFiles: [],
      portraitFiles: [],
      sportsFiles: [],

      couple_types: 0,
      family_types: 0,
      wedding_types: 0,
      portrait_types: 0,
      sports_types: 0,

      couple_names: [],
      couple_descriptions: [],
      couple_prices: [],

      family_names: [],
      family_descriptions: [],
      family_prices: [],

      wedding_names: [],
      wedding_descriptions: [],
      wedding_prices: [],

      portrait_names: [],
      portrait_descriptions: [],
      portrait_prices: [],

      sports_names: [],
      sports_descriptions: [],
      sports_prices: [],

      // file: [],
      // contactRules: [
      //   (value) => {
      //     if (value) return true;

      //     return "E-mail or phone # is requred.";
      //   },
      //   (value) => {
      //     if (value?.length >= 9) return true;

      //     return "E-mail or phone # is requred.";
      //   },
      // ],
      valid: true,
      view1: true,
      view2: false,
      view3: false,
      user: null,
      loginId: "",
    };
  },

  methods: {
    createUser() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          this.user = userCredential.user;
          this.loginId = this.user.uid;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
    back() {
      this.view1 = true;
      this.view2 = false;
      this.view3 = false;
    },
    back2() {
      this.view2 = true;
      this.view3 = false;
    },
    async validate(items) {
      const valid = await this.$refs.form.validate();
      // console.log(valid);
      if (valid) {
        this.showMore(items);
        this.view1 = false;
        this.view2 = true;
      }
      this.createUser();
    },
    async validate2() {
      const valid = await this.$refs.form2.validate();
      // console.log(valid);
      if (valid) {
        this.view2 = false;
        this.view3 = true;
        this.couple_types = Number(this.couple_types);
        this.family_types = Number(this.family_types);
        this.wedding_types = Number(this.wedding_types);
        this.portrait_types = Number(this.portrait_types);
        this.sports_types = Number(this.sports_types);
      }
    },
    showMore(items) {
      this.view1 = false;
      this.view2 = true;
      for (var service in items) {
        if (items[service] == "Couple") {
          this.couple = true;
        }
        if (items[service] == "Family") {
          this.family = true;
        }
        if (items[service] == "Bridal/Wedding") {
          this.wedding = true;
        }
        if (items[service] == "Portrait") {
          this.portrait = true;
        }
        if (items[service] == "Sports") {
          this.sports = true;
        }
      }
    },
    async submit() {
      // const valid = await this.$refs.form3.validate();
      // if (valid) {
      this.postPhotographer();
      alert("POSTING PHOTOGRAPHER INFO");
      // }
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
      this.uploadImage(this.profilePhoto, id, "profile");
      for (var item in this.coupleFiles) {
        this.uploadImage(this.coupleFiles[item], id, "couple");
      }
      for (var item in this.familyFiles) {
        this.uploadImage(this.familyFiles[item], id, "family");
      }
      for (var item in this.weddingFiles) {
        this.uploadImage(this.weddingFiles[item], id, "wedding");
      }
      for (var item in this.portraitFiles) {
        this.uploadImage(this.portraitFiles[item], id, "portrait");
      }
      for (var item in this.sportsFiles) {
        this.uploadImage(this.sportsFiles[item], id, "sports");
      }
    },
    postPhotographer() {
      var items = [];
      for (var service in this.services) {
        console.log("this", this.services[service]);
        if (this.services[service] == "Couple") {
          console.log("TESTING", this.couple_names);
          items.push({
            service: this.services[service],
            min: this.min_couple,
            max: this.max_couple,
            // package_names: this.couple_names,
            // package_descriptions: this.couple_descriptions,
            // package_prices: this.couple_prices,
          });
        }
        if (this.services[service] == "Family") {
          items.push({
            service: this.services[service],
            min: this.min_family,
            max: this.max_family,
            // package_names: this.family_names,
            // package_descriptions: this.family_descriptions,
            // package_prices: this.family_prices,
          });
        }
        if (this.services[service] == "Bridal/Wedding") {
          items.push({
            service: this.services[service],
            min: this.min_wedding,
            max: this.max_wedding,
            // package_names: this.wedding_names,
            // package_descriptions: this.wedding_descriptions,
            // package_prices: this.wedding_prices,
          });
        }
        if (this.services[service] == "Portrait") {
          items.push({
            service: this.services[service],
            min: this.min_portrait,
            max: this.max_portrait,
            // package_names: this.portrait_names,
            // package_descriptions: this.portrait_descriptions,
            // package_prices: this.portrait_prices,
          });
        }
        // if (this.services[service] == "Sports") {
        //   items.push({
        //     service: this.services[service],
        //     min: this.min_sports,
        //     max: this.max_sports,
        //     // package_names: this.sports_names,
        //     // package_descriptions: this.sports_descriptions,
        //     // package_prices: this.sports_prices,
        //   });
        // }
      }
      db.collection("photographers")
        .add({
          loginId: this.loginId,
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
.btns {
  display: block;
  text-align: center;
}
.btn {
  margin: 32px;
  background-color: #014023 !important;
  color: white;
  font-size: 21px;
  padding: 21px !important;
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
.theme--light.v-input input,
.theme--light.v-input textarea {
  text-align: left !important;
}
.theme--light.v-input input,
.theme--light.v-input textarea {
  text-align: left !important;
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
</style>
