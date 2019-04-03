import {queryById, addOrganization, queryOrganization, removeOrganization, updateOrganization} from '../services/organization'
import {popAll} from "../utils/common";


/**
 * organization state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const organization = {

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
      const response = await queryOrganization(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent(response);
    },
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryOrganization(payload);
      this.saveEntitiesAndPagination(response);
      this.saveCurrent(response);
    },

    // 根据Id来查询数据
    async fetchOne(payload) {
      const response = await queryById(payload);
      this.saveObject(response);
      this.deleteAndSaveCurrentOne(response);

    }
  }),

  reducers: {

    /**
     * @param action 
     * @param current {array}
     */
    deleteAndSaveCurrent({entities, mappings: {current}}, action) {
      popAll(current);

      const result = action.data? action.data.result? action.data.result: []: [];
      result.forEach(value => current.push(value.orgId));
    },

    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.orgId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.orgId))

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
        entities[value.orgId] = {
          key: value.orgId,
          ...value
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
    saveObject({entities}, action) {
      // 组织entities
      const result = action.data || {};
      entities[result.orgId] = {
        key: result.orgId,
        ...result,
      };
    }
  },
};

export default organization;
