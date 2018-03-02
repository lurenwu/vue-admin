/**
 * Created by chenlin on 2017/3/21.
 *
 * @author: chenlin
 * @github: https://github.com/chenlin
 * @email: chenlin@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by chenlin.
 *
 */

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
export default {
  //设置用户信息和登录
  [actions.SET_USER_INFO]({ commit }, userinfo) {

    commit(mutations.SET_USER_INFO, userinfo)
    commit('SET_ROLE', userinfo.user.role)
    sessionStorage.setItem('ROLE', userinfo.user.role);
  },
  [actions.GenerateRoutes]({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data;
      const accessedRouters = asyncRouterMap.filter(v => {
        if (roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(roles, child)) {
                return child
              }
              return false;
            });
            return v
          } else {
            return v
          }
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
      resolve();
    })
  },
  [actions.Roles]({ commit }, newrouter){
    return new Promise((resolve, reject) => {
      commit('SET_ROUTERS',newrouter); //存储最新路由
      resolve(newrouter);
    }).catch(error => {
        reject(error);
    });
},
}
