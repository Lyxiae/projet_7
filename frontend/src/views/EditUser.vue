<template>
  <div class="EditUser container">
    <div class="form-group row">
      <label for="file" class="col-sm-2 col-form-label">Avatar</label>
      <div class="col-sm-10">
        <input type="file" class="form-control-file" id="file" ref="file" />
      </div>
    </div>
    <form id="edit-profile" name="edit-profile">
      <div class="form-group row">
        <label for="surname" class="col-sm-2 col-form-label">Nom</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="user.surname"
            id="surname"
            name="surname"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="firstname" class="col-sm-2 col-form-label">Prénom</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="user.firstname"
            id="firstname"
            name="firstname"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="user.email"
            id="email"
            name="email"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="birthday" class="col-sm-2 col-form-label"
          >Date de naissance</label
        >
        <div class="col-sm-10">
          <input
            type="date"
            :value="user.birthday"
            class="form-control"
            id="birthday"
            name="birthday"
          />
        </div>
      </div>

      <button class="btn btn-success" @click.prevent.once="updateUser">
        Modifier
      </button>
      <button class="btn btn-danger" @click="deleteUser">
        Supprimer mon compte
      </button>
    </form>
  </div>
</template>

<script>
import usersQueries from "../services/usersQueries";
import moment from "moment";

export default {
  name: "EditUser",
  data() {
    return {
      user: {
        surname: "",
        firstname: "",
        email: "",
        birthday: "",
      },
    };
  },
  methods: {
    updateUser() {
      let data = new FormData(document.getElementById("edit-profile"));
      let imagefile = document.querySelector("#file");
      if (document.getElementById("file").value) {
        data.append("image", imagefile.files[0]);
      }
      usersQueries
        .update(sessionStorage.getItem("userId"), data)
        .then((response) => {
          console.log(response.data);
          this.$store.state.userId = sessionStorage.getItem("userId");
          this.$store.state.roleId = sessionStorage.getItem("roleId");
          this.$store.state.token = sessionStorage.getItem("token");
          this.$store.dispatch("updateUser", sessionStorage.getItem("userId"));
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getUserData(id) {
      usersQueries
        .getOneUser(id)
        .then((response) => {
          this.user = response.data;
          this.user.birthday = moment(this.user.birthday)
            .utc()
            .format("YYYY-MM-DD");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteUser() {
      usersQueries
        .delete(sessionStorage.getItem("userId"))
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUserData(sessionStorage.getItem("userId"));
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.EditUser {
  padding-top: 20px;
}
.form-group {
  label {
    font: normal normal 600 1.2rem/130% "Raleway", sans-serif;
  }
}
</style>