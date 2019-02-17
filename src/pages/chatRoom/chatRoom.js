import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import CustomInput from "../../components/customInput/customInput";
import MessageList from "../../components/messageList/messageList";

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

  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let params = this.$router.params;
    console.log(params);
  }

  render() {
    let {title} = this.state;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar title={title} />
        </View>
        <ScrollView scrollY className='flex-1'>
          <MessageList />
        </ScrollView>
        <View>
          <CustomInput />
        </View>
      </View>
    );
  }
}
