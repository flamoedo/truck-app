<template>
  <v-content class="mx-4 mt-4">
    <div id="AppTR" style="max-width: 400px; margin: auto;">
      <v-form ref="form" v-model="valid" lazy-validation style="max-width: 400px; margin: auto;">
        <h3>Esqueceu sua senha?</h3>
        <h4
          class="font-weight-regular"
        >informe seu email e um link para redefinir a senha será enviado</h4>
        <!-- <v-text-field v-model="name" :counter="30" label="Name"></v-text-field> -->

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <!-- <v-text-field
              v-model="senha"
              :rules="senhaRules"
              label="Nova Senha"
              required
              prepend-icon="lock"
              type="password"
        ></v-text-field>-->
        <v-layout row class="mx-0">
          <v-flex>
            <v-btn color="success" class="mr-4" @click="validate">Alterar</v-btn>
          </v-flex>
        </v-layout>

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
    // name: "",
    // nameRules: [
    //   v => !!v || "Name é obrigatório",
    //   v => (v && v.length > 10) || "Nome deve ter até 10 caracteres"
    // ],
    email: "",
    emailRules: [
      v => !!v || "E-mail é obrigatório",
      v => /.+@.+\..+/.test(v) || "E-mail informado não válido"
    ],
    // senha: "",
    // senhaRules: [
    //   v => !!v || "senha obrigatória",
    //   v => (v && v.length <= 10) || "Senha deve ter pelo menos 10 caracteres"
    // ],

    checkbox: false,
    text: "",
    snackbar: false,
    StatuCode: "",
    validLogin: ""
  }),

  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          console.log("reseting");
          await Parse.User.requestPasswordReset(this.email);
          this.validLogin = "success";
          this.text = "email enviado com sucesso";
          // Password reset request was sent successfully
        } catch (error) {
          // Show the error message somewhere
          this.validLogin = "error";
          this.text = "Error: " + error.code + " " + error.message;
          console.log(this.text);
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.validLogin = "";
    }
  }
};
</script>