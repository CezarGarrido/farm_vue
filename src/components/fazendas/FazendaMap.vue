<template>
  <div>
    <v-navigation-drawer
      :mini-variant.sync="mini"
      v-model="drawer"
      hide-overlay
      fixed
      left
      app
      v-bind:width="460"
    >
      <div>
        <v-toolbar color="green" extended dark tabs>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Farm</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="tab" color="green" grow>
              <v-tabs-slider color="blue-grey"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item.title">{{ item.title }}</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card v-if="!nova_fazenda" flat>
              <v-container fill-height fluid>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Suas Fazendas</div>
                    <span class="grey--text">Total {{LENGHT_FAZENDAS}}</span>
                  </div>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn @click="novaFazenda" color="success">Nova Fazenda</v-btn>
                </v-card-actions>
              </v-container>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex pa-2 v-for="area in Areas" :key="area.descricao">
                    <v-hover>
                      <v-card
                        style="cursor: pointer;"
                        class="mx-auto"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 12 :2}`"
                      >
                        <v-container @click="detalheFazenda" fill-height fluid>
                          <v-card-title primary-title>
                            <div>
                              <div class="blue--text">{{area.descricao}}</div>
                              <span class="grey--text">10 Talhões</span>
                            </div>
                          </v-card-title>
                        </v-container>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon dark color>favorite</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>edit</v-icon>
                          </v-btn>
                          <v-btn @click="deleteArea(area.id)" icon>
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <div fill-height fluid v-if="LENGHT_FAZENDAS==0" class="container-empty-state">
              <div center class="arvores">
                <img heigh="600" width="250" src="https://visualpharm.com/assets/351/Farm%202-595b40b85ba036ed117dd19b.svg">
              </div>
              <h1 class="green--text">Você ainda não possui nenhuma fazenda.</h1>
              <p
                class="subtitle"
              >Nesta funcionalidade será possível gerenciar as fazendas na plataforma, aqui será possível incluir, editar ou excluir fazendas cadastradas anteriormente.</p>
              <p
                class="call-to-action"
              >Utilize um dos botões na parte superior da tela para adicionar uma nova fazenda.</p>
            </div>
            <FazendaForm v-if="nova_fazenda"></FazendaForm>
          </v-tab-item>
          <v-tab-item>
            <v-card v-if="!nova_fazenda" flat>
              <v-card row pa-2>
                <v-container pa-2 fill-height fluid>
                  <v-flex xs4 sm2 md2>
                    <v-spacer></v-spacer>
                    <v-avatar size="66px">
                      <img src="https://image.flaticon.com/icons/svg/187/187039.svg" alt="Avatar">
                    </v-avatar>
                  </v-flex>
                  <v-card-title primary-title>
                    <div>
                      <!-- <strong>Fazenda MS</strong> -->
                      <div class="headline">Fazenda MS</div>
                      <span class="grey--text">3e3e3e3</span>
                    </div>
                  </v-card-title>
                </v-container>

                <v-card-actions>
                  <div>
                    <div class="text-xs-center">
                      <v-chip>
                        <v-avatar class="teal">LAT</v-avatar>-33223433244
                      </v-chip>
                    </div>
                  </div>
                  <div class="text-xs-center">
                    <v-chip>
                      <v-avatar class="teal">LNG</v-avatar>-33223433244
                    </v-chip>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon dark color="red">favorite</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn @click="deleteArea(2)" icon>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-container fill-height fluid>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Talhões</div>
                    <span class="grey--text">Total 10</span>
                  </div>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn @click="novaFazenda" color="success">Novo Talhão</v-btn>
                </v-card-actions>
              </v-container>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex pa-2 v-for="area in Areas" :key="area.descricao">
                    <v-hover>
                      <v-card
                        class="mx-auto"
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 12 :2}`"
                      >
                        <v-container fill-height fluid>
                          <v-card-title primary-title>
                            <div>
                              <div class="headline orange--text">{{area.descricao}}</div>
                              <span class="grey--text">10 Talhões</span>
                            </div>
                          </v-card-title>
                        </v-container>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon dark color="red">favorite</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>edit</v-icon>
                          </v-btn>
                          <v-btn @click="deleteArea(area.id)" icon>
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <FazendaForm v-if="nova_fazenda"></FazendaForm>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-navigation-drawer>

    <v-container flat fixed app>
      <v-card>
        <v-container style="position: fixed;" id="map"></v-container>
      </v-card>
      <v-speed-dial
        v-if="!nova_fazenda"
        fixed
        style="z-index:9999;"
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
          <v-btn style="position: relative;" v-model="fab" color="green darken-2" dark fab>
            <v-icon style="position: relative;">add</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-tooltip style="z-index:9999;" left>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" dark fab small @click="newFarm" color="blue">
              <v-icon dark>create</v-icon>
            </v-btn>
          </template>
          <span style="z-index:9999;">Desenhar área</span>
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
                      <v-text-field
                        label="Nome da propriedade"
                        outline
                        v-model="Fazenda.descricao"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        outline
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
      <v-navigation-drawer v-model="dialog_full" right temporary fixed>
        <v-layout row>
          <v-flex xs12 sm12 offset-sm0>
            <v-card>
              <v-toolbar color="green">
                <v-toolbar-side-icon></v-toolbar-side-icon>

                <v-toolbar-title>Topics</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-toolbar>

              <v-list>
                <v-list-group
                  v-for="item in items"
                  :key="item.title"
                  v-model="item.active"
                  :prepend-icon="item.action"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>

                  <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-icon>{{ subItem.action }}</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-navigation-drawer>
      <v-footer class="justify-center pl-0" inset app color="transparent">
        <v-spacer></v-spacer>
        <div>
          &copy;O Produtor
          <a
            color="green"
            href="http://openstreetmap.org/copyright"
            class="markdown--link markdown--internal"
          >Google Maps</a>
          - {{ new Date().getFullYear() }}
        </div>
      </v-footer>
    </v-container>
  </div>
