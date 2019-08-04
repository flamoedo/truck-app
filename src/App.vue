<template>
  <v-app>
 
   <v-card
    color="grey lighten-4"
    flat
    height="150px"
    tile
  >
    <v-toolbar dark color="primary" extended style="max-width: 400px; margin: auto;">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title color="white" dark>App Truck BR</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon @click="home">
        <v-icon>apps</v-icon>
      </v-btn>

      <v-btn icon @click="login">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>

    <v-content>

         
    </v-content>

    <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>

  </v-app>

     
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
  methods: {
    home(){
      this.$router.push("/");
    },
    login(){
      this.$router.push("/login");
    },
    
  }
});
</script>
