<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex>
        <v-content class="mx-4">
          <div id="AppTR" style="max-width: 400px; margin: auto;">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              style="max-width: 400px; margin: auto;"
            >
              <h2>Login</h2>

              <v-text-field v-model="name" prepend-icon="person" :counter="30" label="Name"></v-text-field>

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
                <v-btn
                  text
                  :disabled="!valid"
                  color="primary"
                  class="mr-4"
                  @click="forgotpassword"
                >Lembrar</v-btn>

                <v-spacer />

                <v-btn :disabled="!valid" color="primary" class="mr-4" @click="login">Entrar</v-btn>
              </v-row>

              <p />

              <v-card-actions class="justify-center">
                <v-btn
                  large
                  rounded
                  align="align-center"
                  color="success"
                  class="ma-2"
                  @click="register"
                >Crie sua conta</v-btn>
              </v-card-actions>

              <div v-if="validLogin == 'success'">
                <v-alert type="success">{{ text }}</v-alert>
              </div>
              <div v-if="validLogin == 'error'">
                <v-alert type="error">{{ text }}</v-alert>
              </div>
            </v-form>
          </div>
        </v-content>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
var Parse = require("parse");

import { formatError } from "@/utils";

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
        //this.error = formatError(error.message);
        //console.log(error)
        this.validLogin = "error";
        this.text = error.code + " - " + error.message;
        //this.text = formatError(error.message);
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