</template>

<script>
import { EventBus } from "../../event/events";
import FazendaClass from "../../entities/Fazenda.js";
import FazendaForm from "../../components/fazendas/FazendaForm";
let globalThis = undefined;
export default {
  components: {
    FazendaForm
  },
  props: {
    source: String
  },
  data: () => ({
    tab: null,
    nova_fazenda: false,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    items: [
      { title: "Fazendas", icon: "dashboard" },
      { title: "Detalhes", icon: "question_answer" }
    ],
    drawer: true,
    drawerRight: null,
    right: true,
    left: false,
    mini: false,
    isLoading: false,
    items2: [],
    model: null,
    search: null,
    dialog_full: false,
    notifications: false,
    sound: true,
    widgets: false,
    editar_area: false,
    area: {
      id: 0,
      descricao: "",
      area_total: null
    },

    bottomNav: -1,
    map: null,
    direction: "top",
    fab: false,
    fling: false,
    hover: true,
    tabs: null,
    top: false,
    bottom: true,
    dialog: false,
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
            this.Areas = result.data;
            /*result.data.forEach(area => {
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
            });*/
          }
        },
        err => {
          this.Areas = [];
          console.log(err);
        }
      );
    }
    let markFazenda = new L.Draw.Marker(vm.map, {});
    EventBus.$on("markerFazenda", () => {
      if (vm.Fazenda.geo_json == null) {
        markFazenda.enable();
      }
    });
    EventBus.$on("cancelarCadastro", () => {
      vm.nova_fazenda = false;
    });

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

            this.Areas = result.data;

            /*if (result.data != null) {
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
              });
            }*/
          },
          err => {
            this.Areas = [];
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
      layer.id = Math.random();
      drawnItems.addLayer(layer);
      if (type === "marker") {
        //layer.bindPopup("Nova Fazenda!");
        console.log(layer.toGeoJSON());
        vm.Fazenda.geo_json = JSON.stringify(layer.toGeoJSON());
        layer.on("mouseover", function(e) {
          layer.editing.enable();
        });
        layer.on("mouseout", function(e) {
          layer.update();
          layer.editing.disable();
          let area = layer.getLatLng();
          vm.Fazenda.latitude = area.lat;
          vm.Fazenda.longitude = area.lng;
        });
      }

      if (type === "polygon") {
        vm.Fazenda.geo_json = JSON.stringify(layer.getLatLngs()[0]);
        layer.bindPopup(
          "<button class='v-btn theme--light red--text text--darken-1' onclick='globalThis.removerArea(" +
            layer.id +
            ")'>Excluir" +
            "</button>" +
            "<button class='v-btn theme--light info' color='info' onclick='globalThis.dialog_full = true;' fab>Salvar" +
            "</button>"
        );
        layer.on("click", function(e) {
          vm.map.setView(e.latlng, 13);
        });
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
      layer.id = Math.random();
      drawnItems.addLayer(layer);
      if (type === "marker") {
        layer.bindPopup("Nova Fazenda!");
        // console["log"](layer.getLatLngs()[0]);
        console.log(layer.toGeoJSON());
        vm.Fazenda.geo_json = JSON.stringify(layer.toGeoJSON());
        layer.editing.disable();
        layer.on("click", function(e) {
          layer.editing.enable();
        });
      }
      //console.log(layer)
    });

    let polygonDrawerFazenda = new L.Draw.Polygon(vm.map, polygon_options);
    let polygonDrawerTalhao = new L.Draw.Polygon(vm.map, polygon_options);
    EventBus.$on("salvarArea", fazenda => {
      vm.Fazenda.descricao = fazenda.descricao;
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
    novaFazenda() {
      this.nova_fazenda = true;
      //this.$router.push({ name: "fazendasForm" });
      //fazendasForm
    },
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
      this.editar_area = false;
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
    salvarArea(obj) {
      this.$emit("salvarArea", obj);
    },
    newFazenda(fazenda) {
      this.openDialog();
      console.log(fazenda);
    },
    deleteArea(id) {
      this.Fazenda.Delete(id).then(
        result => {
          this.$emit("fetchData");
          //this.drawerRight = false;
        },
        err => {
          console.log(err);
        }
      );
    },
    detalheFazenda() {
      this.tab = 1;
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
  },
  computed: {
    LENGHT_FAZENDAS: function() {
      console.log(this.Areas);
      if (this.Areas == null) {
        return 0;
      } else {
        return this.Areas.length;
      }
    },
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
  height: 99%;
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