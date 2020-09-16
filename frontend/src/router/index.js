import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EditUser from '../views/EditUser.vue'
import PostDetail from '../views/PostDetail.vue'
import AddPost from '../views/AddPost.vue'
import UserPosts from '../views/UserPosts.vue'
import EditPost from '../views/EditPost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/EditUser',
    name: 'EditUser',
    component: EditUser
  },
  {
    path:'/posts/:id',
    name:'PostDetails',
    component: PostDetail
  },
  {
    path: '/posts/:id/edit',
    name: 'EditPost',
    component: EditPost
  },
  {
    path:'/posts/myposts/:userid',
    name:'UserPosts',
    component: UserPosts
  },
  {
    path:'/posts/add',
    name:'AddPost',
    component: AddPost
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
