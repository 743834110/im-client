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
      {},
      {}
      ],
    onListItemClick: () => {},
    unRead: undefined
  };

  render() {
    let {data, onListItemClick, unRead} = this.props;
    return (
      <AtList >
        {
          data.map((value, index) => (
            <View className='chat-list-item-container' key={value.id}>
              <CustomListItem onClick={onListItemClick.bind(this, index)} />
              <View className='read-container'>
                {
                  unRead?
                    <UnReadTag value={unRead} />: ''
                }
                <View className='desc-text'>
                  <DateText type='time' />
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
