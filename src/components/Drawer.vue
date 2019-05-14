<template>
  <v-navigation-drawer
    style="z-index:9999;"
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    fixed
    left
    app
  >
    <v-toolbar class="green" color="white" flat>
      <v-list class="pa-0">
        <v-list-tile class="justify-center" avatar>
          <v-list-tile-avatar style="margin: 0 auto" color="green">
            <img :src="require('../assets/leaf-icon.png')">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
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

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" @click="NovaFazenda">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
    items: [
      { title: "Áreas", icon: "dashboard" },
      { title: "Sobre", icon: "question_answer" }
    ],
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    mini: true
  }),
  props: {
    source: String
  },
  methods: {
    NovaFazenda() {
      this.$router.push({ name: "fazendasForm" });
    }
  }
};
</script>
