import {queryById, addUser, queryUser, removeUser, updateUser} from '../services/user'
import {popAll} from "../utils/common";


/**
 * user state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const user = {

  state: {

    entities: {

    },
    pagination: {

    },
    mappings: {
      // 当前显示的序号
      current: [],
      // 人性化显示
      humanity: {
        userName: {
          alias: "账号",
          operate: {
            disabled: true
          }
        },
        userImageUrl: {
          alias: "头像",
          operate: {

          }
        },
      }
    },
    // 当前用户
    currentUser: ""

  },

  effects: (dispatch) => ({

    // 类下拉刷新数据拉取
    async fetch(payload) {
      const response = await queryUser(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent(response);
    },
    // 持续分页数据提取
    async fetchLatter(payload) {
      const response = await queryUser(payload);
      this.saveEntitiesAndPagination(response);
      this.saveCurrent(response);
    },

  }),

  reducers: {

    deleteAndSaveCurrent({entities, mappings: {current}}, action) {
      popAll(current);
      const result = action.data.result || [];
      result.forEach(value => current.push(value.userId));
    },

    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.userId))

    },

    saveEntities({entities}, action) {
      // 组织entities
      const result = action || [];
      result.forEach(value => {
        entities[value.userId] = {
          key: value.userId,
          ...value,
        };
      });
    },

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

    saveCurrentUser(state, action) {
      state.currentUser = action.userId;
      state.entities[action.userId] = {
        key: action.userId,
        ...action,
      };

    }
  },
};

export default user;
