import Taro, { Component } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import PopUpBlock from "../popUpBlock/popUpBlock";
import './popUpBar.scss'

/**
 * Created on 2019/1/3
 * @description 弹窗组件
 * @author litianfeng
 */
export default class PopUpBar extends Component{

  static defaultProps = {
    popUpList: [
      {iconType: 'message', title: '发布消息'},
      {iconType: 'link', title: '创建工作群'},
      {iconType: 'settings', title: '管理'},
      {iconType: 'help', title: '反馈'},

    ]
  };

  state = {

  };


  render() {
    let {popUpList} = this.props;
    return (
      <View className='pop-up-bar-container'>
        {
          popUpList.map((value, index) => (
            <View className='pop-up-block-wrapper' key={index}>
              <PopUpBlock iconType={value.iconType} title={value.title} />
            </View>
          ))
        }
      </View>
    )
  }
}

PopUpBar.propTypes = {
  /**
   * 弹窗元素列表信息
   */
  popUpList: PropTypes.array
};
