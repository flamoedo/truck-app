<template>
  <v-content class="mx-4">
    <div id="AppTR" style="max-width: 400px; margin: auto;">
      <v-form ref="form" v-model="valid" lazy-validation style="max-width: 400px; margin: auto;">
        <v-card justify-center>
          <v-card-title>
            <h3>Esqueceu sua senha?</h3>
            <h4 class="font-weight-regular">informe, nome, email e a nova senha para alterar!</h4>          
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="name" :counter="30" label="Name"></v-text-field>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field
              v-model="senha"
              :rules="senhaRules"
              label="Nova Senha"
              required
              prepend-icon="lock"
              type="password"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-layout row>
              <v-flex >
                <v-btn color="success" class="mr-4" @click="validate">Alterar</v-btn>               
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>

        <p/>
 
          <div v-if="validLogin == 'success'">
            <v-alert  type="success">
             {{ text }}
            </v-alert>
          </div>
            <div v-if="validLogin == 'error'">
            <v-alert  type="error">
             {{ text }}
            </v-alert>
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
    validLogin: "",
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
          if (error.code == -1){
            // error code = -1 Cannot sign up user with an empty name.
            this.text =
            "Erro ao criar seu usuário : " + error.code + ", " +  "Informar, nome, email e senha!";
            this.snackbar = true;
          }

    
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