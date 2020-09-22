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
        getUserId() {
            this.post.userId = this.$store.state.userId;
            console.log(this.post.userId);
        },
        savePost() {
            let data = new FormData(document.getElementById('post-form'));
            let imagefile = document.querySelector('#file');
            data.append("image", imagefile.files[0]);
            data.append("userId", this.$store.state.userId);
            console.log(data.values);
        postsQueries.create(data)
        .then(response => {
            this.post.id = response.data.id;
            // this.$router.push(`/`);
        })
        .catch(e => {
            console.log(e);
        });

        },
        // imageUpload() {
        //     this.post.image = this.$refs.file.files[0];
        //     console.log(this.post.image);
        // }
        
    },
    mounted() {
       this.getUserId();     
    }
}
</script>

<template>
<section class="container">
    <div class="form-group">
            <label for="file">Ajouter une image</label>
            <input type="file" class="form-control-file" id="file" ref="file">
    </div>
    <form id="post-form" name="post-form">
        <div class="form-group">
            <label for="postTitle">Titre du post</label>
            <input type="text" class="form-control" v-model="post.postTitle" id="postTitle" name="postTitle" placeholder="Titre du post">
        </div>
        
        <div class="form-group">
            <label for="content">Contenu du message</label>
            <editor id="content" name="content" v-model="post.content"
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
        
        <input type="submit" class="btn btn-success" @click="savePost" value="Poster"/>
    </form>
</section>
    
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }

    .form-group {
        label {
            font: normal normal 600 1.2rem/130% 'Raleway', sans-serif;
        }
    }
</style>