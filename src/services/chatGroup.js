import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/chatGroupService/queryById', {
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
export async function queryChatGroup(params) {
  return request('/rest/chatGroupService/queryByPager', {
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
export async function removeChatGroup(params) {
  return request('/rest/chatGroupService/deleteByIds', {
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
export async function addChatGroup(params) {
  return request('/rest/chatGroupService/insert', {
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
export async function updateChatGroup(params = {}) {
  return request(`/rest/chatGroupService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}