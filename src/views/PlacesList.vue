<template>
  <v-container>
    <div v-if="posts.length > 0">
      <v-row>
        <v-col class="pa-1">
          <v-card color="blue darken-1" dark>
            <v-card-text class="white--text">
              <div class="headline">{{search}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="proximo" text>Próximo</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-for="post in posts" :key="post.id" class="pa-1">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-title class="headline mb-2" v-text="post.name"></v-list-item-title>
                <v-list-item-subtitle v-text="post.name"></v-list-item-subtitle>
                <v-list-item-subtitle v-if="post.opening_hours">Aberto agora</v-list-item-subtitle>
                <v-list-item-subtitle v-if="!post.opening_hours">Fechado</v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{getDistance(post.geometry.location.lat,
                  post.geometry.location.lng)}}
                </v-list-item-subtitle>
                <v-row align="left" class="pl-3">
                  <v-rating
                    :value="post.rating"
                    color="amber"
                    half-increments
                    dense
                    size="14"
                    readonly
                  ></v-rating>

                  <div class="grey--text ml-4">{{post.rating}}</div>
                </v-row>
                <v-list-item-subtitle v-text="post.vicinity"></v-list-item-subtitle>
              </v-list-item-content>
      
              <v-list-item-avatar size="125" tile>
                <div v-for="img in post.photos" :key="img.place_id">
                  <v-img height="120px" width="120px" v-bind:src="getPhoto(img.photo_reference)"></v-img>
                </div>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn @click="details(post.place_id, post.photos)" text>Ver detalhes</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h4 v-for="e in error.errors" :key="e.errors">{{e.message}}</h4>
    </div>
  </v-container>
</template>
<script>
var Parse = require("parse");
var map;
var service;
var infowindow;

var mylib = require("@/lib/myLib");

export default {
  data: () => ({
    posts: [],
    error: []
  }),
  mounted() {
    this.pagina = 1;
    this.getParameters();
  },

  created() {
    //Obtem o parametro de busca da chamada do router
    this.search = this.$route.params.search;
  },
  methods: {
    proximo() {
      // Muda de página
      // this.pagina = this.pagina + 10;
      this.getData(this.search, this.next_page, this.google_api_key);
    },

    getPhoto(photo_reference) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${this.google_api_key}`;
    },

    getDistance(latitude, longitude) {
      var calcdistance = mylib.distance(
        this.my_location.coords.latitude,
        this.my_location.coords.longitude,
        latitude,
        longitude,
        "K"
      );
      console.log(calcdistance);
      return Math.round(calcdistance*100)/100 + ' km';
    },

    getData(busca, next_page, api_key) {
      // Obtem os dados da API

      navigator.geolocation.getCurrentPosition(
        function(location) {
          // console.log(location.coords.latitude);
          // console.log(location.coords.longitude);
          // console.log(location.coords.accuracy);

          this.my_location = location;

          var url_busca =
            `https://cors-anywhere.herokuapp.com/https://` +
            `maps.googleapis.com/maps/api/place/nearbysearch/json?` +
            `location=${location.coords.latitude},${location.coords.longitude}` +
            `&radius=15000&type=establishment&keyword=${busca}&key=${api_key}`;

          if (next_page) {
            url_busca = `${url_busca}&pagetoken=${next_page}`;
          }

          fetch(url_busca, { mode: "cors" })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              if (!data.error) {
                this.posts = [];
                this.posts.push(...data.results);
                this.next_page = data.next_page_token;
                console.log(this.posts);
              } else {
                console.log(data);
                this.error = data.error;
              }
            });
        }.bind(this)
      );
    },

    getParameters() {
      // Recuperar a chave de acesso a API
      Parse.Config.get().then(
        function(config) {
          this.google_api_cx = config.get("google_api_cx");
          this.google_api_key = config.get("google_api_key");
          // Carregamento inicial da página
          this.getData(this.search, this.next_page, this.google_api_key);
        }.bind(this),
        function(error) {
          console.log("Failed to fetch. Using Cached Config.");
          const config = Parse.Config.current();
          let welcomeMessage = config.get("google_api_cx");
          if (welcomeMessage === undefined) {
            welcomeMessage = "Welcome!";
          }
        }.bind(this)
      );
    },

    details(placeid, photos) {
      photos.forEach(element => {
        this.photo = element.photo_reference;
        return false;
      });

      this.$router.push(
        `/detail/${placeid}/${this.photo}/${this.google_api_key}`
      );
    },   
  }
};
</script>