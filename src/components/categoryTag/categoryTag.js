import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import PropTypes from 'prop-types'
import { AtIcon } from 'taro-ui'
import './categoryTag.scss'

/**
 * @author litianfeng
 * @description 分类标签组件，用于搜索分类的陈列。
 * Created on 2019/1/1
 */
export default class CategoryTag extends Component{

  static defaultProps = {
    tagName: '类别',
    iconType: 'chevron-down'
  };

  state = {

  };

  render() {
    let {tagName, iconType} = this.props;
    return (
      <View className='category-tab-container'>
        <Text className='text' >{tagName}</Text>
        <AtIcon value={iconType} color='#E9E9E9' />
      </View>
    );
  }
}
CategoryTag.propTypes = {
  /**
   * 标签名
   */
  tagName: PropTypes.string,
  /**
   * 图标类型
   */
  iconType: PropTypes.string
};

