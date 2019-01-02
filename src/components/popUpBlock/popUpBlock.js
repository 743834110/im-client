import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from "prop-types";

/**
 * 弹窗元素
 */
export default class PopUpBlock extends Component {

  static defaultProps = {

  };

  state = {

  };

  render() {

    return (
      <View>

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
