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
        correctDate() {
            
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

    .btn {
        margin:5px;
    }
</style>