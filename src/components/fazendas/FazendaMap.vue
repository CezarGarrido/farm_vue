<template>
  <v-container flat fixed app>
    <v-navigation-drawer v-model="drawerRight" fixed right app>
      <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap>
          <v-flex xs12 md12>
            <v-avatar slot="offset" class="mx-auto d-block" style="margin-top:65px;" size="170">
              <img src="https://cdn3.iconfinder.com/data/icons/minimal-utility/512/Map.png">
            </v-avatar>
            <v-card-text class="text-xs-center">
              <h1 class="category text-gray font-weight-thin mb-3">
                <strong>{{area.descricao}}</strong>
              </h1>
              <h4 class="card-title font-weight-light">{{area.area_total}} em metros quadrados</h4>
              <v-btn
                color="success"
                v-if="!editar_area"
                round
                class="font-weight-light"
                @click.stop="editArea(area.id)"
              >Editar</v-btn>
              <v-btn
                color="success"
                v-if="editar_area"
                round
                class="font-weight-light"
                @click.stop="disableEditArea(area.id)"
              >Cancelar edição</v-btn>
              <v-btn
                color="error"
                round
                class="font-weight-light"
                @click.stop="deleteArea(area.id)"
              >Excluir</v-btn>
              <v-btn color="default" round class="font-weight-light">Nova Produção</v-btn>
            </v-card-text>
          </v-flex>
          <v-flex v-if="editar_area" xs12 md12>
            <v-form>
              <v-flex xs12 md12>
                <v-text-field
                  v-model="area.descricao"
                  class="green-input"
                  color="black"
                  label="Nome"
                />
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field
                  v-model="area.area_total"
                  label="Área"
                  color="black"
                  class="green-input"
                />
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  color="black"
                  class="purple-input"
                  label="Observações"
                  value="Solo fértil bom para o plantio de feijão"
                />
              </v-flex>
              <v-flex xs12 text-xs-center>
                <v-btn class="mx-0 font-weight-light" color="success">Atualizar área</v-btn>
              </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <v-toolbar color="white" flat fixed app clipped-right>
      <v-btn fab flat style="background-color: var(--gray);" small class="transparent">
        <v-icon dark>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-0 pl-3">
        <span class="font-weight-light">Nova</span>
        <span>Área</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
      <!-- <v-toolbar-side-icon @click.stop></v-toolbar-side-icon> -->
    </v-toolbar>

    <v-container style="position: fixed;" id="map"></v-container>
    <v-speed-dial
      fixed
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <template v-slot:activator>
        <v-btn style="position: relative;" v-model="fab" color="blue darken-2" dark fab>
          <v-icon style="position: relative;">edit</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-tooltip style="z-index:9999;" left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark fab small @click="newFarm" color="green">
            <v-icon dark>create</v-icon>
          </v-btn>
        </template>
        <span style="z-index:9999;">Desenhar área</span>
      </v-tooltip>
      <v-tooltip style="z-index:9999;" left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark fab small color="yellow" @click="editFarm">
            <v-icon dark>star</v-icon>
          </v-btn>
        </template>
        <span style="z-index:9999;">Favoritar fazenda</span>
      </v-tooltip>
      <v-tooltip style="z-index:9999;" left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark fab small @click="closeFarm" color="red">
            <v-icon dark>clear</v-icon>
          </v-btn>
        </template>
        <span style="z-index:9999;">Limpar área</span>
      </v-tooltip>
    </v-speed-dial>
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Nova Área</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field label="Nome da propriedade" v-model="Fazenda.descricao" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model.number="Fazenda.area_total"
                      label="Área da propriedade"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <div>
                      Sua
                      <strong>cor</strong> favorita
                    </div>

                    <v-radio-group v-model="Fazenda.color" column>
                      <v-radio label="Verde" color="green" value="green"></v-radio>
                      <v-radio label="Vermelho" color="red" value="red"></v-radio>
                      <v-radio label="Indigo" color="indigo" value="indigo"></v-radio>
                      <v-radio label="Laranja" color="orange" value="orange"></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indica que o campo é obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="dialog = false">Cancelar</v-btn>
              <v-btn color="green darken-1" flat @click="salvarArea">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <v-footer class="justify-center pl-0" inset app color="transparent">
      <v-spacer></v-spacer>
      <div>
        &copy;O Produtor
        <a
          href="http://openstreetmap.org/copyright"
          class="markdown--link markdown--internal"
        >Google Maps</a>
        - {{ new Date().getFullYear() }}
      </div>
    </v-footer>
  </v-container>
