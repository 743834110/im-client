import {queryById, addFile, queryFile, removeFile, updateFile} from '../services/file'
import {popAll} from "../utils/common";


/**
 * file state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const file = {

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
      const response = await queryFile(payload);
      this.saveEntitiesAndPagination({
        response,
        paginationType: payload.paginationType
      });
      this.deleteAndSaveCurrent({
        response,
        currentType: payload.currentType,
      });
      if (payload.callback) {
        payload.callback()
      }   
    },
    
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryFile(payload);
      this.saveEntitiesAndPagination({
        response,
        paginationType: payload.paginationType
      });
      this.saveCurrent({
        response,
        currentType: payload.currentType,
      });
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
      const response = await addFile(payload, payload.contentType);
      this.saveObject(response);
      if (payload.callback) {
        payload.callback()
      }
    },
    
    // 更新信息
    async update(payload) {
      const response = await updateFile(payload);
      if (payload.callback) {
        payload.callback(response);
      }
    },

    // 刷新信息
    async refresh() {}
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
      result.forEach(value => current.push(value.fileId));
    },
    
    
    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.fileId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings}, {response, currentType = 'current'}) {
      const result = response.data.result || [];
      result.forEach(value => mappings[currentType].push(value.fileId))
    },

    /**
     *
     * @param entities
     * @param pagination
     * @param action
     */
    saveEntitiesAndPagination({entities, pagination}, {response, paginationType = 'default'}) {
      console.log(paginationType)
      // 组织entities
      const result = response.data.result || [];
      result.forEach(value => {
        entities[value.fileId] = {
          key: value.fileId,
          ...value,
          files: []
        };
      });
      // 组织分页数据
      pagination[paginationType].current = parseInt(response.data.offset) + 1;
      pagination[paginationType].pageSize = response.data.limit;
      pagination[paginationType].total = response.data.size;

    },

    /**
     *
     * @param state
     * @param action
     */
    saveObject({entities}, action) {
      // 组织entities
      const result = action.data || {};
      entities[result.fileId] = {
        key: result.fileId,
        ...result,
      };
    }
  },
};

export default file;
