import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import MessageList from "../../components/messageList/messageList";
import MediaInput from "../../components/mediaInput/mediaInput";
import {generateId} from "../../utils/common";

const mapStateToProps = ({selected, user, message, chatGroup, socketTask: {waitForMessage}}) => {


  let chatRoom = selected.chatRoom;
  let currentUserId = user.currentUser;
  // 当前用户信息
  let currentUser = user.entities[currentUserId];
  // 聊天信息映射,显示方向由message的state判断。
  let messages = message.mappings[chatRoom.chatId]? message.mappings[chatRoom.chatId]: [];
  // 用于标记发送者和接受者是同一个人的情况的变量: true为有，false为左边
  let currentReverse = true;
  messages = messages.map(value => {
    let _message = {
      ...message.entities[value]
    };

    // 标明位置
    if (_message.from === currentUserId && _message.to !== currentUserId) {
      _message.position = 'right';

    } else if (_message.from === currentUserId && _message.to === currentUserId) {
      _message.position = currentReverse? 'right': 'left';
      currentReverse = !currentReverse;

    } else {
      _message.position = 'left';
    }


    return _message;
  });


  return {
    messages,
    chatRoom,
    currentUser,
    targetUser: user.entities[chatRoom.chatId],
    targetGroup: chatGroup.entities[chatRoom.chatId],
    loading: waitForMessage
  }
};

const mapDispatchToProps = (dispatch) => ({
  asyncSendingMessage: (chatRoom, currentUser, targetGroup, content) => {
    let message = {};
    const now = new Date();
    message.msgId = generateId();
    message.from = currentUser.userId;
    message.fromName = currentUser.userName;
    message.fromAvatar = currentUser.userImageUrl;
    message.to = chatRoom.chatId;
    message.group_id = chatRoom.chatId;// 具体的根据交给chatType处理
    message.msgType = 'text';// te
    message.chatType = chatRoom.chatType;
    message.content = content;
    message.cmd =  11;
    message.createTime = now.getTime();
    // 公聊
    if (chatRoom.chatType == '1') {
      message.read = []
    }
    // 私聊
    else if (chatRoom.chatType == '2') {
      const chatId = new String(chatRoom.chatId);
      Taro.getEnv()
      message.read = [chatId];
    }
    else {
      message.read = []
    }
    dispatch.message.asyncSendingMessage(message);
  },
  dispatch
});

/**
 * @author LTF
 * @description 聊天页面容器组件
 * Created on 2019/2/15
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ChatRoom extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };


  constructor(props) {
    super(props);
    console.log("构造")
  }


  /**
   * 标记已读
   * 非数组返回，找不到返回，未发送成功的也返回,不是在右边的返回,找到去除，找到重新发送消息
   * 不兼容微信端
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {loading} = nextProps;
    if (this.props.loading === loading) {
      return;
    }
    if (loading) {
      Taro.showLoading({
        title: 'loading...',
        mask: true
      })
    }
    else {
      Taro.hideLoading();
    }
  }

  // 当messages为空时，将请求聊天内容
  componentDidShow() {
    let {messages} = this.props;
    // if (messages.length === 0) {
    //   this.handleScrollToUpper()
    // }
    // 空闲时发送
    setInterval(() => {
      this.updateReadStatus(this.props);
    }, 3000)
  }

  updateReadStatus = (props) => {
    let {messages, currentUser, dispatch, loading} = props;
    if (loading) {
      return;
    }
    messages.forEach((item, _index) => {
      if (item.position !== 'left') {
        return;
      }
      // if (item.success === true) {
      //   return;
      // }

      if (!item.read || !item.read instanceof Array || item.read.length === 0) {
        return;
      }

      const index = item.read.indexOf(currentUser.userId);
      if (index === -1) {
        return;
      }
      // 为防止对已seal对象进行修改而报的错误，将另开对象进行操作
      const read = item.read.slice(0, index).concat(item.read.slice(index + 1));
      const replyMessage = {
        ...item,
        read,
        from: currentUser.userId,
        fromName: currentUser.userName,
        fromAvatar: currentUser.userImageUrl,
        to: item.from,
        extras: {
          referer: {
            from: item.from,
            fromName: item.fromName,
            fromAvatar: item.fromAvatar,
            to: item.to,
          }
        }
      };
      console.log(item, _index)
      dispatch({
        type: 'message/asyncSendingReplyMessage',
        payload: replyMessage
      });
    })
  };


  /**
   * 获取历史聊天信息
   * 将这一个时间点的作为上一个时间点的最后信息获取时间
   * 当前以一天为区间来获取聊天信息
   */
  handleScrollToUpper = () => {
    const {chatRoom, currentUser, dispatch, messages} = this.props;

    // 当消息为空时，将事先获取头10条信息
    if (messages.length !== 0) {
      dispatch({
        type: 'message/getHistoryMessage',
        payload: {
          userId: currentUser.userId,
          groupId: chatRoom.chatType == '1' ? chatRoom.chatId : undefined,
          fromUserId: chatRoom.chatId,
          endTime: messages[0].createTime - 1,
          beginTime: new Date(messages[0].createTime - 24 * 60 * 60 * 1000).getTime(),
        }
      })
    }
    else {
      dispatch({
        type: 'message/getHistoryMessage',
        payload: {
          userId: currentUser.userId,
          groupId: chatRoom.chatType == '1' ? chatRoom.chatId : undefined,
          fromUserId: chatRoom.chatId,
          endTime: Date.now(),
          beginTime: new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(),
        }
      })
    }

  };

  handleButtonClick = (value) => {
    let {chatRoom, currentUser, asyncSendingMessage, targetGroup} = this.props;
    asyncSendingMessage(chatRoom, currentUser, targetGroup, value);
  };



  render() {
    let {messages, targetUser = {}, targetGroup = {}, chatRoom: {chatType}} = this.props;
    // 公聊采用组织名称，私聊采用对方的用户名称。
    const navTitle = chatType == '1'? targetGroup.name: targetUser.userName;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar title={navTitle} />
        </View>
        <ScrollView  lowerThreshold='20' scrollTop={messages.length * 1000} scrollY className='flex-1'>

          <MessageList list={messages} />
        </ScrollView>
        <View className='input'>
          <MediaInput onButtonClick={this.handleButtonClick} />
        </View>
      </View>
    );
  }
}
