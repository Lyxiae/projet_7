<script>
export default {
    name: 'EditUser',
    props: ['title', 'content', 'image']
}
</script>

<template>
    <div class="EditUser">
        <form id="edit-profile">
            <label for="surname">Nom</label>
            <input type="text" id="surname" name="surname">
            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstname">
            <label for="email">Email</label>
            <input type="text" id="email" name="email">
            <label for="avatar">Avatar</label>
            <input type="text" id="avatar" name="avatar">

            <button @click="updateProfile">Valider le profil</button>
            
            
        </form>

        <form id="change-password">
            <label for="password">Ancien mot de passe</label>
            <input type="text" id="password" name="password">
            <label for="passwordcheck">Vérification du mot de passe</label>
            <input type="text" id="passwordcheck" name="passwordcheck">

            <button @click="updatePassword">Changer le mot de passe</button>
        </form>
    </div>
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }
</style>