import {queryById, addDictionary, queryDictionary, removeDictionary, updateDictionary} from '../services/dictionary'
import {popAll} from "../utils/common";


/**
 * dictionary state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const dictionary = {

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
      const response = await queryDictionary(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent({
        response,
        currentType: payload.currentType
      });
    },
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryDictionary(payload);
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
      result.forEach(value => current.push(value.dictionaryId));
    },
    
    
    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.dictionaryId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.dictionaryId))

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
        entities[value.dictionaryId] = {
          key: value.dictionaryId,
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
      entities[result.dictionaryId] = {
        key: result.dictionaryId,
        ...result,
      };
    }
  },
};

export default dictionary;
