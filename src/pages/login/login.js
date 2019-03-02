import Taro,{ Component } from '@tarojs/taro';
import {View, Text, Switch} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import {AtButton} from 'taro-ui';
import CustomInput from "../../components/customInput/customInput";

const mapStateToProps = (state) => {
  return {
    saveUserAndPassword: state.setting.entities.saveUserAndPassword
  }
};
const mapDispatchToProps = (dispatch) => ({
  changeSetting: (saveUserAndPassword) => {dispatch.setting.changeSetting({
    value: saveUserAndPassword,
    key: 'saveUserAndPassword'
  });},
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

  handleLoginButtonClick = () => {

    Taro.showModal({
      title: '登录失败',
      content: '请你稍后重试',
    })
      .then(res => {
        if (res.confirm) {
          Taro.redirectTo({
            url: '/pages/index/index'
          })
        }
      })
  };

  handleForgetPasswordClick = () => {
    Taro.navigateTo({
      url: "/pages/forgetPassword/forgetPassword"
    });

  };


  handleSwitchChange = (event) => {
    let {changeSetting} = this.props;
    changeSetting(event.detail.value);
  };


  render() {
    let {saveUserAndPassword} = this.props;
    return (
      <View className='container' style={{justifyContent: 'center', paddingTop: '20px'}} >
        <View className='input'>
          <CustomInput placeholder='用户名' title='用户名' />
          <CustomInput placeholder='密码' title='密码' type='password' />
        </View>
        <View className='setting margin-top-24 display-flex-row just-center align-center'>
          <Text className='common-desc-text' style={{marginRight: '16px'}} >记住密码?</Text>
          <Switch onChange={this.handleSwitchChange} checked={saveUserAndPassword} />
        </View>
        <View
          className='button-group margin-top-24 display-flex-row just-center'
        >
          <AtButton type='primary' circle full customStyle={{width: '35vw', marginRight: "20px"}} onClick={this.handleLoginButtonClick} >登录</AtButton>
          <AtButton type='primary' circle full customStyle={{width: '35vw'}} onClick={this.handleForgetPasswordClick} >忘记密码？</AtButton>
        </View>
      </View>
    );
  }
}
