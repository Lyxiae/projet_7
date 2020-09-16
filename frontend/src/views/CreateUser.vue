<script>
import usersQueries from "../services/usersQueries"

export default {
    name: 'CreateUser',
    data() {
        return {
            user: {
                surname:"",
                firstname:"",
                avatarUrl:"",
                email:"",
                password:"",
                birthday:""
            }
        }
    },
    methods: {
        saveUser() {
            let data = {
                surname: this.user.surname,
                firstname: this.user.firstname,
                avatarUrl: this.user.avatarUrl,
                email: this.user.email,
                password: this.user.password,
                birthday: this.user.birthday
            };
        usersQueries.create(data)
        .then(response => {
            this.user.id = response.data.id;
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
            <label for="user-surname">Nom</label>
            <input type="text" class="form-control" v-model="user.surname" id ="user-surname" placeholder="Nom">
        </div>
        <div class="form-group">
            <label for="user-firstname">Nom</label>
            <input type="text" class="form-control" v-model="user.firstname" id ="user-firstname" placeholder="Prénom">
        </div>
        <div class="form-group">
            <label for="user-email">Email</label>
            <input type="text" class="form-control" v-model="user.email" id ="user-email" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="user-password">Mot de passe</label>
            <input type="password" class="form-control" v-model="user.password" id ="user-password" placeholder="Mot de passe">
        </div>
        <div class="form-group">
            <label for="user-birthday">Date de naissance</label>
            <input type="date" class="form-control" v-model="user.birthday" id ="user-birthday">
        </div>
        <button class="btn btn-success" @click="saveUser">Poster</button>
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