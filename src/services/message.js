import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/messageService/queryById', {
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
export async function queryMessage(params) {
  return request('/rest/messageService/queryByPager', {
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
export async function removeMessage(params) {
  return request('/rest/messageService/deleteByIds', {
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
export async function addMessage(params) {
  return request('/rest/messageService/insert', {
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
export async function updateMessage(params = {}) {
  return request(`/rest/messageService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}


/**
 * 获取请求离线信息数据结构
 * @param params
 * @return {{cmd: number, type: number, userId: *}}
 */
export function getOfflineMessage(params) {
  return {
    cmd: 19,
    type: 0,
    ...params
  }
}

/**
 * 获取请求历史信息数据结构
 * @param params
 * @return {{cmd: number, type: number}}
 */
export function getHistoryMessage(params) {
  return {
    cmd: 19,
    type: 1,
    ...params
  }
}
