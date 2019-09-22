<template>
  <v-content class="mx-4">
    <div id="AppTR" style="max-width: 400px; margin: auto;">
      <v-form ref="form" v-model="valid" lazy-validation style="max-width: 400px; margin: auto;">
        <h3>Registrar</h3>
        <v-text-field v-model="name" :counter="30" :rules="nameRules" label="Nome de usuário" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field
          v-model="senha"
          :rules="senhaRules"
          label="Senha"
          required
          prepend-icon="lock"
          type="password"
        ></v-text-field>
        <v-row align="center" class="mx-0">
          <v-btn color="success" class="mr-4" @click="validate">Registrar</v-btn>
          <v-btn color="primary" class="mr-4" @click="reset">Limpar</v-btn>

        </v-row>
        <v-row align="center" class="mx-0 mt-4">
          <h4>Usuário Registrado:</h4>

        </v-row>
        <v-row align="center" class="mx-0">

          <v-btn color="primary" class="mr-4" @click="login">Entrar</v-btn>

          <!-- <v-btn
            text
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="forgotpassword"
          >Lembrar</v-btn> -->
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
      v => !!v || "Nome é obrigatório",
      v => (v && v.length > 3) || "Nome deve ter no mínimo 4 caracteres"
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
    snackbar: false,
    StatuCode: "",
    validLogin: ""
  }),

  methods: {    
    async validate() {
      if (this.$refs.form.validate()) {
        var user = new Parse.User();

        var validLogin = "";

        user.set("username", this.name);
        user.set("password", this.senha);
        user.set("email", this.email);

        // other fields can be set just like with Parse.Object
        try {
          await user.signUp();

          // Hooray! Let them use the app now.
          //this.router.navigate(['/login']);

          this.validLogin = "success";
          this.valid = true;

          this.text =
            "Successo!" +
            ", Usuário criado com sucesso " +
            ", agora você pode logar";

          this.snackbar = true;
        } catch (error) {
          // Show the error message somewhere and let the user try again.
          this.validLogin = "error";
          if (error.code == -1) {
            // error code = -1 Cannot sign up user with an empty name.
            this.text = error.code +
              ", " + error.message;
            this.snackbar = true;
          }
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.validLogin = "";
    },
    forgotpassword() {
      this.$router.push("/forgotpassword");
    },
    login(){
      this.$router.push("/login");
    }
  }
};
</script>