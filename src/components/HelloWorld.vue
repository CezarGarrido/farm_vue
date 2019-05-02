<template>
			
  <v-container id="map">
    <v-navigation-drawer style="z-index:9999;" v-model="drawerRight" fixed right clipped app>
      <v-list dense>
        <v-spacer></v-spacer>

        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>account_balance</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="newTalhao">
            <v-list-tile-title>Nova Fazenda</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="newTalhao">
            <v-list-tile-title>Novo Talhão</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="closeTalhao">
            <v-list-tile-title>Close Talhão</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="saveTalhao">
            <v-list-tile-title>Save Talhão</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

  
    </v-navigation-drawer>
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
    map: null
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
    var osmUrl =
      "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2V6YXJnYXJyaWRvIiwiYSI6ImNqdjN1dTMzejBkZDg0NG1raHJvNmZlaDYifQ.Ok00dISBsUXQY9wctL5Imw";
    var osmAttrib =
      '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    var osm = L.tileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttrib,
      id: "satellite-streets-v9"
    });
    vm.map = new L.Map("map", {
      layers: [osm],
      center: new L.LatLng(-22.2218, -54.806422),
      zoom: 10
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
      position: "topright"
    }).addTo(vm.map);

    var drawnItems = new L.FeatureGroup();
    vm.map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
      position: "topright",
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
        featureGroup: drawnItems
      }
    });

    L.drawLocal = {
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
    };
    vm.map.addControl(drawControl);

    var polygon_options = {
      showArea: false,
      shapeOptions: {
        stroke: true,
        color: "#6e83f0",
        weight: 4,
        opacity: 0.5,
        fill: true,
        fillColor: null, //same as color by default
        fillOpacity: 0.2,
        clickable: true
      }
    };

    vm.map.on("draw:created", function(e) {
      var type = e.layerType,
        layer = e.layer;
      if (type === "marker") {
        layer.bindPopup("A popup!");
      }

      drawnItems.addLayer(layer);

      if (type === "polygon") {
        layer.bindPopup("Área:" + turf.area(drawnItems.toGeoJSON()) + " m²");
        layer.showMeasurements();
      }
      
    });

    var polygonDrawerFazenda = new L.Draw.Polygon(vm.map, polygon_options);
    var polygonDrawerTalhao = new L.Draw.Polygon(vm.map, polygon_options);

    this.$on("newFarm", () => {
      polygonDrawerFazenda.enable();
    });
    this.$on("newTalhao", () => {
      polygonDrawerTalhao.enable();
    });
    this.$on("closeTalhao", () => {
      polygonDrawerTalhao.disable();
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
    saveTalhao() {
      this.$emit("saveTalhao");
    }
	},
	   computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue'
          case 1: return 'yellow'
          case 2: return 'red'
          case 3: return 'red'
        }
      }
    }
};
</script>


<style>
.marker-icon,
.marker-icon:focus {
  background-color: #ffffff;
  border: 1px solid #3388ff;
  border-radius: 50%;
  margin: -8px 0 0 -8px !important;
  width: 14px !important;
  height: 14px !important;
  outline: 0;
  transition: opacity ease 0.3s;
}
</style>
