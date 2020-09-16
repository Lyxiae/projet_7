<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
      <div class="navbar-nav mr-auto">
        <router-link to="/" class="navbar-brand">Groupomania</router-link> | 
        <router-link :to="'/posts/user/' + userId" class="nav-item">Voir mes messages postés</router-link> |
        <router-link to="/posts/add" class="nav-item">Poster un message</router-link> 
      </div>
      <div>
        <router-link to="/edituser" class="nav-item">Éditer mon profil</router-link>
      </div>
    </nav>
    <router-view/>
    
  </div>
</template>
<script>

  export default {
    name: "App",
    
    data() {
      return {
        userId: 3
      }
    },
    methods: {
      
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
  background-color:#dce1e9;
  padding-bottom:20px;

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
