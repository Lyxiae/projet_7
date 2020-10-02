import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
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
      meta: {
        requiresAuth: true
      }
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/profile/:id',
      name:'UserDetail',
      component: UserDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/posts/:id',
      name:'PostDetails',
      component: PostDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/:id/edit',
      name: 'EditPost',
      component: EditPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/posts/user/:userId',
      name:'UserPosts',
      component: UserPosts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/addpost',
      name:'AddPost',
      component: AddPost,
      meta: {
        requiresAuth: true
      }
    },
  ]
}) 

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router

