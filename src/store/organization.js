import {queryById, addOrganization, queryOrganization, removeOrganization, updateOrganization, queryOrganizationTree} from '../services/organization'
import {popAll} from "../utils/common";
import Taro from '@tarojs/taro'


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
      current: [],
      // 在社团搜索页面显示搜索picker内容
      agencyCurrent: [],
      // 搜索内容
      searchCurrent: []
    },
    response:undefined,
  },

  effects: (dispatch) => ({

    // 类下拉刷新数据拉取
    async fetch(payload) {
      const response = await queryOrganization(payload);
      this.saveEntitiesAndPagination(response);
      this.deleteAndSaveCurrent({
        response,
        currentType: payload.currentType
      });
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
      if (payload.callback) {
        payload.callback(response);
      }
    },

    // 查询组织结构树
    async fetchOrganizationTree(payload) {
      const response = await queryOrganizationTree(payload);
      this.saveResponse(response);
    },

    // 更新组织信息
    async update(payload) {
      const response = await updateOrganization(payload);
      Taro.showToast({
        title: '修改成功!',
        icon: 'success',
        duration: 2000
      });
      if (payload.callback) {
        payload.callback(response);
      }
    },

    // 刷新信息
    async refresh() {}


  }),

  reducers: {
    /**
     * 保存树型结构数据
     * @param action
     */
    saveResponse(state, action) {
      state.response = action.data;
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
      const result = action.response.data? action.response.data.result? action.response.data.result: []: [];
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
