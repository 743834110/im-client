import Taro, {Component} from '@tarojs/taro'
import {View, Icon, Image, Text} from '@tarojs/components'
import {AtAvatar, AtActivityIndicator } from 'taro-ui'

import PropTypes from 'prop-types'
import './messageItem.scss'
import CustomText from "../customText/customText";

/**
 * @author LTF
 * @description 消息单元项组件
 * Created on 2019/2/16
 */
export default class MessageItem extends Component {

  static defaultProps = {
    avatarCircle: true,
    onRetryClick: () => {},
    onUnreadClick: () => {},
    message: {
      id: "001",
      fromName: '李田锋',
      fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
      success: undefined,
      read: true,
      position: 'left',
      msgType: 'file',
      chatType: '1',
      content: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1550411795&di=78b0c3b6b0b15773ab6c830217195dac&src=http://b-ssl.duitang.com/uploads/item/201610/23/20161023062037_aHhQu.thumb.700_0.jpeg',

    }

  };

  state = {

  };

  render() {
    let {avatarCircle, message, onRetryClick, onUnreadClick} = this.props;

    return (
      <View className={`message-item-container message-item-container-${message.position}`}>
        <View className='avatar'>
          <AtAvatar
            customStyle={{backgroundColor: '#6190E8'}}
            text={message.fromName}
            circle={avatarCircle}
            size='small'
            image={message.fromAvatar}
          />
        </View>
        <View className='body'>
          <View className={`from-user from-user-${message.position}`}>
            {
              message.chatType === "1"? message.fromName: ""
            }
          </View>
          <View className={`message message-${message.position} message-${message.msgType} `}  >
            {
              message.position === 'right'?
                <View className='read-status'>
                  {
                    message.read?
                      <View className='read'>已读</View>:
                      <View className='unread' onClick={onUnreadClick.bind(this, message)}>未读</View>
                  }
                </View>: ''
            }
            <View className={`message-trangle-${message.position}`} />
            <View>
              {
                message.msgType === 'text'? <CustomText value={message.content} />:
                  message.msgType === 'image'?
                    <Image
                      className='image'
                      src={message.content}
                    />:
                    message.msgType === 'file'?
                      <View className='file'>

                      </View>: ""
              }
            </View>
          </View>
        </View>
        {
          message.position === 'right'?
            <View className='sending-status'>
              {
                message.success === null || message.success === undefined?
                  <AtActivityIndicator />:
                  message.success === false?
                    <Icon type='info' size={20} onClick={onRetryClick.bind(this, message)} />: ''
              }
            </View>: ''
        }
      </View>
    );
  }
}

MessageItem.propTypes = {
  /**
   * 头像是否圆形
   */
  avatarCircle: PropTypes.bool,
  /**
   * 消息体
   */
  message: PropTypes.object,
  /**
   * 发送失败时点击发送事件
   */
  onRetryClick: PropTypes.func,
  /**
   * 未读按钮点击事件
   */
  onUnreadClick: PropTypes.func
};
