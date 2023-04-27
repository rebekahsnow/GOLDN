<template>
  <v-app id="inspire">
    <!-- <Header /> -->
    <v-main>
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
      <div class="welcome">
        <v-card class="login">
          <v-form fast-fail @submit.prevent>
            <v-text-field v-model="email" label="Email"></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              required
              type="password"
              :rules="[(v) => !!v || 'Password is required']"
            ></v-text-field>

            <v-btn type="submit" block class="mt-2" @click="login()"
              >Login</v-btn
            >
          </v-form>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../config.js";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      photographers: [],
      photographer_match: [],
      services: [],
      user: null,
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.user = user;
          console.log("USER ID", user.uid);
          console.log(this.photographer_match);
          this.getPhotographers();

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("error", errorMessage);
        });
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
        });
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
        console.log("photographer", photographer.loginId);
        //loop through services
        if (this.user.uid == photographer.loginId) {
          alert("photographer found");
          localStorage.setItem(
            "photographer",
            JSON.stringify(photographer)
          );
          this.$router.push("/profile");
        }
      });
    },
  },
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
.login{
    padding: 30px;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-family: "fields-display", sans-serif; */
  background-size: cover;
  background-repeat: no-repeat;
}
.p {
  margin-bottom: 0px;
}
#heading {
  /* font-family: "ivyepic"; */
  font-weight: 500;
  font-size: 48px;
  /* margin: 32px; */
  text-align: center;
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
  margin: 16px;
  font-size: 44px;
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
  font-family: "ivymode";
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 0.2rem;
  margin: 36px;
}
#pad {
  color: #014023;
  margin-right: 36px;
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
