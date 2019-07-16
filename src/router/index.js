import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: resolve => require(['@/components/home'], resolve),
      redirect:"index",
      meta:{
        title:"贝思客蛋糕"
      },
      children: [
        //首页
        {
          path: 'index',
          name: 'index',
          meta:{
            keepAlive:false,
            title:"贝思客蛋糕"
          },
          component: resolve => require(['@/components/main/index'], resolve)
        },
        // 分类
        {
          path: 'class',
          name: 'class',
          meta:{
            keepAlive:false,
            title:"列表"
          },
          component: resolve => require(['@/components/main/class'], resolve),
        },
        //购物车
        {
          path: 'cart',
          name: 'cart',
          meta:{
            keepAlive:false,
            title:"购物车"
          },
          component: resolve => require(['@/components/main/cart'], resolve),
        },
        // 用户
        {
          path: 'user',
          name: 'user',
          meta:{
            keepAlive:false,
            title:"登录"
          },
          component: resolve => require(['@/components/main/user'], resolve),
        },
        //详情页
        {
          path: 'show',
          name: 'show',
          meta:{
            keepAlive:false,
            title:"商品详情"
          },
          component: resolve => require(['@/components/main/show'], resolve),
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          meta:{
            keepAlive:false,
            title:"个人信息"
          },
          component: resolve => require(['@/components/main/userInfo'], resolve),
        }, 
        {
          path: 'back',
          name: 'back',
          meta:{
            keepAlive:false,
            title:"退出登录"
          },
          component: resolve => require(['@/components/main/back'], resolve),
        },
      ]
    }
  ]
})
