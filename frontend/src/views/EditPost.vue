<template>
  <section class="container">
    <div class="form-group">
      <label for="file">Ajouter une image</label>
      <input type="file" class="form-control-file" id="file" ref="file" />
    </div>
    <form id="post-form" name="post-form">
      <div class="form-group">
        <label for="postTitle">Titre du post</label>
        <input
          type="text"
          class="form-control"
          v-model="title"
          id="postTitle"
          name="postTitle"
          placeholder="Titre du post"
        />
      </div>

      <div class="form-group">
        <label for="content">Contenu du message</label>
        <editor
          id="content"
          name="content"
          v-model="body"
          api-key="do9bmba4bf8mlrgeki054onbu8jv1wxpn1b1zvrx6wpn6bil"
          :init="{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
          }"
        />
      </div>

      <button class="btn btn-success" @click.prevent.once="updatePost">
        Modifier
      </button>
    </form>
  </section>
</template>


<script>
import postsQueries from "../services/postsQueries";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "EditPost",
  components: {
    editor: Editor,
  },
  data() {
    return {
      roleId: sessionStorage.getItem("roleId"),
      id: 0,
      userId: sessionStorage.getItem("userId"),
      title: "",
      body: "",
      image: "",
    };
  },
  methods: {
    updatePost() {
      let payload = new FormData();
      let imagefile = document.querySelector("#file");
      if (document.getElementById("file").value) {
        payload.append("image", imagefile.files[0]);
      }
      payload.append("userId", this.userId);
      payload.append("postTitle", this.title);
      payload.append("postContent", this.body);
      postsQueries
        .update(this.id, payload)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/posts/${this.id}`);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPostData(id) {
      postsQueries
        .getOne(id)
        .then((response) => {
          this.id = response.data.id;
          this.title = response.data.postTitle;
          this.body = response.data.content;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getPostData(this.$route.params.id);
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}

.post-form {
  width: 80%;
  margin: 0 auto;
}
</style>