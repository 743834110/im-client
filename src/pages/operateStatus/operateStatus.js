import Taro, {Component} from '@tarojs/taro'
import {View, Icon, Text} from '@tarojs/components'
import {AtButton} from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

/**
 * @description 操作状态容器组件，从效率至上出发，与原型有所冲突。
 * @author LTF
 * Created on 2019/2/7
 */
export default class OperateStatus extends Component{

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  componentWillMount() {
    this.setState({
      url: "/pages/addMember/addMember",
      delta: 2,
      status: false,
      success: "发布成功",
      _false: "发布失败",
      message: "fdfdfdss",
    })
  }

  handleButtonClick = () => {
    let {url, delta} = this.state;
    if (delta) {
      Taro.navigateBack({
        delta: delta
      })
    }
    else {
      Taro.redirectTo({
        url: url
      })
    }

  };

  render() {
    let {status, message, success, _false} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'操作状态'} isBack={false} />
        </View>
        <View className='flex-1'>
            {
              status?
                <View style={{textAlign: 'center'}}>
                  <View>
                    <Icon size='60' type='success' color='#118EE9' />
                  </View>
                  <View className='common-title-text'>{success}</View>
                </View>:
                <View style={{textAlign: 'center'}}>
                  <View>
                    <Icon size='60' type='warn' />
                  </View>
                  <View className='common-title-text'>{_false}</View>
                  <View
                    className='common-desc-text'
                    style={{marginLeft: 0, padding: '8px 16px', wordWrap: 'break-word'}}
                  >
                    {message}
                  </View>
                </View>
            }
          <AtButton type='primary' onClick={this.handleButtonClick} full className='margin-top-24'>返回</AtButton>
          </View>
      </View>
    );
  }
}
