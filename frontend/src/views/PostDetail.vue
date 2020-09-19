<template>
    <div class="post-details">
        <h2>{{ post.postTitle }}</h2>
        <p>Posté le : {{ post.date_posted }} par {{ `${post.firstname} ${post.surname}`}}</p>
        <img
            class="menu-item__image"
            :src="post.image"
        />
        <div v-html="post.content">{{ post.content }}</div>
        <span>{{ this.reactions.likes.length }}</span> <button class="btn btn-light" id="btn-like" @click="likePost" :change="getReactions"><i class="far fa-thumbs-up"></i></button>
        <button class="btn btn-light" id="btn-dislike" @click="dislikePost" :change="getReactions"><i class="far fa-thumbs-down"></i></button> <span :key="this.reactions.dislikes.length">{{ this.reactions.dislikes.length }}</span>
        <div class="post-actions">
            <button class="btn btn-danger" @click="deletePost">Supprimer ce post</button>
            <button class="btn btn-dark" @click="gotoUpdatePost">Editer ce post</button>
        </div>
        <div class="post-comments">
            <div class="post-comments-item" v-for='comment in comments' :key="comment.id">
                <p>#{{ comment.id }} - Posté le : {{ comment.date_posted }} par {{ comment.firstname + ' ' + comment.surname }}</p>
                <p v-html="comment.content">{{ comment.content }}</p>
            </div>
        </div>
            <div class="add-comment">
            <div class="form-group container">
                <label for="comment-content">Ajouter un commentaire</label>
                <editor id="comment-content" v-model="newComment.content"
            api-key="do9bmba4bf8mlrgeki054onbu8jv1wxpn1b1zvrx6wpn6bil"
            :init="{
                height: 300,
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
            <button class="btn btn-success" @click="saveComment">Poster votre commentaire</button>
            </div>
        </div>
    </div>
</template>

<script>
import postsQueries from "../services/postsQueries"
import moment from 'moment';
import Editor from '@tinymce/tinymce-vue'

export default {

    name: 'PostDetail',
    components: {
        'editor': Editor
    },
  data() {
    return {
      userId: 7,
      post: [],
      comments: [],
      newComment: {
          userId: 7,
          content:"",
      },
      reactions: {
          likes: [],
          dislikes: [],
      },
    }
  },
  methods: {
        getPost(id) {
            postsQueries.getOne(id)
            .then(response => {
                this.post = response.data;
                //Mise en forme de la date avec Moment
                this.post.date_posted = moment(this.post.date_posted).utc().format("DD-MM-YYYY à hh:mm:ss");
                //Récupération des réactions (likes-dislikes)
                this.getReactions(this.$route.params.id);                
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
            postsQueries.getComments(id)
            .then(response => {
                response.data.forEach((comment) => {
                    comment.date_posted = moment(comment.date_posted).utc().format("DD-MM-YYYY à hh:mm:ss");
                    this.comments.push(comment)
                });
            })
            .catch(e => {
                console.log(e)
            });
        },
        saveComment() {
            let data = {
                userId: this.userId,
                postId: this.post.id,
                content: this.newComment.content
            };
            console.log(this.newComment);
            console.log(data);
            postsQueries.createComment(data.postId, data)
                .then(response => {
                    this.newComment.id = response.data.id;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        likePost() {
            if (this.checkDislikes()) {
                alert('Vous ne pouvez pas liker, car vous avez déjà disliké ce post');
                return;
            }
            if (this.checkLikes()) {
                let data = {
                userId: this.userId,
                postId: this.post.id,
                reaction: 3
                };
                postsQueries.createReaction(data.postId, data)
                    .then(response => {
                        console.log(response.data);
                        this.getReactions(this.$route.params.id);
                        document.getElementById('btn-like').innerHTML = '<i class="far fa-thumbs-up"></i>';
                        document.getElementById('btn-dislike').classList.remove("disabled");
                        
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                let data = {
                userId: this.userId,
                postId: this.post.id,
                reaction: 1
            };
            postsQueries.createReaction(data.postId, data)
                .then(response => {
                    console.log(response.data);
                    this.getReactions(this.$route.params.id);
                    if (this.checkLikes()) {
                        document.getElementById('btn-like').innerHTML = '<i class="fas fa-thumbs-up"></i>';
                        document.getElementById('btn-dislike').classList.add("disabled");
                    }
                    
                })
                .catch(e => {
                    console.log(e);
                });
            }
            
        },
        dislikePost() {
            if (this.checkLikes()) {
                alert('Vous ne pouvez pas disliker, car vous avez déjà liké ce post');
                return;
            }
            if (this.checkDislikes()) {
                let data = {
                userId: this.userId,
                postId: this.post.id,
                reaction: 3
            };
                postsQueries.createReaction(data.postId, data)
                .then(response => {
                    console.log(response.data);
                    this.getReactions(this.$route.params.id);
                    if (this.checkDislikes()) {
                        document.getElementById('btn-dislike').innerHTML = '<i class="far fa-thumbs-down"></i>';
                        document.getElementById('btn-like').classList.remove("disabled");
                    }
                    
                    
                })
                .catch(e => {
                    console.log(e);
                });
            } else {
                let data = {
                userId: this.userId,
                postId: this.post.id,
                reaction: 2
                };
                postsQueries.createReaction(data.postId, data)
                .then(response => {
                    console.log(response.data);
                    this.getReactions(this.$route.params.id);
                    document.getElementById('btn-dislike').innerHTML = '<i class="fas fa-thumbs-down"></i>';
                    document.getElementById('btn-like').classList.add("disabled");
                    
                })
                .catch(e => {
                    console.log(e);
                });
            }
            
        },
        getReactions(id) {
            postsQueries.getReactions(id)
            .then(response => {
                this.reactions.likes = response.data.likes;
                this.reactions.dislikes = response.data.dislikes;
                // Vérification du statut des réactions pour l'utilisateur
                this.checkReactions();
            })
            .catch(e => {
                console.log(e)
            });
        },
        checkReactions() {
            console.log(this.reactions.dislikes);
            if (this.checkLikes()) {
                console.log('userliked');
                document.getElementById('btn-like').innerHTML = '<i class="fas fa-thumbs-up"></i>';
                document.getElementById('btn-dislike').classList.add("disabled");
            }
            if (this.checkDislikes()) {
                console.log('userDisliked');
                document.getElementById('btn-dislike').innerHTML = '<i class="fas fa-thumbs-down"></i>';
                document.getElementById('btn-like').classList.add("disabled");
            }
        },
        checkLikes() {
            if (this.reactions.likes.some(el => el.postId == this.post.id && el.userId == this.userId && el.reaction == 1)) {
                return true
            } else {
                return false
            }
        },
        checkDislikes() {
            if (this.reactions.dislikes.some(el => el.postId == this.post.id && el.userId == this.userId && el.reaction == 2)) {
                return true
            } else {
                return false
            }
        },
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

    #btn-like {
        color:green;
    }

    #btn-dislike {
        color:red;
    }
</style>