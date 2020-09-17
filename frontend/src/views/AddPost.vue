<script>
import postsQueries from "../services/postsQueries"
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'AddPost',
    components: {
     'editor': Editor
    },  
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
        savePost() {
            let data = {
                userId: this.post.userId,
                postTitle: this.post.postTitle,
                content: this.post.content,
                image: this.post.image
            };
        postsQueries.create(data)
        .then(response => {
            this.post.id = response.data.id;
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });

        }
    }
}
</script>

<template>
    <div id="post-form">
        <div class="form-group">
            <label for="post-title">Titre du post</label>
            <input type="text" class="form-control" v-model="post.postTitle" id ="post-title" placeholder="Titre du post">
        </div>
        <div class="form-group">
            <label for="post-image">Ajouter une image</label>
            <input type="file" class="form-control-file" id="post-image">
        </div>
        <div class="form-group">
            <label for="post-content">Contenu du message</label>
            <editor
            api-key="do9bmba4bf8mlrgeki054onbu8jv1wxpn1b1zvrx6wpn6bil"
            :init="{
                height: 500,
                menubar: false,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }"
            />
        </div>
        <button class="btn btn-success" @click="savePost">Poster</button>
    </div>
    
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }

    #post-form {
        width:80%;
        margin:0 auto;
    }
    .form-group {
        label {
            font: normal normal 600 1.2rem/130% 'Raleway', sans-serif;
        }
    }
</style>