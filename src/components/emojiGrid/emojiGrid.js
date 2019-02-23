import { Component } from '@tarojs/taro';
import {View } from '@tarojs/components';
import PropTypes from 'prop-types'
import './emojiGrid.scss'
import CustomText from "../customText/customText";

/**
 * @author LTF
 * @description 表情包宫格
 * Created on 2019/2/19
 */
export default class EmojiGrid extends Component {


  static defaultProps = {
    onClick: () => {},
    columnNum: 7,
    list: [],
  };

  state = {

  };

  render() {
    let {list, columnNum, onClick} = this.props;
    let width = 100.0 / columnNum + '%';
    return (
      <View className='emoji-grid-container'>
        {
          list.map(value => (
            <View className='emoji' style={{width: width}} key={value} >
              <CustomText text={value} onClick={onClick} />
            </View>
          ))
        }
      </View>
    );
  }
}


EmojiGrid.propTypes = {
  /**
   * 宫格点击事件
   */
  onClick: PropTypes.func,
  /**
   * 表情包列表
   */
  list: PropTypes.array,
  /**
   * 每行显示的表情包个数
   */
  columnNum: PropTypes.number,
};
