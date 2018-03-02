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
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  [type.SET_ROLE](state,role) {
    state.role = role || {}
  },
  [type.SET_ROUTERS]: (state, newrouter) => {
    state.newrouter = newrouter;
  }
}
