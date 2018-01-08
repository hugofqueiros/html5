import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Servers from '@/components/servers/Servers'
import User from '@/components/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/servers',
      name: 'Servers',
      component: Servers
    }, {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
