import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const Parse = require('parse');

// Parse.initialize('myAppId', 'myMasterKey123456');

// Parse.serverURL = 'https://rocky-fortress-14504.herokuapp.com/parse';

Parse.initialize('myAppId', 'myMasterKey');

Parse.serverURL = 'https://truck-app-database.herokuapp.com/parse';


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
