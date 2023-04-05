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
  font-family: "gimlet-display";
  font-weight: 400;
  font-style: italic;
  font-weight: 700;
  font-size: 72px;
  margin: 32px;
  text-align: center;
}
p {
  color: #1e1e1e;
  text-align: center;
  font-size: 24px;
  margin: 24px;
}

* {
  font-family: "gimlet-display";
}
</style>
