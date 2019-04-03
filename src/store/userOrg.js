import {queryById, addUserOrg, queryUserOrg, removeUserOrg, updateUserOrg} from '../services/userOrg'
import {popAll} from "../utils/common";


/**
 * userOrg state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const userOrg = {

  state: {

    entities: {

    },
    pagination: {

    },
    mappings: {
      // 当前显示的序号
      current: []
    }
  },

  effects: (dispatch) => ({

    // 类下拉刷新数据拉取
    async fetch(payload) {
      const response = await queryUserOrg(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent(response);
    },
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryUserOrg(payload);
      this.saveEntitiesAndPagination(response);
      this.saveCurrent(response);
    }
  }),

  reducers: {

    /**
     * @param action 
     * @param current {array}
     */
    deleteAndSaveCurrent({entities, mappings: {current}}, action) {
      popAll(current);
      const result = action.data.result || [];
      result.forEach(value => current.push(value.userOrgId));
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.userOrgId))

    },

    /**
     *
     * @param entities
     * @param pagination
     * @param action
     */
    saveEntitiesAndPagination({entities, pagination}, action) {

      // 组织entities
      const result = action.data.result || [];
      result.forEach(value => {
        entities[value.userOrgId] = {
          key: value.userOrgId,
          ...value,
          files: []
        };
      });

      // 组织分页数据
      pagination.current = parseInt(action.data.offset) + 1;
      pagination.pageSize = action.data.limit;
      pagination.total = action.data.size;
    },

    /**
     *
     * @param state
     * @param action
     */
    saveObject(state, action) {

    }
  },
};

export default userOrg;