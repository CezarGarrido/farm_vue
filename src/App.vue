<template>
  <v-app id="inspire">
    <Drawer/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import Drawer from "./components/Drawer";
export default {
  name: "App",
  components: {
    Drawer
  },
  data: () => ({})
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
  height: 100%;
  z-index: 100;
}

</style>
