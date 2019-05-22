<template>
  <v-container>
    <div class="grey headline lighten-4 py-3">
      <!-- <p style="margin-left:5px;"> -->
      <v-btn @click="pushFazendas" icon>
        <v-icon dark>arrow_back</v-icon>
      </v-btn>Nova Fazenda
      <!-- </p> -->
    </div>

    <v-container grid-list-sm class="pa-4">
      <v-form flat v-model="valid" ref="form">
        <v-text-field
          color="green"
          prepend-icon="business"
          label="Nome da fazenda"
          v-model="Fazenda.descricao"
          :rules="nameRules"
          :counter="10"
          required
        ></v-text-field>
        <v-text-field color="green" prepend-icon="location_on" label="Endereço"></v-text-field>
        <v-text-field
          color="green"
          type="tel"
          prepend-icon="phone"
          placeholder="(00) 0000 - 0000"
          label="Telefone"
        ></v-text-field>
        <v-text-field color="green" prepend-icon="mail" label="Email"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="submit" dark :class="{ red: !valid, green: valid }">Salvar</v-btn>
        <v-btn @click="clear">Limpar</v-btn>
        <v-btn @click="selecionarArea">
          Selecionar Área
          <v-icon>arrow_forward</v-icon>
        </v-btn>
      </v-form>
    </v-container>
  </v-container>
</template>
<script>
import Fazenda from "../../entities/Fazenda.js";
import { EventBus } from "../../event/events";
export default {
  data: () => ({
    Fazenda: undefined,
    map: null,
    valid: false,
    name: "Fazenda Dourados",
    nameRules: [
      v => !!v || "Nome é obrigatório",
      v => (v && v.length <= 10) || "Nome precisa ter pelo meno 3 caracteres"
    ],
    email: "",
    emailRules: [
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail inválido"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: true
  }),
  created() {
    this.Fazenda = new Fazenda();
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.salvarFazenda();
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    selecionarArea() {
      EventBus.$emit("markerFazenda");
    },
    salvarFazenda() {
      EventBus.$emit("salvarArea", this.Fazenda);
    },
    pushFazendas() {
      EventBus.$emit("cancelarCadastro");
    }
  }
};
</script>

<style>
.mapouter {
  text-align: right;
  height: 100%;
  width: 100%;
  position: absolute;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 100%;
  width: 100%;
}
</style>