import {queryById, addDiscussion, queryDiscussion, removeDiscussion, updateDiscussion} from '../services/discussion'
import {popAll} from "../utils/common";


/**
 * discussion state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const discussion = {

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
      const response = await queryDiscussion(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent(response);
      if (payload.callback) {
        payload.callback()
      }   
    },
    
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryDiscussion(payload);
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
      const response = await addDiscussion(payload);
      this.saveObject(response);
      console.log(response);
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
    deleteAndSaveCurrent({entities, mappings: {current}}, action) {
      popAll(current);
      const result = action.data.result || [];
      result.forEach(value => current.push(value.discussionId));
    },
    
    
    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.discussionId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.discussionId))

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
        entities[value.discussionId] = {
          key: value.discussionId,
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
      entities[result.discussionId] = {
        key: result.discussionId,
        ...result,
      };

    }
  },
};

export default discussion;
