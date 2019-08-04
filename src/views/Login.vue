<template>
 <v-app>
  <div id="AppTR"
   style="max-width: 400px; margin: auto;">

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    style="max-width: 400px; margin: auto;"
  >
    <v-text-field
      v-model="name"
      :counter="30"      
      label="Name"      
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="senha"
      :rules="senhaRules"
      label="Senha"
      required
      prepend-icon='lock'  type='password'
    ></v-text-field>
   
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Enviar
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      limpar
    </v-btn>

    
  </v-form>
  </div>
 </v-app>  
 
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name é obrigatório',
        v => (v && v.length > 10) || 'Nome deve ter até 10 caracteres',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail informado não válido',
      ],
      senha: '',
      senhaRules: [
        v => !!v || 'senha obrigatória',
        v => (v && v.length <= 10) || 'Senha deve ter pelo menos 10 caracteres',
      ], 


      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          // Aqui vai a chamada para o banco com os atributos DOM abaixo
          //this.email
          //this.senha 
        }
      },
      reset () {
        this.$refs.form.reset()
      }
    },
  }
</script>