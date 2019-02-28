import Taro,{ Component } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import {AtButton} from 'taro-ui';
import CustomInput from "../../components/customInput/customInput";

const mapStateToProps = (state) => {
  return {

  }
};
const mapDispatchToProps = (dispatch) => ({
  changeChatRoomSelected: dispatch.selected.changeChatRoomSelected,
});

/**
 * @author LTF
 * @description 登录界面容器组件
 * Created on 2019/2/28
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {

  config = {
    navigationBarTitleText: ''
  };

  render() {
    return (
      <View className='container' style={{justifyContent: 'center'}} >
        <View className='input'>
          <CustomInput placeholder='用户名' title='用户名' />
          <CustomInput placeholder='密码' title='密码' type='password' />
        </View>
        <View
          className='button-group margin-top-24'
          style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
        >
          <AtButton type='primary' circle full customStyle={{width: '35%'}} >密码</AtButton>
          <AtButton type='primary' circle full customStyle={{width: '35%'}} >忘记密码？</AtButton>
        </View>
      </View>
    );
  }
}
