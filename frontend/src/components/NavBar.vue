

<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
      <div class="navbar-nav mr-auto">
        <router-link to="/" class="navbar-brand">Groupomania</router-link> | 
        <div v-if="this.roleId == 3 || this.roleId == 1">
          <router-link to="/posts/mod" class="nav-item">Dernières interactions</router-link> |
        </div>
        <div v-if="this.userId != null" >
          <router-link :to="'/posts/user/' + this.userId" class="nav-item">Voir mes messages postés</router-link> |
          <router-link to="/addpost" class="nav-item">Poster un message</router-link> 
        </div>
      </div>
      <div>
        <router-link v-if="this.userId != null" to="/edituser" class="nav-item">Éditer mon profil</router-link>
        <span v-if="this.userId != null" @click="logout" :change="updateId" class="nav-item logout">  Déconnexion</span>
        <div v-else>
          <router-link v-if="this.userId == null" to="/login" class="nav-item">Connexion</router-link> |
          <router-link v-if="this.userId == null" to="/signup" class="nav-item">Inscription</router-link>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
    name: 'NavLink',
    data() {
      return {
        userId: sessionStorage.getItem('userId'),
        roleId:sessionStorage.getItem('roleId'),
      }
    },
    methods: {
      updateId(){
          this.userId = sessionStorage.getItem('userId');
          this.roleId =sessionStorage.getItem('roleId');
          console.log('userId et roleId updaté');
        },
      loginPush(){
        var userId =sessionStorage.getItem('userId');
        console.log(userId);
        this.updateId();
        if ( userId == 0 || userId == null) {
          this.$router.push(`/login`).catch(()=>{});
        }
      },
      logout() {
        this.$store.dispatch('resetState');
        var storage = window.sessionStorage;
        storage.clear()
        this.updateId();
        this.loginPush();
      },
    },
    beforeMount(){
      this.updateId();
    },
    mounted() {
      
    }
}
</script>

<style lang="scss">
    a {
        text-decoration:none;
    }
</style>