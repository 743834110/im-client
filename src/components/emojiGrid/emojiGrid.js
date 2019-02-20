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
    list: [
      "[2601]", "[1F300]", "[1F301]", "[1F302]", "[1F303]", "[1F304]", "[1F304]",
      "[2601]", "[1F300]", "[1F301]", "[1F302]", "[1F303]", "[1F304]", "[1F304]",
      "[2601]", "[1F300]", "[1F301]", "[1F302]", "[1F303]", "[1F304]", "[E04A]",
    ],
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
            <View className='emoji' style={{width: width}}>
              <CustomText value={value} onClick={onClick} />
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
