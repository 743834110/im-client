import {queryById, addChatGroup, queryChatGroup, removeChatGroup, updateChatGroup} from '../services/chatGroup'
import {popAll} from "../utils/common";


/**
 * chatGroup state对象
 * @type {{effects: (function(*): {}), reducers: {}, state: {}}}
 */
const chatGroup = {

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
      const response = await queryChatGroup(payload);
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
      const response = await queryChatGroup(payload);
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
      const response = await addChatGroup(payload);
      this.saveObject(response);
      if (payload.callback) {
        payload.callback()
      }
    },

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
      result.forEach(value => current.push(value.groupId));
    },
    
    
    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.groupId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings: {current}}, action) {
      const result = action.data.result || [];
      result.forEach(value => current.push(value.groupId))

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
        entities[value.groupId] = {
          key: value.groupId,
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
      entities[result.groupId] = {
        key: result.groupId,
        ...result,
      };
    },

    /**
     * 保存chatGroup信息和群组里的用户ID,
     * @param action {array}
     * @param current {array}
     */
    saveChatGroupAndUserId({entities, mappings: {current}}, action) {
      popAll(current);
      action.forEach(item => {
        current.push(item.group_id);
        entities[item.group_id] = {
          key: item.group_id,
          groupId: item.group_id,
          name: item.name,
          avatar: item.avatar,
          users: item.users.map(user => user.id)
        }
      });



    }

  },
};

export default chatGroup;
