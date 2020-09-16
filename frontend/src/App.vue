<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="navbar-nav mr-auto">
        <router-link to="/" class="navbar-brand">Home</router-link> | 
        <router-link :to="'/posts/myposts/' + userId" class="nav-item">Voir mes messages postés</router-link> |
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
        userId: 4
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
}

nav {
  padding: 30px;
  align-content:center;
  .navbar-nav {
    align-content:center;
    align-items:center;
    .nav-item {
      padding:10px;
      }
    }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
