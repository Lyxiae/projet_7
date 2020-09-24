<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
      <div class="navbar-nav mr-auto">
        <router-link to="/" class="navbar-brand">Groupomania</router-link> | 
        <div v-if="this.$store.state.userId != 0">
          <router-link :to="'/posts/user/' + userId" class="nav-item">Voir mes messages postés</router-link> |
          <router-link to="/addpost" class="nav-item">Poster un message</router-link> 
        </div>
      </div>
      <div>
        <router-link v-if="this.$store.state.userId != 0" to="/edituser" class="nav-item">Éditer mon profil</router-link>
        <div v-else>
          <router-link v-if="this.$store.state.userId == 0" to="/login" class="nav-item">Connexion</router-link>  |
          <router-link v-if="this.$store.state.userId == 0" to="/signup" class="nav-item">Inscription</router-link>
        </div>
      </div>
    </nav>
    <div class="container main-app">
      <div class="row">
        <SideBar v-if="this.$store.state.userId != 0"/>
        <div class="col-md-10" v-bind:class="{ 'col-12': this.$store.state.userId == 0 }"><router-view/></div>
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
        userId: this.$store.state.userId,
      }
    },
    methods: {
      updateId(){
          this.userId = this.$store.state.userId;
          console.log('userId updaté');
        },
      loginPush(){
        if (this.$store.state.userId == 0) {
          this.$router.push(`/login`);
        }
      },
    },
    beforeMount(){
      this.loginPush();
    },
    mounted() {
      this.updateId();
      this.loginPush();
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image:url('../public/images/background.jpg');
  padding-bottom:20px;
  display:flex;
  flex-flow:row wrap;
}
.container.main-app {
  width:100%;
  background:#f1f3f8;
}
.bg-custom {
    background-color:  #1a2e50;
    }
nav {
  padding: 30px;
  align-content:center;
  width:100%;
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
  a {
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
}
</style>
