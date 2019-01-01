import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import PropTypes from 'prop-types'

/**
 * @author litianfeng
 * @description 标签栏
 */
export default class TagBar extends Component{

  static defaultProps = {

  };

  state = {

  };

  render() {
    return (
      <View>
        fdfd
      </View>
    );
  }
}

TagBar.propTypes = {
  /**
   * 标签栏数据列表
   */
  tagList: PropTypes.array


}
