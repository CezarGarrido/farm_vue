<template>
    <v-navigation-drawer style="z-index:9999;" v-model="drawer" fixed app>
      <v-toolbar class="green" color="white" flat>
          
        <v-list class="pa-0">
          <v-list-tile class="justify-center" avatar>
            <v-list-tile-avatar style="margin: 0 auto" color="green">
              <img :src="require('../assets/leaf-icon.png')">
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar color="green">
              <img :src="require('../assets/avatar/avatar-7.png')">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Cezar Garrido Britez</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense class="pt-0">
        <v-divider></v-divider>
        <v-list-tile @click="NovaFazenda">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-list-tile-title>Fazendas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>widgets</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inventário</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Colaboradores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
       <v-footer class="justify-center pl-0" inset app color="white">
      <span></span>
    </v-footer> 

    </v-navigation-drawer>
</template>
<script>
export default {
  name: "Drawer",
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false
  }),
  props: {
    source: String
  },
  methods:{
      NovaFazenda(){
          this.$router.push({ name: 'fazendasForm' });
      }
  }
};
</script>
