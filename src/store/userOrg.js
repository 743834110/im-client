import {queryById, addUserOrg, queryUserOrg, removeUserOrg, updateUserOrg, queryUserOrgStructure, editInputBean} from '../services/userOrg'
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
      default: {}
    },
    mappings: {
      // 当前显示的序号
      current: []
    },

    userOrgStructure: []
  },

  effects: (dispatch) => ({

    // 类下拉刷新数据拉取
    async fetch(payload) {
      const response = await queryUserOrg(payload);
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
      const response = await queryUserOrg(payload);
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
      const response = await addUserOrg(payload);
      this.saveObject(response);
      if (payload.callback) {
        payload.callback()
      }
    },
    
    // 更新组织信息
    async update(payload) {
      const response = await updateUserOrg(payload);
      if (payload.callback) {
        payload.callback(response);
      }
    },

    // 刷新信息
    async refresh() {},

    // 获取组织机构信息
    async fetchUserOrgStructure(payload) {
      const response = await queryUserOrgStructure(payload);
      this.saveUserOrgStructure(response);
    },

    // 批量更新userOrg
    async batchUpdate(payload) {
     const response = await editInputBean(payload);
      if (payload.callback) {
        payload.callback(response);
      }
    }


  }),

  reducers: {

    //
    saveUserOrgStructure(state, action) {
      state.userOrgStructure = action.data;
    },

    // 更新userOrgStructure
    updateUserOrgStructure({userOrgStructure}, {outerIndex, innerIndex, _userOrg, callback}) {
      userOrgStructure[outerIndex].userOrgList[innerIndex] = {
        ...userOrgStructure[outerIndex].userOrgList[innerIndex],
        ..._userOrg
      };
      if (callback) {
        callback();
      }

    },
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
      result.forEach(value => current.push(value.userOrgId));
    },
    
    
    deleteAndSaveCurrentOne ({mappings: {current}}, action) {
      popAll(current);
      if (action.data) {
        current.push(action.data.userOrgId)
      }
    },

    /**
     * @param action 
     * @param current {array}
     */
    saveCurrent({mappings}, {response, currentType = 'current'}) {
      const result = response.data.result || [];
      result.forEach(value => mappings[currentType].push(value.userOrgId))
    },

    /**
     *
     * @param entities
     * @param pagination
     * @param action
     */
    saveEntitiesAndPagination({entities, pagination}, {response, paginationType = 'default'}) {
      // 组织entities
      const result = response.data.result || [];
      result.forEach(value => {
        entities[value.userOrgId] = {
          key: value.userOrgId,
          ...value,
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
      entities[result.userOrgId] = {
        key: result.userOrgId,
        ...result,
      };
    }
  },
};

export default userOrg;
