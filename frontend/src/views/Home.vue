<template>
  <div class="home">
    <section class="postlist container">
      <h2>Posts récents</h2>
      <div class="post-item card" v-for="post in posts" :key="post.id">
        <div class="card-img">
          <img
            class="card-img-top"
            v-if="post.image"
            alt="Image du post"
            :src="post.image"
          />
        </div>
        <h3 class="card-title">
          <router-link class="card-title-link" :to="'/posts/' + post.id">{{
            post.postTitle
          }}</router-link>
        </h3>

        <div class="card-footer">
          <small class="text-muted"
            >Posté le : {{ post.date_posted }} par
            <router-link :to="'/profile/' + post.userId">{{
              `${post.firstname} ${post.surname}`
            }}</router-link></small
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import postsQueries from "../services/postsQueries";
import moment from "moment";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
      posts: [],
    };
  },
  methods: {
    getPosts() {
      postsQueries
        .getAll()
        .then((response) => {
          response.data.forEach((post) => {
            post.date_posted = moment(post.date_posted)
              .utc()
              .format("DD-MM-YYYY à hh:mm:ss");
            this.posts.push(post);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style lang="scss">
.postlist {
  margin: 0 auto;
}

h2 {
  font-family: "Raleway", sans-serif;
  color: #d1515a;
  font-size: 4rem;
  font-weight: 700;
  margin: 1rem 0;
  background: #fff;
  padding: 1rem 0;
  border-radius: 3px;
}
.card {
  margin: 20px 0;

  .card-title {
    font-family: "Raleway", sans-serif;
    a {
      color: #d1515a;
      transition: 0.15s ease-in-out;
      &:hover {
        color: #fd505b;
        text-decoration: none;
      }
    }
  }
  .card-img {
    height: auto;
    width: 100%;
    max-height: 200px;
    overflow: hidden;
    background: #bcbfc9;
    position: relative;
    border-radius: 3px 3px 0px 0px;
    &::before {
      content: "?";
      font: normal normal 700 10rem/100% "Raleway", sans-serif;
      position: absolute;
      width: 100%;
      left: 0;
      text-align: center;
      top: 25px;
      color: rgba(255, 255, 255, 0.5);
      z-index: 0;
    }
    img {
      position: relative;
      z-index: 2;
    }
  }
}
</style>