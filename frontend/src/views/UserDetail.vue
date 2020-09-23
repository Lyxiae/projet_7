<template>
<section class="container">
    <div class="user-detail">
        {{ user.surname + user.firstname }}
        {{ user.birthday }}
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
                image:''
            }
        }
    },
    methods: {
        getUser(id) {
            usersQueries.getOneUser(id)
            .then(response => {
                this.user = response.data;      
                //Mise en forme de la date avec Moment
                this.user.birthday = moment(this.user.birthday).utc().format("DD-MM-YYYY à hh:mm:ss");   
            })
            .catch(e => {
                console.log(e)
            });
        }
    },
    mounted() {
        this.getUser(this.$route.params.id);
    }
}
</script>

<style lang="scss">

</style>