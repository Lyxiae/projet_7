<template>
    <div class="post-details container">
        <div class="post-content rounded">
            <h2>{{ post.postTitle }}</h2>
            <div class="post-infos">Posté le : {{ post.date_posted }} par <router-link :to="'/profile/' + post.userId">{{ `${post.firstname} ${post.surname}`}}</router-link></div>
            <img
                class="post-image"
                :src="post.image"
            />
            <div v-html="post.content" class="post-text">{{ post.content }}</div>
            <div class="post-reactions">
                <span>{{ this.reactions.likes.length }}</span> <button class="btn btn-light" id="btn-like" @click="likePost" :change="getReactions"><i class="far fa-thumbs-up"></i></button>
                <button class="btn btn-light" id="btn-dislike" @click="dislikePost" :change="getReactions"><i class="far fa-thumbs-down"></i></button> <span :key="this.reactions.dislikes.length">{{ this.reactions.dislikes.length }}</span>
            </div>
            <div class="post-actions">
                <button class="btn btn-danger" @click="deletePost">Supprimer ce post</button>
                <button class="btn btn-dark" @click="gotoUpdatePost">Editer ce post</button>
            </div>
        </div>
        <div class="post-comments">
            <h3>Commentaires</h3>
            <div class="post-comments-item my-3 rounded" v-for='comment in comments' :key="comment.id">
                <div class="post-comments-header">#{{ comment.id }} - Posté le : {{ comment.date_posted }} par <router-link :to="'/profile/' + comment.userId">{{ comment.firstname + ' ' + comment.surname }}</router-link></div>
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
            <button class="btn btn-success" @click="saveComment" :change="getComments">Poster votre commentaire</button>
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
      userId: this.$store.state.userId,
      post: [],
      comments: [],
      newComment: {
          userId: this.$store.state.userId,
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
        deletePost() {
            postsQueries.delete(this.post.id)
            .then(response => {
                console.log(response.data);
                this.$router.push('/');
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
                    
                })
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
            // this.comments.push(data)
            postsQueries.createComment(data.postId, data)
                .then(response => {
                    this.newComment.id = response.data.id;
                    console.log(response.data);
                    this.comments = [];
                    this.getComments(this.$route.params.id);
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
    h2 {
        font-family:'Raleway', sans-serif;
        color:#D1515A;
        font-size:2.6rem;
        font-weight:700;
        margin:1rem 0 0 0;
        background:#fff;
        padding:1rem 0;
        border-radius:3px;
    }
    .post-content {
        background:#f8f8f8;
        .post-infos {
            background:#f3f3f3;
            margin:0 0 2rem 0;
            height:40px;
            font: normal normal 500 0.8rem/40px 'Arial', sans-serif;
            text-align:left;
            padding: 0 1rem;
            border-top:1px solid #e6e6e6;
        }
        .post-image {
            max-width:100%;
            margin:0 auto;
        }
        .post-text {
            background-color:white;
            margin: 2rem;
            padding:2rem;
            text-align:left;
        }
        .post-reactions {
            display:flex;
            justify-content:flex-end;
            align-content:center;
            align-items:center;
            padding:0 1rem;
            button {
                margin:0.5rem;
                background:white;
                border:1px solid #eee;
                &:hover {
                    border-color:#b3cfff
                }
            }
            span {
                margin: 0.5rem;
                font-weight:700;
                color:#375281;
            }
        }
        .post-actions {
            background:#eee;
            border-top:1px solid #e6e6e6;
            padding:1rem;
            border-radius:0 0 3px 3px;
        }
    }
    .post-comments {
        h3 {
            font-family:'Raleway', sans-serif;
            color:#1a2e50;
            font-size:2rem;
            font-weight:700;
            margin:1rem 0;
            background:#fff;
            padding:1rem 0;
            border-radius:3px; 
        }
    }
    .post-comments-item {
        background:#f8f8f8;
        padding-bottom:1rem;
        .post-comments-header {
             background:#f3f3f3;
            margin:0 0 1rem 0;
            height:40px;
            font: normal normal 500 0.8rem/40px 'Arial', sans-serif;
            text-align:left;
            padding: 0 1rem;
            border-bottom:1px solid #e6e6e6;
        }
        p {
            margin:0 1rem;
            padding:0.8rem;
            text-align:left;
        }
    }
</style>