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

import {cookieStorage} from 'common/storage'
export default {
  //用户信息和是否登录
  user_info: cookieStorage.get('user_info'),
  role:sessionStorage.getItem('ROLE'),
  newrouter:[]
}
