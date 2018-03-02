/**
 * @file: index.
 * @intro: 全局配置文件.
 * @author: chenlin.
 * @email: chenlin@163.com.
 * @Date: 2017/12/15 16:38.
 * @Copyright(©) 2017 by thinkive.
 *
 */
const isTest = location.host.match(/36.7|localhost|21.80/) != null
//本地存储的前缀
export const storage_prefix = 'zzm_admin_storage_'
//base64加密前缀
export const base64_prefix = 'zzm_admin_base64_'
//接入服务器接口地址根目录
//http://localhost:51341
export const server_base_url =isTest ? 'http://dutchboychina.cn/designAdmin/' : 'http://dutchboychina.cn/designAdmin/'
