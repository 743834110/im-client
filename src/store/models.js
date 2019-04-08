/**
 * 用户state结构
 * @type {{state: {entities: {}}, reducers: {}, effects: (function(*): {})}}
 */
export const users = {
  state: {
    entities: {
      "001": {
        userId: "001",
        userName: '李田锋',
        userImageUrl: "http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png"
      }
    },
    mappings: {
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
 * 客户端设置数据state
 * @type {{state: {}, reducers: {}}}
 */
export const setting = {
  state: {
    entities: {
      saveUserAndPassword: true,
      saveClientData: false
    },
    mappings: {
      humanity: {
        saveUserAndPassword: '保存用户及密码',
        saveClientData: '持久化数据'
      }
    }
  },
  reducers: {
    // 改变客户端配置
    changeSetting(state, payload){
      state.entities[payload.key] = payload.value;
    }
  }

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
      chatType: 1,
      chatId: "003",
    }
  },
  reducers: {
    changeSelected(state, payload) {
      state[payload.key] = payload.value;
    },
    changeChatRoomSelected(state, chatType, groupId) {
      state.chatRoom.chatType = chatType;
      state.chatRoom.chatId = groupId;
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










