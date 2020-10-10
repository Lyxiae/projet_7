import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/index'
import Home from '../views/Home.vue'
import EditUser from '../views/EditUser.vue'
import UserDetail from '../views/UserDetail.vue'
import PostDetail from '../views/PostDetail.vue'
import AddPost from '../views/AddPost.vue'
import UserPosts from '../views/UserPosts.vue'
import LastPosts from '../views/LastPosts.vue'
import EditPost from '../views/EditPost.vue'
import CreateUser from '../views/CreateUser.vue'
import Login from '../views/Login.vue'

Vue.use(Router) 

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path:'/posts/mod',
      name:'LastPosts',
      component: LastPosts,
    },
    {
      path:'/signup',
      name:'CreateUser',
      component: CreateUser
    },
    {
      path:'/login',
      name:'Login',
      component: Login
    },
    {
      path: '/EditUser',
      name: 'EditUser',
      component: EditUser,
    },
    {
      path:'/profile/:id',
      name:'UserDetail',
      component: UserDetail,
    },
    {
      path:'/posts/:id',
      name:'PostDetails',
      component: PostDetail,
    },
    {
      path: '/posts/:id/edit',
      name: 'EditPost',
      component: EditPost,
    },
    {
      path:'/posts/user/:userId',
      name:'UserPosts',
      component: UserPosts,
    },
    {
      path:'/addpost',
      name:'AddPost',
      component: AddPost,
    },
  ]
}) 

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (sessionStorage.getItem('userId') != null) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

export default router

