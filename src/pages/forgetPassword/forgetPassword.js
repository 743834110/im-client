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
    nextStage: false
  };

  componentWillUnmount() {

  }

  /**
   * 检验账户的正确与否，进入修改密码步骤
   */
  handleNextClick = () => {

    this.setState({
      nextStage: true
    })
  };

  handleResetPasswordClick = () => {

  };

  render() {
    let {nextStage} = this.state;
    return (
      <View className='container' style={{justifyContent: 'center'}}>
        {
          !nextStage?
            <View>
              <View className='input'>
                <CustomInput title={'QQ邮箱'} placeholder={'QQ邮箱'}  />
                <CustomInput title={'验证码'} placeholder={'验证码'} mode='auth' />
              </View>
              <View className='margin-top-24'>
                <AtButton  full type='primary' onClick={this.handleNextClick} >下一步</AtButton>
              </View>
            </View>:
            <View>
              <View className='input'>
                <CustomInput title={'密码'}  />
                <CustomInput title={'确认密码'}  />
              </View>
              <View className='margin-top-24'>
                <AtButton  full type='primary' onClick={this.handleResetPasswordClick} >更改密码</AtButton>
              </View>
            </View>
        }
      </View>
    );
  }
}
