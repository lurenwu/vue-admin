/**
 * @file: table.
 * @intro: table请求数据配置.
 * @author: chenlin.
 * @email: chenlin@163.com.
 * @Date: 2017/12/15 15:25.
 * @Copyright(©) 2017 by thinkive.
 *
 */

import fetch from 'common/fetch'
import {port_table} from 'common/port_uri'
//数据列表
export function getDesignList(params) {
  return fetch({
    url: port_table.getDesignList,
    method: 'get',
    params
  })
}
//图片列表
export function getDesignPic(params) {
  return fetch({
    url: port_table.getDesignPic,
    method: 'get',
    params
  })
}
//删除图片
export function delPic(params) {
  return fetch({
    url: port_table.delPic,
    method: 'get',
    params
  })
}
//删除设计师信息
export function delDesign(params) {
  return fetch({
    url: port_table.delDesign,
    method: 'get',
    params
  })
}
//更新设计师信息
export function updateDesign(params) {
  return fetch({
    url: port_table.updateDesign,
    method: 'get',
    params
  })
}
//数据列表
export function getOrderList(params) {
  return fetch({
    url: port_table.getOrderList,
    method: 'get',
    params
  })
}
//根据id查询数据
export function get(params) {
  return fetch({
    url: port_table.get,
    method: 'get',
    params
  })
}

//根据id删除数据
export function del(data) {
  return fetch({
    url: port_table.del,
    method: 'post',
    data
  })
}
//添加或修改数据
export function saveDesignInfo (params) {
  return fetch({
    url: port_table.saveDesignInfo ,
    method: 'post',
    params
  })
}
//添加或修改案例数据
export function saveExampleInfo (params) {
  return fetch({
    url: port_table.saveExampleInfo ,
    method: 'post',
    params
  })
}
export function getExampleList(params) {
  return fetch({
    url: port_table.getExampleList,
    method: 'get',
    params
  })
}
//批量删除
export function batch_del(data) {
  return fetch({
    url: port_table.batch_del,
    method: 'get',
    data
  })
}

