import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from "prop-types";
import { AtIcon } from 'taro-ui'
import './popUpBlock.scss'

/**
 * 弹窗元素组件
 * @author litianfeng
 * Created on 2019/1/3
 */
export default class PopUpBlock extends Component {

  static defaultProps = {
    iconType: 'mail',
    title: '发布消息',
  };

  state = {

  };

  render() {
    let {iconType, title} = this.props;

    return (
      <View className='pop-up-block-container'>
        <AtIcon value={iconType} color='#aaa' />
        <Text className='text'>{title}</Text>
      </View>
    )
  }
}

PopUpBlock.propTypes = {
  /**
   * 图标类型
   */
  iconType: PropTypes.string,
  /**
   * 弹窗元素名称
   */
  title: PropTypes.string,

};
