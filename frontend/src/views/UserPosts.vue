<template>
  <div class="home">
    <section class="postlist">
      <h2>Mes messages postés</h2>
      <div class="post-item card" v-for="post in posts"
        :key="post.id">
          <div class="card-img">
            <img class="card-img-top" v-if="post.image" alt="Image du post" :src="post.image"/>
          </div>
          <h2 class="card-title">
            <router-link class="card-title-link" :to="'/posts/' + post.id">{{ post.postTitle }}</router-link>
          </h2>
            
          <div class="card-footer">
            <small class="text-muted">Posté le : {{ post.date_posted }} par {{ `${post.firstname} ${post.surname}`}}</small>
          </div>
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
