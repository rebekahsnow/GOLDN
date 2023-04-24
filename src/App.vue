<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
.v-menu__content {
  margin-top: 32px;
}
h1 {
  color: #1e1e1e;
  font-family: "ivyepic";
  font-weight: 400;
  font-style: italic;
  /* font-weight: 700; */
  font-size: 72px;
  margin: 32px;
  text-align: center;
}
h2 {
  color: #1e1e1e;
  font-family: "ivyepic";
  font-weight: 400;
  font-style: italic;
  /* font-weight: 700; */
  font-size: 42px;
  margin: 32px;
  text-align: center;
}
p {
  color: #1e1e1e;
  text-align: center;
  font-size: 24px;
  margin: 24px;
}
.nav {
  font-family: "ivyepic", sans-serif;
  letter-spacing: 0.1rem;
  font-style: bold;
  font-weight: 600;
  line-height: 1.5;
  text-transform: uppercase;
  text-align: center;
}
.theme--light.v-input input,
.theme--light.v-input textarea {
  font-family: "ivyepic", sans-serif;
  letter-spacing: 0.1rem;
  font-style: bold;
  font-weight: 600;
  line-height: 1.5;
  /* text-align: center; */
}
.v-list-item .v-list-item__title,
.v-list-item .v-list-item__subtitle {
  font-family: "ivyepic", sans-serif;
  letter-spacing: 0.1rem;
  font-style: bold;
  font-weight: 600;
  line-height: 1.5;
}
div {
  font-family: "ivyepic";
}
/* * {
  font-family: "ivyepic";
} */
</style>
