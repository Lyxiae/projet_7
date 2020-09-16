<script>
export default {
    name: 'EditUser',
    props: ['title', 'content', 'image']
}
</script>

<template>
    <div class="EditUser">
        <form id="edit-profile">
            <div class="form-group row">
                <label for="surname" class="col-sm-2 col-form-label">Nom</label>
                 <div class="col-sm-10">
                    <input type="text" class="form-control" id="surname" name="surname">
                </div>
            </div>
            <div class="form-group row">
                <label for="firstname" class="col-sm-2 col-form-label">Prénom</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="firstname" name="firstname">
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="email" name="email">
                </div>
            </div>
            <div class="form-group row">
                <label for="birthday" class="col-sm-2 col-form-label">Date de naissance</label>
                <div class="col-sm-10">
                    <input type="date" class="form-control" id="birthday" name="birthday">
                </div>
            </div>
            <div class="form-group row">
                <label for="avatar" class="col-sm-2 col-form-label">Avatar</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control-file" id="avatar" name="avatar">
                </div>
            </div>
            <button class="btn btn-success" @click="updateProfile">Valider le profil</button>
            
            
        </form>
    </div>
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }

    #edit-profile {
        width:80%;
        margin:0 auto;
        padding: 20px 0;
    }

    .form-group {
        label {
            font: normal normal 600 1.2rem/130% 'Raleway', sans-serif;
        }
    }
</style>