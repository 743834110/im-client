import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import {Text, View} from "@tarojs/components";
import {AtList} from "taro-ui";
import CustomListItem from "../customListItem/customListItem";
import './chatList.scss'
import UnReadTag from "../unReadTag/unReadTag";

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
  };

  render() {
    let {data, onListItemClick} = this.props;
    return (
      <AtList >
        {
          data.map((value, index) => (
            <View className='chat-list-item-container' key={value.id}>
              <CustomListItem onClick={onListItemClick.bind(this, index)} />
              <View className='read-container'>
                <UnReadTag />
                <Text className='desc-text'>
                  fdfd
                </Text>
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
  onListItemClick: PropTypes.func

};
