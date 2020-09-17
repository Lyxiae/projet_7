<template>
    <div class="post-details">
        <h2>{{ post.postTitle }}</h2>
        <p>Posté le : {{ post.date_posted }}</p>
        <img
            class="menu-item__image"
            :src="post.image"
        />
        <p>{{ post.content }}</p>
        <div class="post-actions">
            <button class="btn btn-danger" @click="deletePost">Supprimer ce post</button>
            <button class="btn btn-dark" @click="gotoUpdatePost">Editer ce post</button>
        </div>
        <div class="post-comments">
            <div class="post-comments-item" v-for='comment in comments' :key="comment.id">
                <p>{{ comment.date_posted }}</p>
                <p>{{ comment.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import postsQueries from "../services/postsQueries"
import moment from 'moment';

export default {

    name: 'PostDetail',
    components: {

    },
  data() {
    return {
      post: [],
      comments: []
    }
  },
  methods: {
        getPost(id) {
            postsQueries.getOne(id)
            .then(response => {
                this.post = response.data;
                //Mise en forme de la date avec Moment
                this.post.date_posted = moment(this.post.date_posted).utc().format("DD-MM-YYYY à hh:mm:ss");
                console.log(moment(this.post.date_posted));
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
        },
        getComments(id){
            console.log('1');
            postsQueries.getComments(id)
            .then(response => {
                console.log('2');
                console.log(response.data);
                response.data.forEach((comment) => {
                    comment.date_posted = moment(comment.date_posted).utc().format("DD-MM-YYYY à hh:mm:ss");
                    this.comments.push(comment)
                })
            })
            .catch(e => {
                console.log(e)
            });
        }
    },
  mounted() {
      this.getPost(this.$route.params.id);
      this.getComments(this.$route.params.id);
  }
}
</script>
<style lang="scss">
    a {
        text-decoration:none;
    }

    .btn {
        margin:5px;
    }
</style>