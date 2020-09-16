<template>
    <div class="post-details">
        <h2>{{ post.postTitle }}</h2>
        <p>{{ post.date_posted }}</p>
        <img
            class="menu-item__image"
            :src="post.image"
        />
        <p>{{ post.content }}</p>
        <div class="post-actions">
            <button class="btn btn-danger" @click="deletePost">Supprimer ce post</button>
            <button class="btn btn-warning" @click="gotoUpdatePost">Editer ce post</button>
        </div>
    </div>
</template>

<script>
import postsQueries from "../services/postsQueries"

export default {

    name: 'PostDetail',
    components: {

    },
  data() {
    return {
      post: [],
    }
  },
  methods: {
        getPost(id) {
            postsQueries.getOne(id)
            .then(response => {
                this.post = response.data;
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            });
        },
        deletePost(id) {
            postsQueries.delete(id)
            .then(response => {
                console.log(response.data);
                this.$router.push({ name: "Home" });
            })
            .catch(e => {
                console.log(e)
            });
        },
        gotoUpdatePost() {
            this.$router.push({ name: "EditPost"})
        }
    },
  mounted() {
      this.getPost(this.$route.params.id);
  }
}
</script>
<style lang="scss">
    a {
        text-decoration:none;
    }
</style>