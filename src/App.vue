<template>
  <v-app>
    <v-toolbar dark color="primary" :extended="togleextended">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title color="white" dark>App Truck BR</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="extend">
        <v-icon >search</v-icon>
      </v-btn>

      <v-btn icon @click="home">
        <v-icon>apps</v-icon>
      </v-btn>

      <v-btn icon @click="login">
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>

    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { consoleInfo } from 'vuetify/src/util/console';
export default Vue.extend({
  data:() => ({
    togleextended: false
  }),
  name: "App",
  methods: {
    home() {
      this.$router.push("/");
    },
    login() {
      this.$router.push("/login");
    },
    extend(){
      this.togleextended = !this.togleextended;
      console.log(this.togleextended);

    }

  }
});
</script>
