import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import {View} from "@tarojs/components";
import './unReadTag.scss'

/**
 * 未读标签展示组件
 * @author LTF
 * Created on 2019/2/10
 */
export default class UnReadTag extends Component {

  static defaultProps = {
    value: 10,
    maxValue: 99,
  };

  state = {

  };

  render() {
    let {value, maxValue} = this.props
    return (
      <View className='un-read-tag-container'>
        {value > maxValue? '99+': value}
      </View>
    );
  }
}

UnReadTag.propTypes = {
  /**
   * 当前显示值
   */
  value: PropTypes.number,
  /**
   * 能够显示的最大值
   */
  maxValue: PropTypes.number
};
