<script>
import postsQueries from "../services/postsQueries"
export default {
    name: 'EditPost',
    data() {
        return {
            post: {
                userId:3,
                postTitle:"",
                content:"",
                image:"",
            }
        }
    },
    methods: {
        updatePost() {
            let data = {
                userId: this.post.userId,
                postTitle: this.post.postTitle,
                content: this.post.content,
                image: this.post.image
            };
            postsQueries.update(this.post.id, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        getPostData(id) {
            postsQueries.getOne(id)
            .then(response => {
                this.post = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.getPostData(this.$route.params.id)
    }
}
</script>

<template>
    <div class="post-form">
        <div class="form-group">
            <label for="post-title">Titre du post</label>
            <input type="text" class="form-control" v-model="post.postTitle" id ="post-title" placeholder="Titre du post">
        </div>
        <div class="form-group">
            <label for="post-image">Ajouter une image</label>
            <input type="file" class="form-control-file" id="post-image">
        </div>
        <div class="form-group">
            <label for="post-image">Votre message</label>
            <input type="textarea" class="form-control-file" v-model="post.content" id="post-content">
        </div>
        <button class="btn btn-success" @click="updatePost">Modifier</button>
    </div>
    
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }

    .post-form {
        width:80%;
        margin:0 auto;
    }
</style>