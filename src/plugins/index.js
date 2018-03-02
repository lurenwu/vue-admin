/**
 * Created by chenlin on 2017/3/23.
 *
 * 自定义插件
 *
 * @author: chenlin
 * @github: https://github.com/chenlin
 * @email: chenlin@163.com
 * @Date: 2017/3/23 18:29
 * @Copyright(©) 2017 by chenlin.
 *
 */
import dateFormat from 'plugins/date'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $dateFormat: {
      get() {
        return dateFormat
      }
    }
  })
}

export default {
  install
}
