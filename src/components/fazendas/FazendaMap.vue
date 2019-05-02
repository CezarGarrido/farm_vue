<template>
  <v-container flat fixed app>
    <v-toolbar color="white" flat fixed app clipped-right>
      <v-btn fab flat style="background-color: var(--gray);" small class="transparent">
        <v-icon dark>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-0 pl-3">
        <span class="font-weight-light">Nova</span>
        <span>Fazenda</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-side-icon @click.stop></v-toolbar-side-icon> -->
    </v-toolbar>
    <v-container style="position: fixed;" id="map">
    </v-container>
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
        <span style="z-index:9999;">Desenhar</span>
      </v-tooltip>
      <v-tooltip style="z-index:9999;" left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark fab small color="yellow" @click="editFarm">
            <v-icon dark>star</v-icon>
          </v-btn>
        </template>
        <span style="z-index:9999;">Favoritar</span>
      </v-tooltip>
      <v-tooltip style="z-index:9999;" left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark fab small @click="removeFarm" color="red">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </template>
        <span style="z-index:9999;">Deletar</span>
      </v-tooltip>
      <!-- <v-tooltip style="z-index:9999;" left>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" dark fab small color="green" @click="openDialog">
            <v-icon dark>done</v-icon>
          </v-btn>
        </template>
        <span style="z-index:9999;">Salvar</span>
      </v-tooltip>-->
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
                  <v-flex xs4 md4 sm4>
                    <v-select :items="['Fazenda', 'Talhão']" label="Tipo" required></v-select>
                  </v-flex>
                  <v-flex xs8 sm8 md8>
                    <v-text-field label="Nome da propriedade" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      label="Área da propriedade"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="['0-17', '18-29', '30-54', '54+']" label="UF" required></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete
                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                      label="Cidade"
                      multiple
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indica que o campo é obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="dialog = false">Cancelar</v-btn>
              <v-btn color="green darken-1" flat @click="dialog = false">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

  </v-container>
</template>
  </v-container>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: true,
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
    transition: "slide-y-reverse-transition"
  }),
  created() {},
  mounted() {
    var vm = this;
    /*	vm.map = L.map('map').setView([-41.2858, 174.78682], 14);
        var mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(vm.map);
*/
    let osmUrl =
      "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2V6YXJnYXJyaWRvIiwiYSI6ImNqdjN1dTMzejBkZDg0NG1raHJvNmZlaDYifQ.Ok00dISBsUXQY9wctL5Imw";
    let osmAttrib =
      '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    let osm = L.tileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttrib,
      id: "satellite-streets-v9"
    });

    vm.map = new L.Map("map", {
      layers: [osm],
      center: new L.LatLng(-22.2218, -54.806422),
      zoom: 10
      //editable: true
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

    let drawnItems = new L.FeatureGroup();
    vm.map.addLayer(drawnItems);

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

    let polygon_options = {
      showArea: true,
      shapeOptions: {
        stroke: true,
        color: "green",
        weight: 4,
        opacity: 0.5,
        fill: true,
        fillColor: null, //same as color by default
        fillOpacity: 0.2,
        clickable: true
      },
      allowIntersection: false,
      drawError: {
        color: "orange",
        timeout: 1000
      },
      showArea: true,
      metric: false
      //repeatMode: true
    };

    vm.map.on("draw:created", function(e) {
      let type = e.layerType,
        layer = e.layer;
      if (type === "marker") {
        layer.bindPopup("A popup!");
      }

      drawnItems.addLayer(layer);

      if (type === "polygon") {
        layer.bindPopup(
          "Nome:<strong>Fazendinha</strong><br/>" +
            "Área em m²: " +
            turf.area(drawnItems.toGeoJSON()) +
            " m² <br/>"+
            " <button clear round color='green' fab>Test</button>"
      
        );
        let seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        console.log(seeArea);
        layer.showMeasurements();

        //console.log(layer)
        //console.log(drawnItems)
        //let teste = drawnItems.toGeoJSON()
        //console.log(teste.features)
        // console.log(drawnItems.toGeoJSON())
        //layer.editing.enable();
        vm.dialog = true;
      }
    });

    vm.map.on("draw:edited", function(e) {
      var layers = e.layers;
      var countOfEditedLayers = 0;
      layers.eachLayer(function(layer) {
        countOfEditedLayers++;
      });
      console.log("Edited " + countOfEditedLayers + " layers");
    });

    let polygonDrawerFazenda = new L.Draw.Polygon(vm.map, polygon_options);
    let polygonDrawerTalhao = new L.Draw.Polygon(vm.map, polygon_options);

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
    });
    this.$on("removeFarm", () => {
      vm.map.eachLayer(function(layer) {
        if (layer instanceof L.Polygon) vm.map.removeLayer(layer);
      });
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
    newTalhao() {
      this.$emit("newTalhao");
    },
    newFarm() {
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
    removeFarm() {
      this.$emit("removeFarm");
    },
    editFarm() {
      this.$emit("editFarm");
      //editEnabled()
    },
    openDialog() {
      this.dialog = true;
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
.btn {
  position: relative;

  display: block;
  margin: 30px auto;
  padding: 0;

  overflow: hidden;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  
  background-color: #2ecc71;
  color: #ecf0f1;
  
  transition: background-color .3s;
}

.btn:hover, .btn:focus {
  background-color: #27ae60;
}

.btn > * {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn:before {
  content: "";
  
  position: absolute;
  top: 50%;
  left: 50%;
  
  display: block;
  width: 0;
  padding-top: 0;
    
  border-radius: 100%;
  
  background-color: rgba(236, 240, 241, .3);
  
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.btn:active:before {
  width: 120%;
  padding-top: 120%;
  
  transition: width .2s ease-out, padding-top .2s ease-out;
}

/* Styles, not important */
*, *:before, *:after {
  box-sizing: border-box;
}

html {
  position: relative;
  height: 100%;
}

body {
  position: absolute;
  top: 50%;
  left: 50%;
  
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  
  background-color: #ecf0f1;
  color: #34495e;
  font-family: Trebuchet, Arial, sans-serif;
  text-align: center;
}

h2 {
  font-weight: normal;
}

.btn.orange {
  background-color: #e67e22;
}
.btn.green {
  background-color: green;
}

.btn.orange:hover, .btn.orange:focus {
  background-color: #d35400;
}

.btn.red {
  background-color: #e74c3c;
}

.btn.red:hover, .btn.red:focus {
  background-color: #c0392b;
}
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