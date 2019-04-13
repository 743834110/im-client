import {queryById, addRoutine, queryRoutine, removeRoutine, updateRoutine} from '../services/routine'
import {popAll} from "../utils/common";


/**
 * routine state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const routine = {

  state: {

    entities: {},
    pagination: {},
    mappings: {
      // 当前显示的序号
      current: []
    }
  },

  effects: (dispatch) => ({

    // 类下拉刷新数据拉取
    async fetch(payload) {
      const response = await queryRoutine(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent(response);
      if (payload.callback) {
        payload.callback();
      }
    },
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryRoutine(payload);
      this.saveEntitiesAndPagination(response);
      this.saveCurrent(response);
      if (payload.callback) {
        payload.callback();
      }
    },

    // 根据Id来查询数据
    async fetchOne(payload) {
      const response = await queryById(payload);
      this.saveObject(response);
      this.deleteAndSaveCurrentOne(response);

    },

    // 保存
    async add(payload) {
      const response = await addRoutine(payload);
      this.saveObject(response);
      if (payload.callback) {
        payload.callback();
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
      result.forEach(value => current.push(value.routineId));
    },


    deleteAndSaveCurrentOne({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.routineId)
      }
    },

    /**
     * @param action
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.routineId))

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
        entities[value.routineId] = {
          key: value.routineId,
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
      entities[result.routineId] = {
        key: result.routineId,
        ...result,
      };
    }
  },
};

export default routine;
