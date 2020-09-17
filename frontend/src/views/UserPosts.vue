<template>
  <div class="home">
    <section class="postlist">
      <h2>Mes messages postés</h2>
      <div class="post-item" v-for="post in posts"
        :key="post.id">
        <h2>
          <h3><router-link :to="'/posts/' + post.id">{{ post.postTitle }}</router-link></h3>
        </h2>
        <img :src="post.image"/>
        <p>{{ post.content }}</p>
      </div>
    </section>
    
  </div>
</template>

<script>
import postsQueries from "../services/postsQueries"

export default {
  name: 'UserPosts',
  data() {
    return {
      posts: [],
      
    }
  },
  methods: {
        getUserPosts(userId) {
            postsQueries.findByAuthor(userId)
            .then(response => {
                this.posts = (response.data);
                console.log(response.data)
                console.log(this.posts);
            })
            .catch(e => {
                console.log(e)
            });
        }
    },
  mounted() {
      this.getUserPosts(this.$route.params.userId)
  }
}
</script>
