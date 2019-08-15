<template>

   <!-- <v-card
    class="mx-auto"
    max-width="350"
    > -->
    <v-container      
      grid-list-md>
      <v-layout
        wrap
      >
        <v-flex
          v-for="card in cards"
          :key="card.title"
          v-bind="{ [`xs${card.flex}`]: true }"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text"
              height="180px"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title
                class="fill-height align-end"
                v-text="card.title"
              ></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text>Pesquisar</v-btn>

              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  <!-- </v-card> -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
      cards: [
        { title: 'Encontre Suporte a Guinchos e Socorro', src: require('../assets/logo.png'), flex: 12 },
        { title: 'Melhores Rotas em menor tempo', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],      
    })
});
</script>
