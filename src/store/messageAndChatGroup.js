
export default {

  state: {
    entities: {

    },
    mappings: new Set()

  },
  effects: (dispatch) => ({


  }),

  reducers: {

    saveGroupList({entities, mappings}, action) {
      console.log(action);
      action.forEach(item => {
        entities[item.group_id] = {
          key: item.group_id,
          thumb: item.avatar,
          title: item.name,
          note: undefined,
          chatType: 1
        };
        mappings.add(item.group_id)
      })
    },

    // 保存消息，需要判断先前的消息是否存在未读记录，如果存在，则
    // 在原来的基础上进行加1操作，如果不存在时，则无视。
    // 根据聊天类型，记录message这个信息
    saveMessage({entities, mappings}, action) {

      let key = null;
      if (action.chatType == '1') {
        key = action.group_id;
      } else if (action.chatType == '2') {
        key = action.from;
      }

      // 新来的消息需要设置unRead,并保留read，以留给以后进行进一步的判断
      if (action.read.length !== 0) {
        // 当以前的纪录存在时
        if (entities[key]) {
          entities[key] = {
            key: key,
            thumb: action.fromAvatar,
            title: action.fromName,
            note: action.content,
            read: action.read,
            createTime: action.createTime,
            unRead: entities[key].unRead + 1,
            chatType: action.chatType,
          }
        }
        else {
          entities[key] = {
            key: key,
            thumb: action.fromAvatar,
            title: action.fromName,
            note: action.content,
            read: action.read,
            createTime: action.createTime,
            chatType: action.chatType,
            unRead: 1
          }
        }
      }
      // 新来的消息read被完全消费完成时
      else {
        entities[key] = {
          ...entities[key],
          createTime: action.createTime,
          note: action.content,
          unRead: 0
        }
      }
      mappings.add(key);
    }

  }
}
