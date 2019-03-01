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
 * 聊天消息state
 * @type {{state: {}, reducers: {}, effects: (function(*): {})}}
 */
export const message = {
  state: {

    entities: {
      "001": {
        id: "001",
        from: '006',
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: undefined,
        read: true,
        msgType: 'text',
        chatType: '1',
        content: '社会主义核心价值观',
        createTime: new Date().getTime()
      },
      "002": {
        id: "001",
        from: '001',
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: true,
        read: true,
        msgType: 'text',
        chatType: '1',
        content: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1550411795&di=78b0c3b6b0b15773ab6c830217195dac&src=http://b-ssl.duitang.com/uploads/item/201610/23/20161023062037_aHhQu.thumb.700_0.jpeg',
        createTime: new Date().getTime()
      },
    },
    // to or groupId timestamp: {}
    sending: {
      "003": []
    },
    // fromId or groupId: []
    mappings: {
      "003": ["001", "002"]
    }
  },
  reducers: {

    sendingMessage(state, content) {
      state.sending[content.to] = [
        ...state.sending[content.to],
        content
      ]

    }
  },

  effects: (dispatch) => ({
    async asyncSendingMessage(content, rootState) {
      dispatch.message.sendingMessage(content);

    }
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









