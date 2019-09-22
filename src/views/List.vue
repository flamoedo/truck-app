<template>
  <v-container>
    <div v-if="posts.length > 0">
      <v-row>
        <v-col class="pa-1">
          <v-card color="#1F7087" dark>
            <v-card-text class="white--text">
              <div class="headline">{{search}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="proximo" text>Próximo</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-for="post in posts" :key="post.cacheId" class="pa-1">
          <v-card>
            <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-title class="headline mb-2" v-text="post.title"></v-list-item-title>
                <v-list-item-subtitle v-text="post.snippet"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar v-if="post.pagemap && post.pagemap.cse_image" size="125" tile>
                <div v-for="img in post.pagemap.cse_image" :key="img.src">
                  <v-img height="120px" width="120px" :src="img.src"></v-img>
                </div>
              </v-list-item-avatar>
            </v-list-item>
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
    this.search = this.$route.params.search;
  },
  methods: {
    proximo() {
      // Muda de página
      this.pagina = this.pagina + 10;
      this.getData(this.pagina);
    },
    getData(pagina) {
      // Obtem os dados da API

      fetch(
        `https://www.googleapis.com/customsearch/v1?q=${this.search}&cx=${this.google_api_cx}&key=${this.google_api_key}&start=${pagina}`
      )
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            this.posts = [];
            this.posts.push(...data.items);
          } else {
            this.error = data.error;
          }
        });
    },

    getParameters() {
      // Recuperar a chave de acesso a API
      Parse.Config.get().then(
        function(config) {
          this.google_api_cx = config.get("google_api_cx");
          this.google_api_key = config.get("google_api_key");
          // Carregamento inicial da página
          this.getData(this.pagina);
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
    }
  }
};
</script>