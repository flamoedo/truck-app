<template>
  <v-content class="mx-4 mt-4">
    <div id="AppTR" style="max-width: 400px; margin: auto;">
      <v-form ref="form" v-model="valid" lazy-validation style="max-width: 400px; margin: auto;">
        <h3>Login</h3>
        <v-text-field v-model="name" :counter="30" label="Name"></v-text-field>

        <!-- <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field> -->

        <v-text-field
          v-model="senha"
          :rules="senhaRules"
          label="Senha"
          required
          prepend-icon="lock"
          type="password"
        ></v-text-field>
        <v-row align="center" class="mx-0">
          <v-btn :disabled="!valid" color="primary" class="mr-4" @click="login">Entrar</v-btn>

          <v-btn
            text
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="forgotpassword"
          >Lembrar</v-btn>
        </v-row>
        <v-row align="center" class="mx-0 mt-4">
          <v-btn color="success" class="mr-4" @click="register">Registrar</v-btn>
        </v-row>

        <p />

        <div v-if="validLogin == 'success'">
          <v-alert type="success">{{ text }}</v-alert>
        </div>
        <div v-if="validLogin == 'error'">
          <v-alert type="error">{{ text }}</v-alert>
        </div>
      </v-form>
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
    // email: "",
    // emailRules: [
    //   v => !!v || "E-mail é obrigatório",
    //   v => /.+@.+\..+/.test(v) || "E-mail informado não válido"
    // ],
    senha: "",
    senhaRules: [
      v => !!v || "senha obrigatória",
      v => (v && v.length <= 10) || "Senha deve ter pelo menos 10 caracteres"
    ],

    checkbox: false,
    text: "",
    StatuCode: "",
    validLogin: ""
  }),

  methods: {
    register() {
      this.$router.push("/register");
    },
    async login() {

      try {
        
        const loggedUser = await Parse.User.logIn(this.name, this.senha);

        this.validLogin = "success";

        this.text =
          "Successo!" + ", Login com sucesso " + ", agora você pode logar";

      } catch (error) {
        this.validLogin = "error";
        this.text = error.code + " - " + error.message;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.validLogin = "";
    },
    forgotpassword() {
      this.$router.push("/forgotpassword");
    }
  }
};
</script>