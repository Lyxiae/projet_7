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
          id="postTitle"
          name="postTitle"
          v-model="title"
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
      <button class="btn btn-success" @click.once.prevent="savePost">
        Poster
      </button>
    </form>
  </section>
</template>


<script>
import postsQueries from "../services/postsQueries";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "AddPost",
  components: {
    editor: Editor,
  },
  data() {
    return {
      userId: 0,
      title: "",
      body: "",
      image: "",
    };
  },
  methods: {
    savePost() {
      let payload = new FormData();
      let imagefile = document.querySelector("#file");
      payload.append("image", imagefile.files[0]);
      payload.append("userId", this.userId);
      payload.append("postTitle", this.title);
      payload.append("postContent", this.body);
      postsQueries
        .create(payload)
        .then((response) => {
          console.log(response);
          this.$router.push(`/`);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.userId = this.$store.state.userId;
  },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
}

.form-group {
  label {
    font: normal normal 600 1.2rem/130% "Raleway", sans-serif;
  }
}
</style>