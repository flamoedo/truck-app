<template>
  <v-content>
    <div id="AppTR" style="max-width: 400px; margin: auto;">
      <v-row>
        <v-col>
          <v-card color="#385F73" dark>
            <v-card-text class="white--text">
              <div class="headline mb-2">{{search}}</div>
              <!-- Listen to your favorite artists and albums whenever and wherever, online and offline. -->
            </v-card-text>

            <v-card-actions>
              <!-- <v-btn text>Listen Now</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="posts.length > 0">

        <v-row>
          
          <v-col v-for="post in posts" :key="post.title">
            <v-card>
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <v-list-item-title class="headline mb-2" v-text="post.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="post.snippet"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar v-if="post.pagemap.cse_image" size="125" tile>
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
    </div>
  </v-content>
</template>
<script>

export default {
  data: () => ({
    posts: [],
    error: []
  }),
  mounted() {
    // for (var i = 0; i < 5; i++) {
    fetch(
      `https://www.googleapis.com/customsearch/v1?q=${this.search}&cx=007949313772641196886%3Aumrnh2lgtmc&key=AIzaSyDngYaB8_hSw79gLsOUaQyG0BhD7V9Zh1Y&start=1`
    )
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          this.posts.push(...data.items);
          // console.log(this.posts);          
        } else {
          this.error = data.error;
          // console.log(this.posts);
          // console.log(this.error);
        }
      });
  },

  created() {
    this.search = this.$route.params.search;
  }
};
</script>