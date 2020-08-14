import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import Blog from '../views/Blog'
import Register from '../views/Register'
import BlogEdit from "../views/BlogEdit";
import BlogDetail from "../views/BlogDetail";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },{
      path: '/login',
      component: Login
    },{
      path: '/blog',
      component: Blog
    },{
      path: '/register',
      component: Register
    },{
      path: '/blogEdit',
      name: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true
      },
    },{
      path: 'blogDetail',
      name: 'BlogDetail',
      component: BlogDetail,
      meta: {
        requireAuth: true
      },
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
