<script>
import usersQueries from "../services/usersQueries"

export default {
    name: 'Login',
    data() {
        return {
            email:"",
            password:""
        }
    },
    methods: {
        loginUser() {
            let data = {
                email: this.email,
                password: this.password
            };
        usersQueries.login(data)
        .then(response => {
            console.log(response.data);
            this.$store.dispatch('updateToken', response.data.token);
            console.log('token updaté');
            console.log('token du store' + this.$store.state.token);
            this.$store.dispatch('storeUserId', response.data.userId);
            console.log('userId updaté');
            console.log('userId du store' + this.$store.state.userId);
            this.userId = this.$store.state.userId;
            
            
            
            console.log(this.$store.state);
            this.$router.push('/')
        })
        .catch(e => {
            console.log(e);
        });

        }
    }
}
</script>

<template>
    <section>
        <div class="post-form mt-5">
            <div class="form-group row">
                <label for="user-email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="email" id ="user-email" placeholder="Email">
                </div>
            </div>
            <div class="form-group row">
                <label for="user-password" class="col-sm-2 col-form-label">Mot de passe</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" v-model="password" id ="user-password" placeholder="Mot de passe">
                </div>
            </div>
            <button class="btn btn-success" @click="loginUser">Se connecter</button>
        </div>
        <div class="container">
            <p>Vous n'avez pas de compte ? <router-link to="/signup">Inscrivez-vous</router-link></p>
        </div>
    </section>
    
    
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }

    .post-form {
        width:80%;
        margin:0 auto;
    }
</style>