import {queryById, addWorkGroupMember, queryWorkGroupMember, removeWorkGroupMember, updateWorkGroupMember} from '../services/workGroupMember'
import {popAll} from "../utils/common";


/**
 * workGroupMember state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const workGroupMember = {

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
      const response = await queryWorkGroupMember(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent({
        response,
        currentType: payload.currentType
      });
      if (payload.callback) {
        payload.callback()
      }   
    },
    
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryWorkGroupMember(payload);
      this.saveEntitiesAndPagination(response);
      this.saveCurrent(response);
      if (payload.callback) {
        payload.callback()
      }
    },
    
    // 根据Id来查询数据
    async fetchOne(payload) {
      const response = await queryById(payload);
      this.saveObject(response);
      this.deleteAndSaveCurrentOne(response);
      if (payload.callback) {
        payload.callback()
      }
    },
   
    // 保存
    async add(payload) {
      const response = await addWorkGroupMember(payload);
      this.saveObject(response);
      if (payload.callback) {
        payload.callback()
      }
    }
  }),

  reducers: {

    /**
     * @param action 
     * @param current {array}
     */
    deleteAndSaveCurrent({entities, mappings}, action) {
      let currentType = "current";
      if (action.currentType) {
        currentType = action.currentType;
      } 
      if (!mappings[currentType]) {
        mappings[currentType] = []; 
      }
      const current = mappings[currentType];
      popAll(current);
      const result = action.response.data.result || [];
      result.forEach(value => current.push(value.memberId));
    },
    
    
    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.memberId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.memberId))

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
        entities[value.memberId] = {
          key: value.memberId,
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
    saveObject({entities}, action) {
      // 组织entities
      const result = action.data || {};
      entities[result.memberId] = {
        key: result.memberId,
        ...result,
      };
    }
  },
};

export default workGroupMember;