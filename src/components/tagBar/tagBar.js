import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import PropTypes from 'prop-types'
import CategoryTag from "../categoryTag/categoryTag";
import './tagBar.scss'

/**
 * @author litianfeng
 * @description 标签栏
 * Created on 2019/1/2
 */
export default class TagBar extends Component{

  static defaultProps = {
    tagList: [
      {
        tagName: '类别',
        iconType: 'chevron-down'
      },
      {
        tagName: '所属',
        iconType: 'chevron-down'
      },
      {
        tagName: '搜索',
        iconType: 'chevron-down'
      },
    ],
    onTagClick: () => {}
  };

  state = {

  };

  render() {
    let {tagList, onTagClick} = this.props;
    return (
      <View className='tag-bar-container'>
        {
          tagList.map((value, index) => (
            <View className='category-tag-wrapper' onClick={onTagClick.bind(this, value, index)}>
              <CategoryTag iconType={value.iconType} tagName={value.tagName} />
            </View>
          ))
        }
      </View>
    );
  }
}

TagBar.propTypes = {
  /**
   * 标签栏数据列表
   */
  tagList: PropTypes.array,
  /**
   * 标签栏点击事件
   */
  onTagClick: PropTypes.func

};
