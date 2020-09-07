<template>
  <div class="home">
    <nav>
        <NavLink url="/" text="Accueil" />
        <NavLink url="/about" text="A propos" />
        <NavLink url="/contact" text="Contact" />
    </nav>
    <p>Bienvenue sur le réseau de <NavLink url="/" text="Groupomania" /></p>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import NavLink from '@/components/NavLink.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    NavLink
  }
}
</script>
