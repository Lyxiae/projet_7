<template>
  <section>
    <div class="post-form mt-5">
      <div class="form-group row">
        <label for="user-email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="email"
            id="user-email"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="user-password" class="col-sm-2 col-form-label"
          >Mot de passe</label
        >
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            v-model="password"
            id="user-password"
            placeholder="Mot de passe"
          />
        </div>
      </div>
      <p class="login-error" v-if="this.error == 1">Les informations fournies ne permettent pas de vous identifier.</p>
      <button class="btn btn-success" @click="loginUser">Se connecter</button>
    </div>
    <div class="container">
      <p>
        Vous n'avez pas de compte ?
        <router-link to="/signup">Inscrivez-vous</router-link>
      </p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: 0
    };
  },
  methods: {
    loginUser() {
      let data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("login", data)
        .then((response) => {
          console.log(response.data);
          console.log(this.$store.state);
          const token = this.$store.state.token;
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          this.$router.push("/");
        })
        .catch((e) => {
          this.error = 1;
          console.log(e);
        });
    },
    emitUserData() {},
  },
};
</script>



<style lang="scss">
a {
  text-decoration: none;
}

.post-form {
  width: 80%;
  margin: 0 auto;
}

.login-error {
  color:red;
  font-weight:600;
}
</style>