<template>
    <v-app-bar app fixed dark color="blue darken-4">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title dark  color="white">App Truck BR</v-toolbar-title>

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
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push("/");
    },
    login() {
      this.$router.push("/login");
    }    
  }
};
</script>