<script>
import usersQueries from "../services/usersQueries"

export default {
    name: 'Login',
    data() {
        return {
            userId:0,
            token:'',
            userLogin: {
                email:"",
                password:""
            }
        }
    },
    methods: {
        loginUser() {
            let data = {
                email: this.userLogin.email,
                password: this.userLogin.password
            };
        usersQueries.login(data)
        .then(response => {
            this.userId = response.data.userId;
            this.token = response.data.token;
            console.log(response.data);
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
            <input type="text" class="form-control" v-model="userLogin.email" id ="user-email" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="user-password">Mot de passe</label>
            <input type="password" class="form-control" v-model="userLogin.password" id ="user-password" placeholder="Mot de passe">
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