<template>
  <div class="home">
    <section class="postlist">
      <h2>Mes messages postés</h2>
      <div class="postlist-item" v-for="post in posts"
        :key="post.id">
        <div class="postlist-title">
            <router-link class="postlist-title" :to="'/posts/' + post.id"># {{ post.id }} - {{ post.postTitle }}</router-link>
        </div>
        <div class="postlist-date">
          <small class="text-muted">Posté le : {{ post.date_posted }}</small>
        </div>
      </div>
      <div class="postlist-item" v-if="this.posts.length == 0">
        <p>Vous n'avez pas encore posté de message sur notre réseau.</p>
      </div>
    </section>
    
  </div>
</template>

<script>
import postsQueries from "../services/postsQueries"
import moment from 'moment';

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
                response.data.forEach((post) => {
                    post.date_posted = moment(post.date_posted).utc().format("DD-MM-YYYY à hh:mm:ss");
                    this.posts.push(post)
                })
                
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

<style lang="scss">
.postlist-item {
  display:flex;
  justify-content:space-between;
  padding:10px;
  background:white;
  margin:10px auto;
  border-bottom:1px solid #ddd;
}
.postlist-title {
  a {
      color:#D1515A;
      text-decoration:none;
      font-weight:600;
      &:hover {
        color:#fd505b;
        text-decoration:none;
      }
    }
}
    
</style>
