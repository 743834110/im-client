import Taro, {PureComponent} from '@tarojs/taro'
import {View, Icon} from '@tarojs/components'
import {AtButton} from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

/**
 * @description 操作状态容器组件，从效率至上出发，与原型有所冲突。
 * @input {url, delta, success, _false, status, message}
 * <pre>
 *  当 delta不位空时， url无效,表示回退的页面数，url表示回退的指定页面,
 *  status 表示成功或者失败的操作状态，status为
 *  true时，显示success的信息，status为false时显示_false和message的消息
 * </pre>
 * @author LTF
 * Created on 2019/2/7
 */
export default class OperateStatus extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  /**
   * 接收参数，
   */
  componentWillMount() {
    this.setState({
      url: "/pages/addMember/addMember",
      delta: 2,
      status: false,
      success: "操作成功",
      _false: "操作失败",
      message: "fdfdfdss",
      ...this.$router.params
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
                <View style={{textAlign: 'center'}} className='margin-top-24'>
                  <View>
                    <Icon size='60' type='success' color='#118EE9' />
                  </View>
                  <View className='common-title-text'>{success}</View>
                </View>:
                <View style={{textAlign: 'center'}} className='margin-top-24'>
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
