<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
#inspire{
   background-color: #f2d2b6;
   margin: 32px;
}
.v-application--wrap{
    display: inline;
    background-color: #f2d2b6;

}
h1{
    color: #F2EDE4;
    font-family: "Gopher";
    font-size: 32px;
    margin: 32px;
    text-align: center;
}
p{
    color: #F2EDE4;
    font-size: 24px;
    /* margin: 36px; */
}
</style>
