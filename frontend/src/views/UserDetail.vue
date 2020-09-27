<template>
    <section class="container">
        <div class="user-detail">
            <div class="user-avatar">
                <img :src="user.image" alt="Avatar de l'utilisateur"/>
            </div>
            <h2>{{ user.firstname + ' ' + user.surname }}</h2>
            <p class="birthday">Anniversaire : <strong>{{ user.birthday }}</strong></p>
            <h3 class="pb-3">Statistiques</h3>
            <div class="user-stats row">
                <p class="col-6">Nombre de commentaires postés : <strong>{{ stats.comments }}</strong></p>
                <p class="col-6">Nombre de réactions aux posts : <strong>{{ stats.reactions }}</strong></p>
            </div>

        </div>
    </section>
</template>

<script>
import usersQueries from "../services/usersQueries"
import moment from 'moment';

export default {
    name:'UserDetail',
    data() {
        return {
            user: {
                surname:'',
                firstname:'',
                birthday:'',
                image:'',
                
            },
            stats: {
                comments: '',
                reactions: ''
            }
        }
    },
    methods: {
        getUser(id) {
            usersQueries.getOneUser(id)
            .then(response => {
                this.user = response.data;      
                //Mise en forme de la date avec Moment
                this.user.birthday = moment(this.user.birthday).utc().format("DD-MM-YYYY");   
                
                console.log(this.user);
            })
            .catch(e => {
                console.log(e)
            });
        },
        getUserStats(id) {
            usersQueries.getUserComments(id)
            .then(response => {
                this.stats.comments = response.data.length;
                usersQueries.getUserReactions(id)
                .then(response => {
                    this.stats.reactions = response.data.length;
                    
                })
                .catch(e => {
                console.log(e)
                });
            })
            .catch(e => {
                console.log(e)
            });
        }
    },
    created() {
        this.getUserStats(this.$route.params.id);
        this.getUser(this.$route.params.id);
        
    }
}
</script>

<style lang="scss">
    .user-detail {
        padding:20px;
    }
    .birthday {
        text-align:right;
    }
</style>