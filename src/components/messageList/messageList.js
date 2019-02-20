import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import MessageItem from "../messageItem/messageItem";
import './messageList.scss'
import DateText from "../dateText/dateText";

/**
 * @author LTF
 * @description 聊天消息列表组件
 * Created on 2019/2/16
 */
export default class MessageList extends Component{

  static defaultProps = {
    list: [
      {
        id: "001",
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: undefined,
        read: true,
        position: 'left',
        msgType: 'text',
        chatType: '1',
        content: '社会主义核心价值观',
        createTime: new Date().getTime()
      },
      {
        id: "001",
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: true,
        read: true,
        position: 'right',
        msgType: 'text',
        chatType: '1',
        content: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1550411795&di=78b0c3b6b0b15773ab6c830217195dac&src=http://b-ssl.duitang.com/uploads/item/201610/23/20161023062037_aHhQu.thumb.700_0.jpeg',
        createTime: new Date().getTime()
      },
      {
        id: "001",
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: undefined,
        read: true,
        position: 'left',
        msgType: 'image',
        chatType: '1',
        content: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1550411795&di=78b0c3b6b0b15773ab6c830217195dac&src=http://b-ssl.duitang.com/uploads/item/201610/23/20161023062037_aHhQu.thumb.700_0.jpeg',
        createTime: new Date().getTime()
      },
      {
        id: "001",
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: undefined,
        read: true,
        position: 'left',
        msgType: 'image',
        chatType: '1',
        content: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1550411795&di=78b0c3b6b0b15773ab6c830217195dac&src=http://b-ssl.duitang.com/uploads/item/201610/23/20161023062037_aHhQu.thumb.700_0.jpeg',
        createTime: new Date().getTime()
      },
      {
        id: "001",
        fromName: '李田锋',
        fromAvatar: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        success: false,
        read: false,
        position: 'right',
        msgType: 'text',
        chatType: '1',
        content:  'fff[1F62C]',
        createTime: new Date().getTime() + 1000 * 60 * 5
      }
    ],
    onRetryClick: () => {},
    lastRecordTime: 1000 * 60 * 5
  };

  state = {

  };


  handleUnreadClick = (message, event) => {
    console.log(message);
    console.log(event)
  };

  render() {
    let {list, onRetryClick, lastRecordTime} = this.props;

    return (
      <View className='message-list-container'>
        <View>
          {
            list.map((value, index) => {
              let lastDateTime = index === 0? -1: list[index - 1].createTime;
              let interval = value.createTime - lastDateTime;
              return (
                <View className='message-item-wrapper' key={value.id}>
                  {
                      interval >= lastRecordTime?
                        <View className='date'>
                          <DateText type='full' date={value.createTime} />
                        </View>: ''
                  }
                  <MessageItem
                    message={value}
                    onUnreadClick={this.handleUnreadClick}
                    onRetryClick={onRetryClick}
                  />

                </View>
              )
            })
          }
        </View>
      </View>
    );
  }
}

MessageList.propTypes = {

  /**
   * 数据列表
   */
  list: PropTypes.array,
  /**
   * 发送重试点击按钮
   */
  onRetryClick: PropTypes.func,
  /**
   * 显示聊天事件发生时间的时间间隔（毫秒计算）
   */
  lastRecordTime: PropTypes.number,
  /**
   * 上拉刷新
   */
  onUpperRefresh: PropTypes.func

};
