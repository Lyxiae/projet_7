<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
      
        <div>
          <router-link v-if="userId != 0" to="/" class="navbar-brand">Groupomania</router-link>
        </div>
        <div>
          <span v-if="userId == 0" to="/" class="navbar-brand">Groupomania</span>
        </div> | 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" v-if="roleId == 3 || roleId == 1">
              <router-link to="/posts/mod" >Dernières interactions</router-link>
            </li>
            <li class="nav-item" v-if="userId != 0">
              <router-link :to="'/posts/user/' + userId" class="nav-item">Mes messages</router-link>
            </li>
            <li class="nav-item" v-if="userId != 0">
              <router-link to="/addpost" class="nav-item">Nouveau post</router-link> 
            </li>
            <li class="nav-item" v-if="userId != 0">
                <router-link to="/edituser">Éditer mon profil </router-link>
            </li>
            <li class="nav-item" v-if="userId != 0">
              <span @click="logout" class="nav-item logout">Déconnexion</span> 
            </li>
            <li class="nav-item" v-if="userId === 0">
              <router-link  to="/login" class="nav-item">Connexion</router-link>
            </li>
            <li class="nav-item" v-if="userId === 0">
              <router-link to="/signup">Inscription</router-link>
            </li>
          </ul>
        </div>
    </nav>
    <div class="container main-app">
      <div class="row">
        <SideBar v-if="userId != 0"/>
        <div class="col-md-10 py-3" v-bind:class="{ 'col-12': userId != 0 }"><router-view/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import SideBar from './components/SideBar'
import { mapState } from 'vuex'

  export default {
    
    name: "App",
    components: {
      'SideBar': SideBar,
    },    
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        userId: 'userId',
        roleId: 'roleId'}),
    },
    methods: {

      loginPush(){
        if ( this.userId == 0) {
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
    mounted() {
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
