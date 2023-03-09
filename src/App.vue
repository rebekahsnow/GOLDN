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
/* #inspire{ */
/* background-color: #f2d2b6; */
/* margin: 32px; */
/* } */
/* .v-application--wrap{
    display: inline;
    background-color: #f2d2b6;
} */
h1 {
  color: black;
  font-family: "Gothic A1", sans-serif;
  font-size: 48px;
  margin: 32px;
  text-align: center;
}
h3 {
  color: black;
  font-family: "Gopher";
  font-size: 24px;
  margin: 32px;
  text-align: center;
  text-transform: uppercase;
}
p {
  color: #f2ede4;
  font-size: 24px;
  /* margin: 36px; */
}
* {
  font-family: "Gothic A1", sans-serif;
  /* font-family: "Gopher"; */
}
.v-select__slot {margin-bottom: 24px;
}
</style>
