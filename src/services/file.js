import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/fileService/queryById', {
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
export async function queryFile(params) {
  return request('/rest/fileService/queryByPager', {
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
export async function removeFile(params) {
  return request('/rest/fileService/deleteByIds', {
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
 * @param contentType
 * @return {Promise<*>}
 */
export async function addFile(params, contentType) {
  return request('/rest/fileService/insert', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
    contentType
  });
}

/**
 * 更新对象数据
 * @param params
 * @return {Promise<*>}
 */
export async function updateFile(params = {}) {
  return request(`/rest/fileService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}
