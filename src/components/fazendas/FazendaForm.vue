<template>
  <div>
    <v-toolbar color="white" flat fixed app clipped-right>
      <v-toolbar-title class="ml-0 pl-3">
        <span class="font-weight-light">Listagem de</span>
        <span> Áreas</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="13 items"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn fab dark small color="green" @click="NovaFazenda">
        <v-icon dark>add</v-icon>
      </v-btn>
      <!-- <v-toolbar-side-icon @click.stop></v-toolbar-side-icon> -->
    </v-toolbar>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      select-all
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:headers="props">
        <tr>
          <th>
            <v-checkbox
              :input-value="props.all"
              :indeterminate="props.indeterminate"
              primary
              hide-details
              @click.stop="toggleAll"
            ></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
          <td>
            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>
            <a class="private-link" href="/contacts/5400098/company/1701557373/" tabindex="0">
              <span> {{ props.item.name }} </span>
            </a>
           </td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    cards: [
      { id: 0, title: "Nova Fazenda", src: "", flex: 3 },
      {
        id: 1,
        title: "Fazenda Teste",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        flex: 3
      },
      {
        id: 2,
        title: "Fazenda Favorita",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 3
      },
      {
        id: 3,
        title: "Fazenda Jatobá",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 3
      }
    ],
    pagination: {
      sortBy: "name"
    },
    selected: [],
    headers: [
      {
        text: "Uuid",
        align: "left",
        value: "name"
      },
      { text: "Nome", value: "calories" },
      { text: "Local", value: "fat" },
      { text: "Quantidade Colaboradores", value: "carbs" },
      { text: "Quantidade Inventários", value: "protein" },
      { text: "Quantidade Locais", value: "iron" }
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%"
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%"
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%"
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%"
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%"
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%"
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%"
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%"
      }
    ]
  }),

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    NovaFazenda() {
      this.$router.push({ name: "fazendasMap" ,params:{id:0}});
    }
  }
};
</script>
<style>
.private-link {
    color: #0091ae;
}
</style>
