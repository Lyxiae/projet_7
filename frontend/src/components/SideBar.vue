<template>
  <div class="sidebar col-2 d-none d-md-block">
    <div class="sidebar-content">
      <div class="user-avatar">
        <img :src="image" alt="Avatar de l'utilisateur" />
      </div>
      <p>
        Bienvenue, <br /><strong>{{ surname + " " + firstname }}</strong> !
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userId: "userId",
      roleId: "roleId",
      surname: "surname",
      firstname: "firstname",
      image: "image",
    }),
  },
};
</script>


<style lang="scss">
a {
  text-decoration: none;
}
.sidebar {
  height: auto;
  background: #486494;
  position: relative;
  &-content {
    position: sticky;
    position: -webkit-sticky;
    top: 80px;
    height: 300px;
    margin-top: 20px;
    p {
      color: #bfd6fd;
      strong {
        color: white;
      }
    }
  }
}

.user-avatar {
  width: 110px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px auto;
  border: 5px solid rgba(255, 255, 255, 0.2);
  img {
    width: 100%;
    height: auto;
  }
}

@media (min-width: 768px) {
  .user-avatar {
    width: 90px;
  }
}
@media (min-width: 992px) {
  .user-avatar {
    width: 110px;
  }
}
</style>