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
    <div class="post-form">
        <div class="form-group">
            <label for="user-email">Email</label>
            <input type="text" class="form-control" v-model="email" id ="user-email" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="user-password">Mot de passe</label>
            <input type="password" class="form-control" v-model="password" id ="user-password" placeholder="Mot de passe">
        </div>
        <button class="btn btn-success" @click="loginUser">Poster</button>
    </div>
    
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