<script>
import postsQueries from "../services/postsQueries"
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'EditPost',
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
        updatePost() {
            let data = new FormData(document.getElementById('post-form'));
            let imagefile = document.querySelector('#file');
            data.append("image", imagefile.files[0]);
            data.append("userId", this.$store.state.userId);
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
        
        <input type="submit" class="btn btn-success" @click="updatePost" value="Modifier"/>
    </form>
</section>
    
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