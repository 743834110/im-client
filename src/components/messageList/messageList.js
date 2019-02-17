import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import MessageItem from "../messageItem/messageItem";

/**
 * @author LTF
 * @description 聊天消息列表组件
 * Created on 2019/2/16
 */
export default class MessageList extends Component{

  static defaultProps = {
    list: [{}, {}, {}]
  };

  state = {

  };

  render() {
    let {list} = this.props;

    return (
      <View className='message-list-container'>
        <View>
          {
          }
          <MessageItem   />
        </View>
      </View>
    );
  }
}

MessageList.propTypes = {

  /**
   * 数据列表
   */
  list: PropTypes.array
};
