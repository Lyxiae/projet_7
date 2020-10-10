<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
      <div class="navbar-nav mr-auto">
        <div>
          <router-link v-if="this.$store.state.userId != 0 || this.userId != null" to="/" class="navbar-brand">Groupomania</router-link>
          </div>
          <div>
          <span v-if="this.$store.state.userId == 0 && this.userId == null" to="/" class="navbar-brand">Groupomania</span>
          </div> | 
        <div v-if="this.$store.state.roleId == 3 || this.$store.state.roleId == 1 || this.roleId == 3 || this.roleId == 1">
          <router-link to="/posts/mod" class="nav-item">Dernières interactions</router-link> |
        </div>
        <div v-if="this.$store.state.userId != 0 || this.userId != null" >
          <router-link :to="'/posts/user/' + this.$store.state.userId" class="nav-item">Voir mes messages postés</router-link> |
          <router-link to="/addpost" class="nav-item">Poster un message</router-link> 
        </div>
      </div>
      <div>
        <router-link v-if="this.$store.state.userId != 0 || this.userId != null" to="/edituser" class="nav-item">Éditer mon profil </router-link>
        <span v-if="this.$store.state.userId != 0 || this.userId != null" @click="logout" class="nav-item logout">  Déconnexion</span>
        <div v-else>
          <router-link v-if="this.$store.state.userId == 0 && this.userId == null" to="/login" class="nav-item">Connexion</router-link> |
          <router-link v-if="this.$store.state.userId == 0 && this.userId == null" to="/signup" class="nav-item">Inscription</router-link>
        </div>
      </div>
    </nav>
    <div class="container main-app">
      <div class="row">
        <SideBar v-if="this.$store.state.userId != 0 || this.userId != null"/>
        <div class="col-md-10 py-3" v-bind:class="{ 'col-12': this.$store.state.userId != 0 || this.userId != null }"><router-view/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import SideBar from './components/SideBar'
import { mapGetters } from 'vuex'
  export default {
    
    name: "App",
    components: {
      'SideBar': SideBar,
    },    
    data() {
      return {
        userId: sessionStorage.getItem('userId'),
        roleId: sessionStorage.getItem('roleId')
      }
    },
    computed: {
      ...mapGetters({
        // userId: 'getUserId',
        // roleId: 'getRoleId'
      })
    },
    methods: {

      loginPush(){
        if ( this.$store.state.userId == 0 && sessionStorage.getItem('userId') == null) {
          this.$router.push(`/login`).catch(()=>{});
        }
      },
      logout() {
        this.$store.dispatch('resetState');
        var storage = window.sessionStorage;
        storage.clear()
        this.loginPush();

      },
      checkStore() {
        if (this.$store.state.userId == 0 && sessionStorage.getItem('userId') != null) {
          this.$store.state.userId == sessionStorage.getItem('userId');
          this.$store.state.roleId == sessionStorage.getItem('roleId');
          this.$store.state.token == sessionStorage.getItem('token');
        }
      }
    },
    beforeMount(){
    },
    mounted() {
      
      // this.updateId();
      this.checkStore();
      this.loginPush();
      // window.onbeforeunload = function () {
      //   var storage = window.sessionStorage;
      //   storage.clear()
      // }
    }
  }
</script>
<style lang="scss">
html, body {
  height:100%
}

body {
    background-image:url('../public/images/background.jpg');
    background-attachment: fixed;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  padding-bottom:20px;
  height:100%;

  
}
.container.main-app {
  width:100%;
  background:#f1f3f8;
  height:auto;
  margin-top: 60px;
}
.bg-custom {
    background-color:  #1a2e50;
    }
nav {
  padding: 30px;
  align-content:center;
  width:100%;
  height:60px;
  .navbar-nav {
    align-content:center;
    align-items:center;
    
    .navbar-brand {
      color:#D1515A;
      transition:0.150s ease-in-out;
      &:hover {
        color:#fd505b;
      }
    }
    .nav-item {
      padding:10px;
      }
    }
  a, .logout {
    font-weight: bold;
    color: #b7d1ff;
    font-family: "Raleway", sans-serif;
    &:hover {
      color: #e6efff;
      text-decoration:none;
    }
    &.router-link-exact-active {
      color: #e6efff;
    }
  }
  .logout {
    cursor:pointer;
  }
}
</style>
