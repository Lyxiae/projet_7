<template>
    <div class="post-form mt-5">
        <div class="form-group row">
            <label for="user-surname" class="col-sm-2 col-form-label">Nom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" v-model="user.surname" id ="user-surname" placeholder="Nom">
            </div>
        </div>
        <div class="form-group row">
            <label for="user-firstname" class="col-sm-2 col-form-label">Prénom</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" v-model="user.firstname" id ="user-firstname" placeholder="Prénom">
            </div>
        </div>
        <div class="form-group row">
            <label for="user-email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" v-model="user.email" id ="user-email" placeholder="Email">
            </div>
        </div>
        <div class="form-group row">
            <label for="user-password" class="col-sm-2 col-form-label">Mot de passe</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" v-model="user.password" id ="user-password" placeholder="Mot de passe">
            </div>
        </div>
        <div class="form-group row">
            <label for="user-birthday" class="col-sm-2 col-form-label">Date de naissance</label>
            <div class="col-sm-10">
                <input type="date" class="form-control" v-model="user.birthday" id ="user-birthday">
            </div>
        </div>
        <button class="btn btn-success" @click="saveUser">S'inscrire</button>
    </div>
    
</template>

<script>
import usersQueries from "../services/usersQueries"

export default {
    name: 'CreateUser',
    data() {
        return {
            user: {
                surname:"",
                firstname:"",
                image:"",
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
                image: this.user.image,
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


<style lang="scss">
    a {
        text-decoration:none;
    }

    .post-form {
        width:80%;
        margin:0 auto;
    }
</style>