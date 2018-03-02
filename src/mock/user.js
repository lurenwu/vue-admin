/**
 * Created by chenlin on 2017/3/21.
 *
 * @author: chenlin
 * @github: https://github.com/chenlin
 * @email: chenlin@163.com
 * @Date: 2017/3/21 10:55
 * @Copyright(©) 2017 by chenlin.
 *
 */

import Mock from 'mockjs'
import {port_code, port_user} from 'common/port_uri'

Mock.mock(new RegExp(port_user.login), ({body}) => {
  const {username, password} = JSON.parse(body)
  if (username === 'admin' && password === 'admin') {
    return Mock.mock({
      code: port_code.success,
      msg: "登录成功",
      data: {
        username: 'admin',
        pew: 'admin',
        role: 'admin',
      }
    })
  } else if (username === 'user' && password === 'user') {
    return Mock.mock({
      code: port_code.success,
      msg: "登录成功",
      data: {
        username: 'user',
        pew: 'user',
        role: 'user',
      }
    })
  } else {
    return Mock.mock({
      code: port_code.error,
      msg: "账号或密码错误"
    })
  }
})

Mock.mock(new RegExp(port_user.logout), {
  code: port_code.success,
  msg: "退出成功"
})
