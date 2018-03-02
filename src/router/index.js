/**
 * Created by chenlin on 2017/3/23.
 *
 * 路由Map
 *
 * @author: chenlin
 * @github: https://github.com/chenlin
 * @email: chenlin@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by chenlin.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
import baseTableComponent from 'pages/table/base'
import saveTableComponent from 'pages/table/save'
import basePhotoComponent from 'pages/photo/base'
import baseOrderComponent from 'pages/order/base'
import savePhotoComponent from 'pages/photo/save'
import saveExamplePhotoComponent from 'pages/examplePhoto/save'
import barChartsComponent from 'pages/charts/bar'

Vue.use(VueRouter)
//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
 export const constantRouterMap = [{
  path: '/user/login',
  name: 'login',
  component: loginComponent,
  
},{
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: baseTableComponent,
    meta: {
      title: "主页",
    }
}]
}]
  const powerRouter = [
  {
    path: '/',
    redirect: '/table',
    component: viewPageComponent,
    title: "订单管理",
    children: [{
      path: '/table',
      name: 'table',
      component: baseTableComponent,
      meta: {
        title: "主页",
        role: 'admin',
        isShow: true
      }
    }, {
      path: '/table/base',
      name: 'tableBase',
      component: baseTableComponent,
      meta: {
        title: "基本人员",
        role: 'admin',
        isShow: true
      }

    }, {
      path: '/table/update/:id',
      name: 'tableUpdate',
      component: saveTableComponent,
      meta: {
        title: "数据修改",
        role: 'admin',
        isShow: false
      }
    }, {
      path: '/table/add',
      name: 'tableAdd',
      component: saveTableComponent,
      meta: {
        title: "添加数据",
        role: 'admin',
        isShow: false
      }
    }, {
      path: '/photo/base',
      name: 'tableBase',
      component: basePhotoComponent,
      meta: {
        title: "图片",
        role: 'admin',
        isShow: false
      }
    }, {
      path: '/photo/update/:id',
      name: 'photoUpdate',
      component: savePhotoComponent,
      meta: {
        title: "数据修改",
        role: 'admin',
        isShow: false
      }
    }, {
      path: '/examplePhoto/add',
      name: 'examplePhotoAdd',
      component: saveExamplePhotoComponent,
      meta: {
        title: "添加数据",
        role: 'admin',
        isShow: false
      }
    },{
      path: '/examplePhoto/update/:id',
      name: 'examplePhotoUpdate',
      component: saveExamplePhotoComponent,
      meta: {
        title: "数据修改",
        role: 'admin',
        isShow: false
      }
    }, {
      path: '/photo/add',
      name: 'photoAdd',
      component: savePhotoComponent,
      meta: {
        title: "添加数据",
        role: 'admin',
        isShow: false
      }
    },  
    {
      path: '/order/base',
      name: 'orderBase',
      component: baseOrderComponent,
      meta: {
        title: "订单管理",
        role: 'admin',
        isShow: true
      }
    }]
  }, {
    path: '/404',
    name: 'notPage',
    component: noPageComponent
  }, {
    path: '*',
    redirect: '/404'
  }]
const router = new VueRouter({
  routes:constantRouterMap,
  mode: 'hash', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
const whiteList = ['/user/login']// no redirect whitelist

//全局路由配置
//路由开始之前的操作
//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  console.log(store.getters.SET_ROLES)
  if(store.getters.SET_ROLES){ //判断role 是否存在
    if(store.getters.SET_ROUTERS.length !== 0){  
         next();
    }else{
      let newrouter
        //  if (store.getters.SET_ROLES == 'admin') {  //判断权限
        //       newrouter = powerRouter
        //   } else {
              let newchildren = powerRouter[0].children.filter(route => {
                if(route.meta){
                  if(route.meta.role == store.getters.SET_ROLES){
                    return true
                  }
                  return false
                }else{
                  return true
                }
              });
              newrouter = powerRouter
              newrouter[0].children = newchildren
          // }
          router.addRoutes(newrouter) //添加动态路由
          store.dispatch('Roles',newrouter).then(res => { 
              next({ ...to })
          }).catch(() => {       

          })
    }	  
  }else{
       if (('/user/login').indexOf(to.path) !== -1) { 
         next()
      } else {
         next('/user/login')
      }
}
  


  
  
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
