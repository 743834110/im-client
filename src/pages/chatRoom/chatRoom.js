import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import MessageList from "../../components/messageList/messageList";
import MediaInput from "../../components/mediaInput/mediaInput";

const mapStateToProps = (state) => {
  let chatRoom = state.selected.chatRoom;
  let currentUserId = state.currentUser;
  // 当前用户信息
  let currentUser = state.users.entities[currentUserId];
  // 聊天信息映射
  let messages = state.message.mappings[chatRoom.chatId].map(value => {
    let message = state.message.entities[value];
    return message;
  });
  // 添加正在发送的消息
  let sendingMessage = state.message.sending[chatRoom.chatId].map(value => ({
    position: undefined,
    ...value
  }));
  messages = [
    ...messages,
    ...sendingMessage
  ];
  messages.forEach(value => {
    if (value.from === currentUserId) {
      value.position = 'right';
    }
    else {
      value.position = 'left';
    }
  });

  return {
    messages,
    chatRoom,
    currentUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  asyncSendingMessage: (chatRoom, currentUser, content) => {
    let message = {};
    message.id = new Date().getTime(),
    message.from = currentUser.userId,
    message.fromName = currentUser.userName,
    message.fromAvatar = currentUser.userImageUrl,
    message.to = chatRoom.chatId,
    message.msgType = 'text',
    message.chatType = chatRoom.chatType,
    message.content = content,
    message.createTime = new Date().getTime()
    dispatch.message.asyncSendingMessage(message);
  }
});

/**
 * @author LTF
 * @description 聊天页面容器组件
 * Created on 2019/2/15
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ChatRoom extends Component{

  config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let params = this.$router.params;
    console.log(params);
  }

  componentWillReceiveProps(newProps) {
    // console.log(this.refs.scrollView)
    // this.refs.scrollView.container.scrollTop = this.refs.scrollView.container.scrollHeight;
  }

  handleScrollToUpper = () => {
    Taro.showLoading({
      title: 'loading',
      mask: true
    })
      .then(res => console.log(res))
    setTimeout(() => {
      Taro.hideLoading()
    }, 3000)
  };

  handleButtonClick = (value) => {
    let {chatRoom, currentUser, asyncSendingMessage} = this.props;
    asyncSendingMessage(chatRoom, currentUser, value);
  };



  render() {
    let {title} = this.state;
    let {messages} = this.props;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar title={title} />
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
