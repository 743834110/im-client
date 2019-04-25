import request from '../utils/request';
import wsRequest from "../utils/wsRequest";

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/userService/queryById', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

/**
 * 通过分页对象查询
 * @param params
 * @return {Promise<*>}
 */
export async function queryUser(params) {
  return request('/rest/userService/queryByPager', {
    method: 'POST',
    body: {
      ...params
    }
  });
}

/**
 * 通过ID数组进行对象的删除
 * @param params
 * @return {Promise<*>}
 */
export async function removeUser(params) {
  return request('/rest/userService/deleteByIds', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

/**
 * 
 * 添加对象
 * @param params
 * @return {Promise<*>}
 */
export async function addUser(params) {
  return request('/rest/userService/insert', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/**
 * 更新对象数据
 * @param params
 * @return {Promise<*>}
 */
export async function updateUser(params = {}) {
  return request(`/rest/userService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 * 请求发送验证码
 * @return {Promise<void>}
 */
export async function sendGetCaptcha(params) {
  return request('/rest/appUserService/getEmailCaptcha', {
    method: 'POST',
    body: {
      ...params
    }
  })
}

/**
 * 重置密码
 * @param params
 * @return {Promise<Taro.request.Promised<any>|never|void>}
 */
export async function resetPassword(params) {
  return request('/rest/appUserService/resetPassword', {
    method: 'POST',
    body: {
      ...params
    }
  })
}

/**
 * 请求验证验证码
 * @param params
 * @return {Promise<Taro.request.Promised<any>|never|void>}
 */
export async function validateCaptcha(params) {
  return request('/rest/appUserService/validateCaptcha', {
    method: 'POST',
    body: {
      ...params
    }
  })
}

/**
 * 使用ws协议进行登录操作
 * @param params
 * @param socketTask
 * @return {Promise<void>}
 */
export async function login(socketTask, params) {
  socketTask.send({
    cmd: 5,
    ...params
  })
}
