<template>
  <v-navigation-drawer
    style="z-index:9999;"
    :mini-variant.sync="mini"
    v-model="drawer"
    hide-overlay
    fixed
    left
    app
    v-bind:width="460"
  >
    <v-toolbar color="orange accent-1" prominent tabs>
      <v-list-tile class="justify-center" avatar>
        <v-list-tile-avatar style="margin: 0 auto" color="green">
          <img :src="require('../assets/leaf-icon.png')">
        </v-list-tile-avatar>
      </v-list-tile>
      <!-- <v-toolbar-title class="title mr-4">Cryptocurrency</v-toolbar-title> -->
      <v-autocomplete
        v-model="model"
        :items="items2"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="symbol"
        label="Selecionar área..."
        solo
      >
        <template v-slot:no-data>
          <v-list-tile>
            <v-list-tile-title>
              Pesquise sua
              <strong>Área</strong>
              Favorita
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <template v-slot:selection="{ item, selected }">
          <v-chip :selected="selected" color="blue-grey" class="white--text">
            <v-icon left>mdi-coin</v-icon>
            <span v-text="item.name"></span>
          </v-chip>
        </template>
        <template v-slot:item="{ item }">
          <v-list-tile-avatar
            color="indigo"
            class="headline font-weight-light white--text"
          >{{ item.name.charAt(0) }}</v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-tile-action>
        </template>
      </v-autocomplete>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <template v-slot:extension>
        <v-tabs :hide-slider="!model" color="transparent" slider-color="blue-grey">
          <v-tab :disabled="!model">Áreas</v-tab>
          <v-tab :disabled="!model">Lotes</v-tab>
          <v-tab :disabled="!model">Notas</v-tab>
        </v-tabs>
      </template>
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
    mini: true,
    isLoading: false,
    items2: [],
    model: null,
    search: null
  }),
  props: {
    source: String
  },
  methods: {
    NovaFazenda() {
      this.$router.push({ name: "fazendasForm" });
    }
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items2.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.coinmarketcap.com/v2/listings/")
        .then(res => res.json())
        .then(res => {
          this.items2 = res.data;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
