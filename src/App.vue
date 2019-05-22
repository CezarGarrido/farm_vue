<template>
  <v-app id="inspire">
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data: () => ({}),
};
</script>
    <style>
body,
html {
  height: 100%;
  font-family: Arial;
}

#map {
  width: 100%;
  height: 50%;
  z-index: 100;
}

</style>
