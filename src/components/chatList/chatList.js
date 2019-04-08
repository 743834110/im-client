import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import {View} from "@tarojs/components";
import {AtList} from "taro-ui";
import CustomListItem from "../customListItem/customListItem";
import './chatList.scss'
import UnReadTag from "../unReadTag/unReadTag";
import DateText from "../dateText/dateText";

/**
 * @author LTF
 * @description 待聊天对象列表组件
 */
export default class ChatList extends Component{

  static defaultProps = {
    data: [
      {
        key: '002',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        note: '15软件服务外包1班1班1班1班1班1班1班1班1班1班',
        extraText: '2015874136',
        fromId: "001",
        unRead: 3,
      },
      {
        key: '002',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        note: '15软件服务外包1班1班1班1班1班1班1班1班1班1班',
        extraText: '2015874136',
        fromId: "001",
        createTime: '',
        unRead: ''
      }
      ],
    onListItemClick: () => {},
  };

  render() {
    let {data, onListItemClick} = this.props;
    return (
      <AtList >
        {
          data.map((value, index) => (
            <View className='chat-list-item-container' key={value.key}>
              <CustomListItem value={value} onClick={onListItemClick.bind(this, index)} />
              <View className='read-container'>
                {
                  value.unRead?
                    <UnReadTag value={value.unRead} />: ''
                }
                <View className='desc-text'>
                  <DateText type='time' date={value.createTime} />
                </View>
              </View>
            </View>
          ))
        }
      </AtList>
    );
  }
}

ChatList.propTypes = {
  /**
   * 聊天列表数据
   */
  data: PropTypes.array,
  /**
   * 列表数据项点击事件
   */
  onListItemClick: PropTypes.func,
  /**
   * 未读消息数量
   */
  unRead: PropTypes.number

};
