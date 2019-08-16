<template>
  <v-app>
    <Navbar />
    <v-content>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar";
import { consoleInfo } from "vuetify/src/util/console";
export default Vue.extend({
  components: { Navbar },
  data: () => ({
    return: {}
  }),
  name: "App"
});
</script>
