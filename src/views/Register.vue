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
              <h2>Registrar</h2>
              <v-text-field
                v-model="name"
                :counter="30"
                :rules="nameRules"
                prepend-icon="mdi-account-circle"
                label="Nome de usuário"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                prepend-icon="mail"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>

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
                <v-spacer />
                <v-btn color="primary" class="mr-4" @click="reset">Limpar</v-btn>
              </v-row>

               <p />

              <v-card-actions class="justify-center">                      
                  <v-btn 
                  large
                  rounded
                  align="align-center"
                  color="primary"   class="ma-2" @click="login">Entrar</v-btn>         
              </v-card-actions>             
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
      </v-flex>
    </v-layout>
  </v-container>
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
            this.text = error.code + ", " + error.message;
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
    login() {
      this.$router.push("/login");
    }
  }
};
</script>