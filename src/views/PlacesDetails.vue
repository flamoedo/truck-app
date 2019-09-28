<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img height="250" v-bind:src="getPhoto(this.photo_reference)"></v-img>

    <v-card-title>{{this.posts.name}}</v-card-title>
    <v-card-text>
      <v-row align="center">
        <v-rating :value="this.posts.rating" color="amber" half-increments dense size="14" readonly></v-rating>

        <div class="grey--text ml-4">{{this.posts.rating}}</div>
      </v-row>

      <div class="my-4 subtitle-1 black--text">{{this.posts.formatted_address}}</div>
      <div class="my-4 subtitle-1 black--text">{{this.posts.formatted_phone_number}}</div>

      <div>{{this.posts.name}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <!-- <v-card-text>
      <div class="title text--primary">Tonight's availability</div>
      <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
        <v-chip>5:30PM</v-chip>
        <v-chip>7:30PM</v-chip>
        <v-chip>8:00PM</v-chip>
        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>-->
 
    <v-card-actions>
      <v-btn :href="this.posts.url" color="deep-purple accent-4" text>Mapa</v-btn>
      <v-btn
        v-if="this.posts.website"
        :href="this.posts.website"
        color="deep-purple accent-4"
        text
      >Página Web</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="voltar" color="red" text>voltar </v-btn>
    </v-card-actions>


  </v-card>
</template>
<script>
var Parse = require("parse");
var map;
var service;
var infowindow;

export default {
  data: () => ({
    posts: [],
    error: []
  }),

  beforeMount() {
    this.getPlaceDetails();
  },

  created() {
    //Obtem o parametro de busca da chamada do router
    this.placeid = this.$route.params.placeid;
    this.photo_reference = this.$route.params.photo;
    this.google_api_key = this.$route.params.apikey;

    console.log(this.placeid);
  },
  methods: {
    getPhoto(photo_reference) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${this.google_api_key}`;
    },

    getPlaceDetails() {
      // Obtem os dados da API

      var url_busca =
        `https://cors-anywhere.herokuapp.com/` +
        `https://maps.googleapis.com/maps/api/place/details/json?` +
        `place_id=${this.placeid}&` +
        `fields=name,rating,reviews,types,formatted_phone_number,` +
        `formatted_address,website,url,opening_hours&` +
        `key=${this.google_api_key}`;

      fetch(url_busca, { mode: "cors" })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (!data.error) {
            this.posts = [];
            this.posts = data.result;
            console.log(this.posts);
          } else {
            console.log(data);
            this.error = data.error;
          }
        });
    },
     voltar(){
      //this.$router.push("/list");
    }
  }
};
</script>