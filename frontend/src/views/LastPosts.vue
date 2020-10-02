<template>
  <div class="home">
    <section class="postlist">
      <h2>Dernières interactions</h2>
      <div class="postlist-item" v-for="post in posts"
        :key="post.id">
        <template>
            <div v-if="!post.postTitle.includes('Nouveau commentaire')" class="postlist-title">
                <router-link class="postlist-title" :to="'/posts/' + post.postId"># {{ post.postId }} - {{ post.postTitle }}</router-link> par {{ post.firstname }} {{ post.surname }}
            </div>
            <div v-if="post.postTitle.includes('Nouveau commentaire')" class="postlist-title">
                <router-link class="postlist-title" :to="{path:'/posts/' + post.postId, hash: '#' + post.commentId}"># {{ post.commentId }} - {{ post.postTitle }}</router-link> par {{ post.firstname }} {{ post.surname }}
            </div>
        </template>
        <div class="postlist-date">
          <small class="text-muted">Posté le : {{ post.postDate }}</small>
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
        getLastPosts() {
            postsQueries.getLastPosts()
            .then(response => {
                response.data.forEach((post) => {
                    post.postDate = moment(post.postDate).utc().format("DD-MM-YYYY à hh:mm:ss");
                    if (post.postTitle == null) {
                        post.postTitle = 'Nouveau commentaire'
                    }
                    this.posts.push(post)
                })
                console.log(response.data);
                console.log(this.posts);
                
            })
            .catch(e => {
                console.log(e)
            });
        },
    },
  mounted() {
      this.getLastPosts()
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