</template>

<script>
import FazendaClass from "../../entities/Fazenda.js";

let globalThis = undefined;
export default {
  props: {
    source: String
  },
  data: () => ({
    editar_area: false,
    area: {
      id: 0,
      descricao: "",
      area_total: null
    },
    drawer: null,
    drawerRight: false,
    right: false,
    left: false,
    bottomNav: -1,
    map: null,
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    dialog: false,
    left: false,
    transition: "slide-y-reverse-transition",
    Fazenda: null,
    Areas: []
  }),
  created() {
    this.Fazenda = new FazendaClass();
    self.globalThis = this;
  },

  mounted() {
    var vm = this;
    let osm = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      {
        maxZoom: 29,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
      }
    );
    vm.map = new L.Map("map", {
      layers: [osm],
      center: new L.LatLng(-22.2218, -54.806422),
      zoom: 12
    });

    L.Control.geocoder({
      showResultIcons: true,
      expand: "click",
      suggestMinLength: 3,
      placeholder: "Pesquisar",
      suggestTimeout: 2,
      errorMessage: "Não encontrado",
      defaultMarkGeocode: true,
      collapsed: true,
      panToPoint: true,
      autocomplete: true,
      focus: true,
      position: "topleft"
    }).addTo(vm.map);

    let polygon_options = {
      showArea: true,
      shapeOptions: {
        stroke: true,
        color: "green",
        weight: 4,
        opacity: 0.5,
        fill: true,
        fillColor: "green", //same as color by default
        fillOpacity: 0.2,
        clickable: true
      },
      allowIntersection: false,
      metric: false,
      repeatMode: false
    };

    var drawnItems = new L.FeatureGroup();
    vm.map.addLayer(drawnItems);
    if (vm.$route.params.id != 0) {
      vm.map.eachLayer(function(layer) {
        if (layer instanceof L.Polygon || layer instanceof L.Marker) {
          vm.map.removeLayer(layer);
        }
      });
      // Creating a polygon
      vm.Fazenda.GetAllByProprieatioID(parseInt(vm.$route.params.id)).then(
        result => {
          console.log(result);
          if (result != null) {
            result.data.forEach(area => {
              let geo_json = JSON.parse(area.geo_json);
              let popupPolygon =
                '<div class="v-card1 v-sheet theme--light"><div class="v-card__title v-card__title--primary">' +
                '<div><div class="headline">' +
                area.descricao +
                '</div><span class="grey--text">' +
                area.area_total +
                " em metros quadrado</span>" +
                '</div></div><div class="v-card__actions"><button type="button" onclick="globalThis.editArea(' +
                area.id +
                ')" class="v-btn v-btn--flat theme--light info--text">' +
                '<div class="v-btn__content">Editar</div></button><button type="button" onclick="globalThis.disableEditArea(' +
                area.id +
                ')" class="v-btn v-btn--flat theme--light purple--text">' +
                '<div class="v-btn__content">Explorar</div></button><div class="spacer"></div>' +
                '<button type="button" onclick="globalThis.removerArea(' +
                area.id +
                ')" class="v-btn v-btn--icon theme--light"><div class="v-btn__content">' +
                '<i aria-hidden="true" class="v-icon material-icons theme--light">delete</i>' +
                "</div></button></div></div>";
              let polygon = L.polygon(geo_json, {
                color: "green",
                fillColor: "transparent"
                //fillOpacity: 4
              });
              polygon.id = area.id;
              polygon.on("click", function() {
                vm.drawerRight = !vm.drawerRight;
                console.log("area...", area);
                vm.showArea(area);
              });
              polygon.on("mouseover", function() {
                this.setStyle({
                  fillColor: "green"
                });
              });
              polygon.on("mouseout", function() {
                this.setStyle({
                  fillColor: "transparent"
                });
              });
              var bounds = polygon.getBounds();
              // Get center of bounds
              var center = bounds.getCenter();
              // Use center to put marker on map
              L.marker(center)
                .bindPopup(area.descricao)
                .addTo(vm.map)
                .openPopup();
              //  var layerGroup = L.layerGroup([polygon]);
              //layerGroup.addTo(vm.map);
              drawnItems.addLayer(polygon);
              //console.log(drawnItems)
              /* layerGroup.eachLayer(function(layer) {
              console.log(layer.id);
            });*/
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    this.$on("fetchData", () => {
      if (vm.$route.params.id != 0) {
        // Creating a polygon

        vm.map.eachLayer(function(layer) {
          if (layer instanceof L.Polygon || layer instanceof L.Marker) {
            vm.map.removeLayer(layer);
          }
        });

        vm.Fazenda.GetAllByProprieatioID(parseInt(vm.$route.params.id)).then(
          result => {
            console.log("resul..", result);
            if (result.data != null) {
              result.data.forEach(area => {
                let geo_json = JSON.parse(area.geo_json);
                let popupPolygon =
                  '<div class="v-card1 v-sheet theme--light"><div class="v-card__title v-card__title--primary">' +
                  '<div><div class="headline">' +
                  area.descricao +
                  '</div><span class="grey--text">' +
                  area.area_total +
                  " em metros quadrado</span>" +
                  '</div></div><div class="v-card__actions"><button type="button" onclick="globalThis.editArea(' +
                  area.id +
                  ')" class="v-btn v-btn--flat theme--light info--text">' +
                  '<div class="v-btn__content">Editar</div></button><button type="button" onclick="globalThis.disableEditArea(' +
                  area.id +
                  ')" class="v-btn v-btn--flat theme--light purple--text">' +
                  '<div class="v-btn__content">Explorar</div></button><div class="spacer"></div>' +
                  '<button type="button" onclick="globalThis.removerArea(' +
                  area.id +
                  ')" class="v-btn v-btn--icon theme--light"><div class="v-btn__content">' +
                  '<i aria-hidden="true" class="v-icon material-icons theme--light">delete</i>' +
                  "</div></button></div></div>";
                let polygon = L.polygon(geo_json, {
                  color: "green",
                  fillColor: "transparent"
                });
                polygon.id = area.id;
                polygon.on("click", function() {
                  vm.drawerRight = !vm.drawerRight;
                  console.log("area...", area);
                  vm.showArea(area);
                });
                polygon.on("mouseover", function() {
                  this.setStyle({
                    fillColor: "green"
                  });
                });
                polygon.on("mouseout", function() {
                  this.setStyle({
                    fillColor: "transparent"
                  });
                });
                var bounds = polygon.getBounds();
                // Get center of bounds
                var center = bounds.getCenter();
                // Use center to put marker on map
                L.marker(center)
                  .bindPopup(area.descricao)
                  .addTo(vm.map)
                  .openPopup();
                //  var layerGroup = L.layerGroup([polygon]);
                //layerGroup.addTo(vm.map);
                drawnItems.addLayer(polygon);
                //console.log(drawnItems)
                /* layerGroup.eachLayer(function(layer) {
              console.log(layer.id);
            });*/
              });
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    });
    let drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        polygon: {
          shapeOptions: {
            color: "green"
          },
          allowIntersection: false,
          drawError: {
            color: "orange",
            timeout: 1000
          },
          showArea: true,
          metric: false,
          repeatMode: true
        },
        polyline: {
          shapeOptions: {
            color: "red"
          }
        },
        rect: {
          shapeOptions: {
            color: "green"
          }
        },
        circle: {
          shapeOptions: {
            color: "steelblue"
          }
        },
        marker: false,
        // disable toolbar item by setting it to false
        polyline: false,
        circle: false, // Turns off this drawing tool
        polygon: false,
        marker: false,
        rectangle: false
      },
      edit: {
        featureGroup: drawnItems,
        selectedPathOptions: {
          maintainColor: true,
          moveMarkers: true
        }
      }
    });
    /*L.drawLocal = {
      draw: {
        toolbar: {
          actions: {
            title: "Cancelar",
            text: "Fechar"
          },
          finish: {
            title: "Finalizar",
            text: "Finalizar"
          },
          undo: {
            title: "Desfazer",
            text: "Desfazer"
          },
          buttons: {
            polyline: "- your text-",
            polygon: "- your text-",
            rectangle: "- your text-",
            circle: "- your text-",
            marker: "- your text-",
            circlemarker: "- your text-"
          }
        },
        handlers: {
          circle: {
            tooltip: {
              start: "- your text-"
            },
            radius: "- your text-"
          },
          circlemarker: {
            tooltip: {
              start: "- your text-."
            }
          },
          //pt.thiago@gmail.com
          marker: {
            tooltip: {
              start: "- your text-."
            }
          },
          polygon: {
            tooltip: {
              start: "- your text-.",
              cont: "- your text-.",
              end: "- your text-."
            }
          },
          polyline: {
            error: "<strong>Error:</strong> shape edges cannot cross!",
            tooltip: {
              start: "Clique para começar a desenhar linha.",
              cont: "Clique para continuar desenhando.",
              end: "Clique no último ponto para terminar a linha."
            }
          },
          rectangle: {
            tooltip: {
              start: "- your text-."
            }
          },
          simpleshape: {
            tooltip: {
              end: "Release mouse to finish drawing."
            }
          }
        }
      },
      edit: {
        toolbar: {
          actions: {
            save: {
              title: "Salvar alterações",
              text: "Salvar"
            },
            cancel: {
              title: "Cancelar a edição, descarta todas as alterações",
              text: "Cancelar"
            },
            clearAll: {
              title: "Remover todas as áreas",
              text: "Remover todas as áreas"
            }
          },
          buttons: {
            edit: "Editar áreas",
            editDisabled: "Sem áreas para editar",
            remove: "Remover áreas",
            removeDisabled: "Sem áreas para remover"
          }
        },
        handlers: {
          edit: {
            tooltip: {
              text: "Arraste alças ou marcadores para editar as áreas.",
              subtext: "Clique em cancelar para desfazer as alterações."
            }
          },
          remove: {
            tooltip: {
              text: "Clique em uma área para remover."
            }
          }
        }
      }
    };*/
    vm.map.addControl(drawControl);
    vm.map.on("draw:created", function(e) {
      let type = e.layerType,
        layer = e.layer;
      if (type === "marker") {
        layer.bindPopup("A popup!");
      }
      layer.id = Math.random();
      drawnItems.addLayer(layer);
      if (type === "polygon") {
        vm.Fazenda.geo_json = JSON.stringify(layer.getLatLngs()[0]);
        layer.bindPopup(
          "<button class='v-btn theme--light red--text text--darken-1' onclick='globalThis.removerArea(" +
            layer.id +
            ")'>Excluir" +
            "</button>" +
            "<button class='v-btn theme--light info' color='info' onclick='globalThis.dialog = true;' fab>Salvar" +
            "</button>"
        );
        let seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        console.log("area:", seeArea);
        layer.showMeasurements();
        //console.log(drawnItems.toGeoJSON());
        //console.log(layer.getLatLngs()[0]);
        //console.log(vm.map.getBounds());
        //console.log(JSON.stringify(layer.getLatLngs()[0]));
        //var state = drawnItems.toGeoJSON();
        vm.Fazenda.area_total = parseFloat(seeArea.toFixed(2));
        /* var polygon = L.polygon(layer.getLatLngs()[0],{
        weight: 1,
        fillOpacity: 0.7,
        color: 'white',
        dashArray: '3'});*/
        //drawnItems.addLayer(polygon)
        vm.dialog = true;
      }
    });
    vm.map.on("draw:edited", function(e) {
      let type = e.layerType;
      //layer = e.layers;
      console.log("tipo....", type);
      //console.log(layer)
    });

    let polygonDrawerFazenda = new L.Draw.Polygon(vm.map, polygon_options);
    let polygonDrawerTalhao = new L.Draw.Polygon(vm.map, polygon_options);
    this.$on("salvarArea", () => {
      vm.Fazenda.create().then(
        result => {
          vm.map.eachLayer(function(layer) {
            if (layer instanceof L.Polygon) {
              vm.map.removeLayer(layer);
            }
          });
          console.log(result);
          this.$emit("fetchData");
        },
        err => {
          console.log(err);
        }
      );
      vm.dialog = false;
    });

    this.$on("newFarm", () => {
      polygonDrawerFazenda.enable();
    });
    this.$on("newTalhao", () => {
      polygonDrawerTalhao.enable();
    });
    this.$on("closeTalhao", () => {
      polygonDrawerTalhao.disable();
    });

    this.$on("closeFarm", () => {
      polygonDrawerFazenda.disable();
      /*vm.map.eachLayer(function(layer) {
        //window.polygon.remove()
        if (layer instanceof L.Polygon) {
          //vm.map.removeLayer(layer);
          layer.editing.disable();
        }

        //vm.map.removeLayer(layer);
      });*/
    });

    this.$on("removerArea", id => {
      vm.map.eachLayer(function(layer) {
        if (layer instanceof L.Polygon) {
          if (layer.id == id) {
            console.log(layer.id);
            vm.map.removeLayer(layer);
          }
        }
      });
    });
    this.$on("editArea", id => {
      vm.map.eachLayer(function(layer) {
        //window.polygon.remove()
        if (layer instanceof L.Polygon) {
          if (layer.id == id) {
            layer.editing.enable();
          }
        }
        //vm.map.removeLayer(layer);
      });
      // polygonDrawerFazenda.enable();
    });
    this.$on("disableEditArea", id => {
      vm.map.eachLayer(function(layer) {
        //window.polygon.remove()
        if (layer instanceof L.Polygon) {
          //vm.map.removeLayer(layer);
          if (layer.id == id) {
            layer.editing.disable();
          }
        }

        //vm.map.removeLayer(layer);
      });
      this.$emit("fetchData");

      // polygonDrawerFazenda.enable();
    });
    this.$on("editFarm", () => {
      vm.map.eachLayer(function(layer) {
        //window.polygon.remove()
        if (layer instanceof L.Polygon) layer.editing.enable();
        //vm.map.removeLayer(layer);
      });
      // polygonDrawerFazenda.enable();
    });
    this.$on("saveTalhao", () => {
      polygonDrawerTalhao.completeShape();
    });
  },
  methods: {
    getAllByProprietarioID(id) {
      this.Fazenda.GetAllByProprieatioID(1).then(
        result => {
          return result.data;
        },
        err => {
          console.log(err);
          return [];
        }
      );
    },
    showArea(area) {
      this.$emit("closeFarm");
      this.editar_area = false;;
      this.area.id = area.id;
      this.area.descricao = area.descricao;
      this.area.area_total = area.area_total;
    },
    editArea(id) {
      this.editar_area = !this.editar_area;
      this.$emit("editArea", id);
    },
    disableEditArea(id) {
      this.editar_area = !this.editar_area;
      /*this.area.id = 0;
      this.area.descricao = "";
      this.area.area_total =null;*/
      this.$emit("disableEditArea", id);
    },
    newTalhao() {
      this.$emit("newTalhao");
    },
    newFarm() {
     // this.Fazenda = Object.assign(new FazendaClass(),this);
      this.drawerRight = false;
      this.$emit("closeFarm");
      this.$emit("newFarm");
    },
    closeTalhao() {
      this.$emit("closeTalhao");
    },
    closeFarm() {
      this.$emit("closeFarm");
    },
    saveTalhao() {
      this.$emit("saveTalhao");
    },
    removerArea(id) {
      this.$emit("removerArea", id);
    },
    editFarm() {
      this.$emit("editFarm");
      //editEnabled()
    },
    openDialog() {
      this.dialog = true;
    },
    openEdit(id) {
      console.log(id);
    },
    salvarArea() {
      this.$emit("salvarArea");
    },
    newFazenda(fazenda) {
      this.openDialog();
      console.log(fazenda);
    },
    deleteArea(id) {
      this.Fazenda.Delete(id).then(
        result => {
          this.$emit("fetchData");
          this.drawerRight = false;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  computed: {
    activeFab() {
      switch (this.tabs) {
        case "one":
          return { class: "purple", icon: "account_circle" };
        case "two":
          return { class: "red", icon: "edit" };
        case "three":
          return { class: "green", icon: "keyboard_arrow_up" };
        default:
          return {};
      }
    }
  }
};
</script>
<style scoped>
.container {
  padding: 0px !important;
}
#map {
  width: 100%;
  height: 100%;
  z-index: 1;
  /* position: fixed;*/
  /*padding: 0;
  margin: 0;
*/
  /*top: 0;
  left: 0;*/
  /*background: rgba(255, 255, 255, 0.5);*/
}
</style>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>