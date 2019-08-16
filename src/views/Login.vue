<template>
<v-content class="mx-4">
    <div id="AppTR" style="max-width: 400px; margin: auto;">
      <v-form ref="form" v-model="valid" lazy-validation style="max-width: 400px; margin: auto;">
        <v-text-field v-model="name" :counter="30" label="Name"></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          v-model="senha"
          :rules="senhaRules"
          label="Senha"
          required
          prepend-icon="lock"
          type="password"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Enviar</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">limpar</v-btn>

      </v-form>
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
    </v-content>
</template>

<script>
var Parse = require("parse");

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name é obrigatório",
      v => (v && v.length > 10) || "Nome deve ter até 10 caracteres"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail é obrigatório",
      v => /.+@.+\..+/.test(v) || "E-mail informado não válido"
    ],
    senha: "",
    senhaRules: [
      v => !!v || "senha obrigatória",
      v => (v && v.length <= 10) || "Senha deve ter pelo menos 10 caracteres"
    ],

    checkbox: false,
    text: "",
    snackbar: false
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
      
        var user = new Parse.User();

        user.set("username", this.name);
        user.set("password", this.senha);
        user.set("email", this.email);

        // other fields can be set just like with Parse.Object
        try {
          await user.signUp();

          // Hooray! Let them use the app now.          
          //this.router.navigate(['/login']);

          this.text = "success!" +
              ", User created" +
              ", User created with success, now you can login";

          this.snackbar = true;

        } catch (error) {
          // Show the error message somewhere and let the user try again.
          this.text = "Error: " + error.code + ", " + error.message;
          this.snackbar = true;

        }
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>