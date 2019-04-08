import Taro,{ PureComponent } from '@tarojs/taro';
import {View, Text, Switch} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import {AtButton} from 'taro-ui';
import CustomInput from "../../components/customInput/customInput";
import {getSubmitObject} from "../../utils/common";

const mapStateToProps = ({setting: {entities}, login, loading}) => {
  return {
    saveUserAndPassword: entities.saveUserAndPassword,
    loading: loading.global,
    login
  }
};
const mapDispatchToProps = (dispatch) => ({
  changeSetting: (saveUserAndPassword) => {dispatch.setting.changeSetting({
    value: saveUserAndPassword,
    key: 'saveUserAndPassword'
  });},
  dispatch
});

/**
 * @author LTF
 * @description 登录界面容器组件
 * Created on 2019/2/28
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  /**
   *
   * /pages/index/index
   */
  handleLoginButtonClick = () => {
    const {dispatch} = this.props;
    dispatch.socketTask.wsConnectAndReConnect({
      callback: () => {
        dispatch.login.login({...getSubmitObject(this.refs)})
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

  showModal = () => {
    Taro.showModal({
      title: '温馨提示',
      content: '你输入用户名或密码有误，请稍后再试.'
    })
  };


  render() {
    let {saveUserAndPassword, loading, login} = this.props;
    if (login.code && login.code == 10008) {this.showModal();}

    return (
      <View className='container' style={{justifyContent: 'center', paddingTop: '20px'}} >
        <View className='input'>
          <CustomInput placeholder='用户名' title='用户名' ref='loginname' />
          <CustomInput placeholder='密码' title='密码' type='password' ref='password' />
        </View>
        <View className='setting margin-top-24 display-flex-row just-center align-center'>
          <Text className='common-desc-text' style={{marginRight: '16px'}} >记住密码?</Text>
          <Switch onChange={this.handleSwitchChange} checked={saveUserAndPassword} />
        </View>
        <View
          className='button-group margin-top-24 display-flex-row just-center'
        >
          <AtButton disabled={loading} type='primary' circle full customStyle={{width: '35vw', marginRight: "20px"}} loading={loading} onClick={this.handleLoginButtonClick} >登录</AtButton>
          <AtButton type='primary' circle full customStyle={{width: '35vw'}} onClick={this.handleForgetPasswordClick} >忘记密码？</AtButton>
        </View>
      </View>
    );
  }
}
