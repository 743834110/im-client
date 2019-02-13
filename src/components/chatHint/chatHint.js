import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import './chatHint.scss'

/**
 * @author LTF
 * @description 聊天信息搜索界面搜索提示组件
 * Created on 2019/2/12
 */
export default class ChatHint extends Component{

  static defaultProps = {
    data: ["群组", "联系人", "聊天记录"]
  };

  state = {

  };

  render() {
    let {data} = this.props;
    return (
      <View className='chat-hint-container'>
        <View className='header'>
          <Text>支持搜索</Text>
        </View>
        <View className='body'>
          {
            data.map((value) => (
              <Text className='text'>{value}</Text>
            ))
          }
        </View>
      </View>
    );
  }
}

ChatHint.propTypes = {
  /**
   * 显示的文字列表
   */
  data: PropTypes.array
};
