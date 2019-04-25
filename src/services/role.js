import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/roleService/queryById', {
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
export async function queryRole(params) {
  return request('/rest/roleService/queryByPager', {
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
export async function removeRole(params) {
  return request('/rest/roleService/deleteByIds', {
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
export async function addRole(params) {
  return request('/rest/roleService/insert', {
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
export async function updateRole(params = {}) {
  return request(`/rest/roleService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}