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
                userId:this.$store.state.userId,
                postTitle:"",
                content:"",
                image:"",
            }
        }
    },
    methods: {
        savePost() {
            console.log(this.post.image);
            let data = {
                userId: this.post.userId,
                postTitle: this.post.postTitle,
                content: this.post.content,
                image: this.post.image
            };
            console.log(data);
        postsQueries.create(data)
        .then(response => {
            this.post.id = response.data.id;
            console.log(response.data);
            this.$router.push(`/posts/${this.post.id}`);
        })
        .catch(e => {
            console.log(e);
        });

        },
        imageUpload() {
            this.post.image = this.$refs.file.files[0];
            console.log(this.post.image);
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
            <label for="file">Ajouter une image</label>
            <input type="file" class="form-control-file" id="file" ref="file" @change="imageUpload">
        </div>
        <div class="form-group">
            <label for="post-content">Contenu du message</label>
            <editor id="post-content" v-model="post.content"
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