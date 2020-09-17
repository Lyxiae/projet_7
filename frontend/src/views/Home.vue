<template>

  <div class="home">
    <section class="postlist">

        <h2>Posts récents</h2>
        <div class="post-item card" v-for="post in posts"
        :key="post.postTitle">
          <div class="card-img">
            <img class="card-img-top" v-if="post.image" alt="Image du post" :src="post.image"/>
          </div>
          <h2 class="card-title">
            <router-link class="card-title-link" :to="'/posts/' + post.id">{{ post.postTitle }}</router-link>
          </h2>
            
          <div class="card-footer">
            <small class="text-muted">Posté le : {{ post.date_posted }}</small>
          </div>
        </div>

    </section>
    
  </div>
</template>

<script>
import postsQueries from "../services/postsQueries"
import moment from 'moment';

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
              console.log(this.posts);
                this.posts = response.data;
                //Mise en forme des dates avec Moment
                for (let post of this.posts) {
                  post.date_posted = moment(post.date_posted).utc().format("DD-MM-YYYY à hh:mm:ss");
                }
                console.log(response.data);
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

<style lang="scss">
.postlist {
  width:70%;
  margin:0 auto;
}

.card {
  margin: 20px 0;
  
  .card-title {
    a {
    color:#D1515A;
    transition:0.150s ease-in-out;
    &:hover {
      color:#fd505b;
      text-decoration:none;
    } 
  }
  }
  .card-img {
    height:200px;
    width:100%;
    overflow:hidden;
    background:#bcbfc9;
    position:relative;
    border-radius: 3px 3px 0px 0px;
    &::before {
      content:"?";
      font:normal normal 700 10rem/100% "Raleway", sans-serif;
      position:absolute;
      width:100%;
      left:0;
      text-align:center;
      top:25px;
      color:rgba(255,255,255,0.5);
      z-index:0;
    }
    img {
      position:relative;
      z-index:2;
    }
  }
}
</style>