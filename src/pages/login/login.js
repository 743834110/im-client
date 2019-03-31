import Taro,{ Component } from '@tarojs/taro';
import {View, Text, Switch} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import {AtButton} from 'taro-ui';
import CustomInput from "../../components/customInput/customInput";
import {getSubmitObject} from "../../utils/common";

const mapStateToProps = ({setting: {entities}, socketTask, loading}) => {
  return {
    saveUserAndPassword: entities.saveUserAndPassword,
    loading: loading.global
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
export default class Login extends Component {

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
        dispatch.user.login({...getSubmitObject(this.refs)})
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
    let {saveUserAndPassword, loading} = this.props;
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
          <AtButton type='primary' circle full customStyle={{width: '35vw', marginRight: "20px"}} loading={loading} onClick={this.handleLoginButtonClick} >登录</AtButton>
          <AtButton type='primary' circle full customStyle={{width: '35vw'}} onClick={this.handleForgetPasswordClick} >忘记密码？</AtButton>
        </View>
      </View>
    );
  }
}
