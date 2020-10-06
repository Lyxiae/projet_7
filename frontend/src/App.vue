<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
      <div class="navbar-nav mr-auto">
        <router-link to="/" class="navbar-brand">Groupomania</router-link> | 
        <div v-if="this.$store.state.roleId == 3 || this.$store.state.roleId == 1">
          <router-link to="/posts/mod" class="nav-item">Dernières interactions</router-link> |
        </div>
        <div v-if="this.$store.state.userId != 0">
          <router-link :to="'/posts/user/' + this.$store.state.userId" class="nav-item">Voir mes messages postés</router-link> |
          <router-link to="/addpost" class="nav-item">Poster un message</router-link> 
        </div>
      </div>
      <div>
        <router-link v-if="this.$store.state.userId != 0" to="/edituser" class="nav-item">Éditer mon profil</router-link>
        <span v-if="this.$store.state.userId != 0" @click="logout" :change="updateId" class="nav-item logout">  Déconnexion</span>
        <div v-else>
          <router-link v-if="this.$store.state.userId == 0" to="/login" class="nav-item">Connexion</router-link> |
          <router-link v-if="this.$store.state.userId == 0" to="/signup" class="nav-item">Inscription</router-link>
        </div>
      </div>
    </nav>
    <div class="container main-app">
      <div class="row">
        <SideBar v-if="this.$store.state.userId != 0"/>
        <div class="col-md-10 py-3" v-bind:class="{ 'col-12': this.$store.state.userId == 0 }"><router-view/></div>
      </div>
    </div>
  </div>
</template>
<script>
  import SideBar from './components/SideBar'
  export default {
    
    name: "App",
    components: {
      'SideBar': SideBar
    },    
    data() {
      return {
        userId: 0,
        roleId: 0,
      }
    },
    computed: {
      // isAdmin : this.$store.state.roleId == 1,
      // isMod : this.$store.state.roleId == 3
    },
    methods: {
      updateId(){
          this.userId = sessionStorage.getItem('userId');
          this.roleId = sessionStorage.getItem('roleId');
          console.log('userId et roleId updaté');
        },
      loginPush(){
        var userId = sessionStorage.getItem('userId');
        console.log(userId);
        if ( userId == 0 || userId == null) {
          this.$router.push(`/login`).catch(()=>{});
        }
      },
      logout() {
        this.$store.dispatch('resetState');
        var storage = window.sessionStorage;
        storage.clear()
        this.loginPush();
      },
      // isMod() {
      //   if (this.$store.state.roleId == 1 || this.$store.state.roleId == 3) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // },
    },
    beforeMount(){
      this.loginPush();
    },
    mounted() {
      this.updateId();
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
