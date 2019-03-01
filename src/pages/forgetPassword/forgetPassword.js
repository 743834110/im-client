import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtButton} from 'taro-ui';
import CustomInput from "../../components/customInput/customInput";

const mapStateToProps = (state) => {
  return {

  }
};
const mapDispatchToProps = (dispatch) => ({

});
/**
 * @author LTF
 * @description 找回密码界面容器组件
 * Created on 2019/3/1
 */
export default class ForgetPassword extends Component{

  config = {
    navigationBarTitleText: '首页'
  };

  state = {

  };

  handleNextClick = () => {
    console.log("dffdfd")
  };

  render() {
    return (
      <View className='container' style={{justifyContent: 'center'}}>
        <View className='input'>
          <CustomInput title={'QQ邮箱'} placeholder={'QQ邮箱'}  />
          <CustomInput title={'验证码'} placeholder={'验证码'}>
            <Text>发送验证码</Text>
          </CustomInput>
        </View>
        <View className='margin-top-24'>
          <AtButton full type='primary' onClick={this.handleNextClick} >下一步</AtButton>
        </View>
      </View>
    );
  }
}
