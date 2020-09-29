<script>
import usersQueries from "../services/usersQueries"
export default {
    name: 'SideBar',
    data() {
        return {
            user: {
                surname:'',
                firstname:'',
                image:'',
            }
        }
    },
    methods: {
        getUserData(id) {
            usersQueries.getOneUser(id)
            .then(response => {
                this.user = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    },
    mounted() {
        this.getUserData(this.$store.state.userId);
    }

}
</script>

<template>
    <div class="sidebar col-2 d-none d-md-block">
        <div class="sidebar-content">
            <div class="user-avatar">
                <img :src="user.image" alt="Avatar de l'utilisateur"/>
            </div>
            <p>Bienvenue, 
                <br><strong>{{user.surname + ' ' + user.firstname}}</strong> !
                
            </p>
        </div>
    </div>
</template>

<style lang="scss">
    a {
        text-decoration:none;
    }
    .sidebar {
        height:auto;
        background:#486494;
        position:relative;
        &-content {
            position:sticky;
            position: -webkit-sticky;
            top:80px;
            height:300px;
            margin-top:20px;
            p {
            color:#bfd6fd;
            strong {
                color:white;
            }
        }
        }
        
    }

    .user-avatar {
        width:110px;
        border-radius:50%;
        overflow:hidden;
        margin:0 auto 20px auto;
        border: 5px solid rgba(255,255,255,0.2);
        img {
            width:100%;
            height:auto;
        }
    }

    @media (min-width:768px) {
        .user-avatar {
            width:90px;
        }
    }
    @media (min-width:992px) {
        .user-avatar {
            width:110px;
        }
    }

</style>