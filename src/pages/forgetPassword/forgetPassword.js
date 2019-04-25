import Taro, { PureComponent } from '@tarojs/taro'
import { View} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtButton} from 'taro-ui';
import CustomInput from "../../components/customInput/customInput";
import {getSubmitObject} from "../../utils/common";

/**
 * @author LTF
 * @description 找回密码界面容器组件
 * Created on 2019/3/1
 */
@connect((state) => state)
export default class ForgetPassword extends PureComponent{

  config = {
    navigationBarTitleText: '更改密码'
  };

  constructor(props) {
    super(props);
    this.state = {
      nextStage: false
    };
  }


  /**
   * 检验账户的正确与否，进入修改密码步骤
   */
  handleNextClick = () => {
    const {dispatch} = this.props;
    const param = getSubmitObject(this.refs);
    if (!param.recipient || !param.captcha) {
      Taro.showToast({
        title: '验证码不能为空',
        icon: 'none'
      });
      return;
    }
    Taro.showLoading({
      title: 'loading...',
      mask: true
    });
    dispatch.login.sendValidateCaptcha({
      captcha: param.captcha,
      callback: (res) => {
        Taro.hideLoading();
        console.log(res);
        if (res.data === true) {
          this.setState({
            nextStage: true
          })
        }
        else {
          Taro.showToast({
            title: '验证码不正确，请重新输入',
            icon: 'none'
          })
        }

      }
    })

  };

  /**
   * 重置密码，将调转到操作成功界面
   */
  handleResetPasswordClick = () => {
    const {dispatch} = this.props;
    const param = getSubmitObject(this.refs);
    if (!param.password || !param.confirmPassword || param.password !== param.confirmPassword) {
      Taro.showToast({
        title: '密码不能为空或前后密码不匹配',
        icon: 'none'
      });
      return;
    }

    // 进行密码强度验证
    const pattern = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
    if (!pattern.exec(param.password)) {
      Taro.showToast({
        title: '密码必须是字母+数字、字母+特殊字符、数字+特殊字符组合',
        icon: 'none'
      });
      return;
    }


    Taro.showLoading({
      title: 'loading...',
    });
    dispatch.login.resetPassword({
      ...param,
      callback: (res) => {
        Taro.hideLoading();
        Taro.navigateTo({
          url: `/pages/operateStatus/operateStatus?status=${res.data}`
        })
      }
    })
  };

  /**
   * 请求发送验证码
   */
  handleAuthClick = () => {
    const {dispatch} = this.props;
    const param = getSubmitObject(this.refs);
    if (!param.recipient) {
      Taro.showToast({
        title: '邮箱不能为空',
        icon: 'none'
      });
      return;
    }

    const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com$/;
    if (!pattern.exec(param.recipient)) {
      Taro.showToast({
        title: '请输入正确的邮箱',
        icon: 'none'
      });
      return;
    }



    Taro.showLoading({
      title: 'loading...',
      mask: true
    });
    dispatch.login.sendGetCaptcha({
      ...param,
      callback: (res) => {
        Taro.hideLoading();
        if (res.data === false) {
          Taro.showToast({
            title: '服务器出现异常，请联系管理员',
            icon: 'none'
          })
        }
      }
    });
  };

  render() {
    let {nextStage} = this.state;
    return (
      <View className='container' style={{justifyContent: 'center'}}>
        {
          !nextStage?
            <View>
              <View className='input' key={1}>
                <CustomInput ref='recipient' title={'QQ邮箱'} placeholder={'QQ邮箱'}  />
                <CustomInput ref='captcha' title={'验证码'} placeholder={'验证码'} mode='auth' onAuthClick={this.handleAuthClick} />
              </View>
              <View className='margin-top-24'>
                <AtButton full type='primary' onClick={this.handleNextClick} >下一步</AtButton>
              </View>
            </View>:
            <View>
              <View className='input' key={2}>
                <CustomInput ref='password' title={'密码'} type='password' placeholder='密码'  />
                <CustomInput ref='confirmPassword' title={'确认密码'} type='password' placeholder='确认密码'  />
              </View>
              <View className='margin-top-24'>
                <AtButton full type='primary' onClick={this.handleResetPasswordClick} >更改密码</AtButton>
              </View>
            </View>
        }
      </View>
    );
  }
}
