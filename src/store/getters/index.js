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

import * as type from 'store/getters/type'

export default {
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  },
  [type.SET_ROLES]: state => {
    return state.role
  },
  [type.SET_ROUTERS]: state => {
    return state.newrouter
  }
}
