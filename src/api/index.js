/**
 * @file: index.
 * @intro: api请求索引.
 * @author: chenlin.
 * @email: chenlin@163.com.
 * @Date: 2017/12/15 15:31.
 * @Copyright(©) 2017 by chenlin.
 *
 */

//导入模块
import * as api_file from './file'
import * as api_table from './table'
import * as api_user from './user'

const apiObj = {
  api_file,
  api_table,
  api_user
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return apiObj
      }
    }
  })
}

export default {
  install
}
