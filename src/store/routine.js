import {queryById, addRoutine, queryRoutine, removeRoutine, updateRoutine} from '../services/routine'
import {popAll} from "../utils/common";


/**
 * routine state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const routine = {

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
      const response = await queryRoutine(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent(response);
    },
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryRoutine(payload);
      this.saveEntitiesAndPagination(response);
      this.saveCurrent(response);
    }
  }),

  reducers: {

    /**
     *
     * @param current {array}
     */
    deleteAndSaveCurrent({entities, mappings: {current}}, action) {
      popAll(current);
      const result = action.data.result || [];
      result.forEach(value => current.push(value.routineId));
    },

    /**
     *
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
    saveObject(state, action) {

    }
  },
};

export default routine;
