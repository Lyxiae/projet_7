<template>

  <div class="home">
    <section class="postlist">
      <h2>Posts récents</h2>
      <div class="post-item" v-for="post in posts"
      :key="post.postTitle">
        <h2>
          <h3><router-link :to="'/posts/' + post.id">{{ post.postTitle }}</router-link></h3>
        </h2>
        <img :src="post.image"/>
      </div>
    </section>
    
  </div>
</template>

<script>
import postsQueries from "../services/postsQueries"

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
        getPosts() {
            postsQueries.getAll()
            .then(response => {
                this.posts = response.data;
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            });
        },
        
    },
  mounted() {
      this.getPosts();
  }
}
</script>
