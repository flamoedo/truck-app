<template>

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
              <!-- <v-spacer></v-spacer> -->

              <v-btn text @click="pesquisar(card.link)">Pesquisar</v-btn>

              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
      cards: [
        { title: 'Encontre Suporte a Guinchos e Socorro', src: require('../assets/truckservices.jpg'), link:'guincho', flex: 12 },
        { title: 'Melhores Rotas em menor tempo', src: require('../assets/truckcap03.jpg'), link:'rotas', flex: 6 },
        { title: 'Encontre, borracharias, Lojas e Serviços', src: require('../assets/truckcap02.jpg'), link:'borracharia', flex: 6 },
      ],      
    }),
    methods:{
      pesquisar(link){
        // this.$router.push("/list/"+link);
        this.$router.push(`/list/${link}`)
      }
    }
});
</script>
