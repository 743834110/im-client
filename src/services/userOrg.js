import request from '../utils/request';

/**
 * 通过ID查询
 */
export async function queryById(params) {
  return request('/rest/userOrgService/queryById', {
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
export async function queryUserOrg(params) {
  return request('/rest/userOrgService/queryByPager', {
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
export async function removeUserOrg(params) {
  return request('/rest/userOrgService/deleteByIds', {
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
export async function addUserOrg(params) {
  return request('/rest/userOrgService/insert', {
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
export async function updateUserOrg(params = {}) {
  return request(`/rest/userOrgService/update`, {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

/**
 * 查询用组织架构
 * @param params
 * @return {Promise<Taro.request.Promised<any>|never|void>}
 */
export async function queryUserOrgStructure(params) {
  return request('/rest/appUserOrgService/queryStructureByPager', {
    method: 'POST',
    body: {
      ...params,
    }
  })
}
