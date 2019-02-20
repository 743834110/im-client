import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Input} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import CustomInput from "../../components/customInput/customInput";
import MessageList from "../../components/messageList/messageList";
import EmojiSwiper from "../../components/emojiSwiper/emojiSwiper";

const mapStateToProps = (state) => {

  return {
    chatRoom: state.selected.chatRoom
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
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

  state = {
    deleteSymbol: "[274E]"
  };


  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let params = this.$router.params;
    console.log(params);
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


  handleEmojiClick = (object) => {
    let input = this.refs.input;
    let {deleteSymbol} = this.state;
    // 删除字符
    if (object.value === deleteSymbol) {
      input.setState(prevState => {
        return {
        }
      });
      return;
    }
    // 新增
    input.setState(prevState => ({
      value: prevState.value + object.showValue,
      submitValue: prevState.value + object.value
    }))
  };

  render() {
    let {title} = this.state;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar title={title} />
        </View>
        <ScrollView scrollY className='flex-1' onScrollToUpper={this.handleScrollToUpper}>
          <MessageList />
        </ScrollView>
        <View className='input'>
          <View style={{borderTop: '1px solid #d6e4ef', borderBottom: '1px solid #d6e4ef',}}>
            <CustomInput  ref='input'  />
          </View>
          <EmojiSwiper onEmojiClick={this.handleEmojiClick} />
        </View>
      </View>
    );
  }
}
