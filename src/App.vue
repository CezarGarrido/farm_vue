<template>
  <!--<v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Farm</span>
        <span class="font-weight-light">VUE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>-->
  <v-app id="inspire">
    <Drawer/>
    <!-- <v-navigation-drawer v-model="left" temporary fixed></v-navigation-drawer> -->
    <v-content>
      <router-view></router-view>
      
    </v-content>
       <v-footer class="justify-center pl-0" inset app color="transparent">
        <v-spacer></v-spacer>
        <div> &copy;FarmVue <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors - {{ new Date().getFullYear() }}</div>
      </v-footer>
    <!-- <v-navigation-drawer v-model="right" right temporary fixed></v-navigation-drawer> -->
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
/*body,
html {
  height: 100%;
  font-family: Arial;
}*/

#map {
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
