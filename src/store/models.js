/**
 * 用户state结构
 * @type {{state: {entities: {}}, reducers: {}, effects: (function(*): {})}}
 */
export const users = {
  state: {
    entities: {

    }
  },
  reducers: {

  },
  effects: (dispatch) => ({

  })

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
    entities: {

    }
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
 * 群组state
 * @type {{state: {}, reducers: {}, effects: (function(*): {})}}
 */
export const chatGroup = {
  state: {
    entities: {
      "001": {
        groupId: "001",
        name: "朝歌艺术团",
        avatar: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png"
      },
      "002": {
        groupId: "002",
        name: "15软件服务外包",
        avatar: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png"
      }
    }
  },
  reducers: {
    listChatGroupsByName(name) {

    }

  },
  effects: (dispatch) => ({

  })
};

/**
 * 聊天消息state
 * @type {{state: {}, reducers: {}, effects: (function(*): {})}}
 */
export const message = {
  state: {

  },
  reducers: {

  },
  effects: (dispatch) => ({

  })
};

/**
 * 被搜索的信息state
 * @type {{state: {}, reducers: {}, effects: (function(*): {})}}
 */
export const searched = {
  state: {
    chatGroup: ["001", "002"],
    user: [],
    message: []
  },
  reducers: {

  },
  effects: (dispatch) => ({
    test(payload, rootState) {
      console.log(rootState)
    }
  })
};

/**
 * 被选择的state数据项
 *
 */
export const selected = {
  state: {
    org: "",
    chatRoom: {
      from_id: "001",
      group_id: "001",
    }
  },
  reducers: {
    changeSelected(state, payload) {
      this.state[payload.key] = payload.value;
    },
    changeChatRoomSelected(state, fromId, groupId) {
      state.chatRoom.from_id = fromId;
      state.chatRoom.group_id = groupId;
    }
  },
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









