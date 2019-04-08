import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import MessageList from "../../components/messageList/messageList";
import MediaInput from "../../components/mediaInput/mediaInput";
import {generateId} from "../../utils/common";

const mapStateToProps = (state) => {


  let chatRoom = state.selected.chatRoom;
  let currentUserId = state.user.currentUser;
  // 当前用户信息
  let currentUser = state.user.entities[currentUserId];
  // 聊天信息映射,显示方向由message的state判断。
  let messages = state.message.mappings[chatRoom.chatId]? state.message.mappings[chatRoom.chatId]: [];
  // 用于标记发送者和接受者是同一个人的情况的变量: true为有，false为左边
  let currentReverse = true;
  messages = messages.map(value => {
    let message = {
      ...state.message.entities[value]
    };

    // 标明位置
    if (message.from === currentUserId && message.to !== currentUserId) {
      message.position = 'right';

    } else if (message.from === currentUserId && message.to === currentUserId) {
      message.position = currentReverse? 'right': 'left';
      currentReverse = !currentReverse;

    } else {
      message.position = 'left';
    }


    return message;
  });


  return {
    messages,
    chatRoom,
    currentUser,
    targetUser: state.user.entities[chatRoom.chatId],
    targetGroup: state.chatGroup.entities[chatRoom.chatId]
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
    message.groupId = chatRoom.chatId;// 具体的根据交给chatType处理
    message.msgType = 'text';// te
    message.chatType = chatRoom.chatType;
    message.content = content;
    message.cmd =  11;
    message.createTime = now.getTime();
    // 公聊
    if (chatRoom.chatType == '1') {
      message.read = [

      ]
    }
    // 私聊
    else if (chatRoom.chatType == '2') {
      const chatId = new String(chatRoom.chatId);
      message.read = [chatId];
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
  }

  /**
   * 标记已读
   * 非数组返回，找不到返回，未发送成功的也返回,不是在右边的返回,找到去除，找到重新发送消息
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    const {messages, currentUser} = nextProps;

    messages.forEach(item => {

      if (item.position !== 'left') {
        return;
      }

      if (!item.success) {
        return;
      }

      if (!item.read || !item.read instanceof Array) {
        return;
      }

      const index = item.read.indexOf(currentUser.userId);
      if (index === -1) {
        return;
      }
      item.read.splice(index, 1);
      dispatch.message.asyncSendingReplyMessage({
        ...item,
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
      });
    })
  }


  handleScrollToUpper = () => {
    Taro.showLoading({
      title: 'loading',
      mask: true
    })
      .then(res => console.log(res));
    setTimeout(() => {
      Taro.hideLoading()
    }, 3000)
  };

  handleButtonClick = (value) => {
    let {chatRoom, currentUser, asyncSendingMessage, targetGroup} = this.props;
    asyncSendingMessage(chatRoom, currentUser, targetGroup, value);
  };



  render() {
    let {messages, targetUser} = this.props;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar title={''} />
        </View>
        <ScrollView  lowerThreshold='20' scrollTop={messages.length * 1000} scrollY className='flex-1' onScrollToUpper={this.handleScrollToUpper} >
          <MessageList list={messages} />
        </ScrollView>
        <View className='input'>
          <MediaInput onButtonClick={this.handleButtonClick} />
        </View>
      </View>
    );
  }
}
