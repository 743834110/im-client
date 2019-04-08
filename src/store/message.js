/**
 * 聊天消息state
 * @type {{state: {}, reducers: {}, effects: (function(*): {})}}
 */
import Taro from '@tarojs/taro';
import {ON_MESSAGE} from "../utils/config";


export default {
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
    // fromId or groupId: []
    // 键名为fromId, 值为数组
    mappings: {
      "003": ["001", "002"]
    },

  },

  effects: (dispatch) => ({

    // 正在发送消息时:发送看from,回来看to
    async asyncSendingMessage(content, rootState) {
      this.saveToMapping(content);
      this.saveEntities(content);
      dispatch.socketTask.send(content);
    },

    // 消息回复
    async asyncSendingReplyMessage(content, rootState) {
      // this.saveEntities(content);
      dispatch.socketTask.send(content);
    },

    // 接受到信息时
    async onReceivingMessage (payload, rootState) {
      console.log(payload);
      // 包含引用源时，解析成源头。
      let data = payload.data;
      if (data.extras && data.extras.referer) {
        data = {
          ...data,
          ...data.extras.referer
        }
      }
      // 没有设置引用源的，群聊模式中不是自己发的,即是为新消息，需要渲染到客户端中

      else if (data.chatType == '1' && rootState.user.currentUser === data.from ) {}
      else {
        this.saveFromMapping(data);
      }

      // 告诉messageAndChatGroup有消息来了，需要更新messageAndChatGroup
      dispatch.messageAndChatGroup.saveMessage(data);

      this.saveEntities({
        ...data,
        success: true,
      });
    },

    // 当收到服务器的响应时
    async afterSendingMessage (payload) {
      console.log(payload);
      // 包含引用源时，解析成源头。
      let data = payload.data;
      if (data.extras && data.extras.referer) {

        data = {
          ...data,
          ...data.extras.referer
        }
      }

      // 告诉messageAndChatGroup有消息来了，需要更新messageAndChatGroup
      dispatch.messageAndChatGroup.saveMessage(data);

      this.saveEntities({
        ...data,
        success: true,
      });
    }

  }),

  reducers: {
    // 1为公聊，2为私聊
    saveToMapping({mappings}, action) {
      const to = action.chatType == 1? action.groupId: action.to;
      if (!mappings[to]) {
        mappings[to] = [];
      }
      mappings[to].push(action.msgId);
    },
    // 1为公聊，2为私聊
    saveFromMapping({mappings}, action) {
      const from = action.chatType == 1? action.groupId: action.from;
      if (!mappings[from]) {
        mappings[from] = [];
      }
      mappings[from].push(action.msgId);
    },

    saveEntities({entities}, action) {
      entities[action.msgId] = {
        key: action.msgId,
        ...action,
      }
    },

  },
};
