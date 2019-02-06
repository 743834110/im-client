/**
 * 用户state结构
 * @type {{state: {"001": {}, "002": {}}}}
 */
export const users = {
  state: {
    entities: {

    }
  }

};

export const userOrg = {
  state: {
    entities: {
      "001": {
        userId: "001",
        userImageUrl: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png",
        orgName: "15软件服务外包1班",
        userName: "行者孙"
      },
      "002": {
        userId: "002",
        userImageUrl: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png",
        orgName: "15软件服务外包1班",
        userName: "孙行者"
      }
    },
    mappings: {

    }
  },

  reducers: {

  },
  effects: (dispatch) => ({

  })
};

/**
 * 组织state
 *
 */
export const org = {
  state: {

  },
  reducers: {

  },
  effects: (dispatch) => ({

  })
};

/**
 *
 * 角色state
 */
export const role = {
  state: {

  },
  reducers: {

  },
  effects: (dispatch) => ({

  })
};

/**
 * 被选择的state数据项
 *
 */
export const selected = {
  state: {
    org: "",

  }
};



/**
 * 改变创建工作群state
 * @type {{state: string[], reducers: {changeSelected(*, *): *}}}
 */
export const selectedMembers = {
  state: ["001", "002"],
  reducers: {
    changeSelected(state, action) {
      return action;
    },
    deleteSelected(state, action) {
      state.shift(action);
      return state;
    }
  }
};

export const currentUser = {
  state: "001"
};









