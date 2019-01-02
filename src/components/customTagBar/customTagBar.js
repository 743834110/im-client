import Taro, {Component} from '@tarojs/taro'
import {Picker, View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtSearchBar} from "taro-ui";
import CategoryTag from "../categoryTag/categoryTag";
import './customTagBar.scss'


/**
 * @author litianfeng
 * @description 标签栏
 * Created on 2019/1/2
 */
export default class CustomTagBar extends Component{

  static defaultProps = {
    tagList: [
      {
        tagName: '类别',

        iconType: 'chevron-down',
        selector: [
          '中国',
          '美国',
          '日本'
        ]
      },
      {
        tagName: '所属',
        iconType: 'chevron-down',
        selector: [
          '信息院',
          '机电院'
        ]
      }
    ],
    onPickerChange: () => {},

    onSearchClick: () => {}
  };

  state = {
    /**
     * 搜索栏值
     */
    searchBarValue: '',
    /**
     * 搜索栏类选择器
     */
    hiddenClassName: 'search-bar-hidden',
    /**
     * 选择器们选择到的值
     */
    pickerValues: []
  };


  /**
   * 搜索栏值修改
   */
  handleSearchBarChange = (value) => {
    this.setState({
      searchBarValue: value
    })
  };

  /**
   * 展示搜索栏
   */
  handleShowBarClick = () => {
    this.setState(prevState => ({
      hiddenClassName: prevState.hiddenClassName === 'search-bar-hidden'? '': 'search-bar-hidden'
    }))
  };

  /**
   * 搜索栏按钮点击事件
   */
  handleSearchClick = () => {
    let {searchBarValue} = this.state;
    let {onSearchClick} = this.props;
    onSearchClick(searchBarValue);
  };

  /**
   * 向外暴露搜索的索引
   * @param index
   * @param event
   */
  handleChange = (index, event) => {
    let pickerValue = event.detail.value;
    let {onPickerChange} = this.props;
    onPickerChange({
      index: index,
      value: pickerValue
    });
  };


  render() {
    let {tagList} = this.props;
    let {searchBarValue, hiddenClassName, pickerValues} = this.state;
    return (
      <View className='tag-bar-wrapper'>
        <View className='tag-bar-container'>
          {
            tagList.map((value, index) => (
              <View key={index} className='category-tag-wrapper'>
                <Picker value={pickerValues[index]} mode='selector' range={value.selector} onChange={this.handleChange.bind(this, index)}>
                  <CategoryTag iconType={value.iconType} tagName={value.tagName} />
                </Picker>
              </View>
            ))
          }
          <View className='category-tag-wrapper' onClick={this.handleShowBarClick}>
            <CategoryTag iconType='chevron-down' tagName='搜索' />
          </View>
        </View>
        <AtSearchBar
          className={`search-bar ${hiddenClassName}`}
          showActionButton
          value={searchBarValue}
          onChange={this.handleSearchBarChange}
          onActionClick={this.handleSearchClick}
        />
      </View>
    );
  }
}

CustomTagBar.propTypes = {
  /**
   * 标签栏数据列表
   */
  tagList: PropTypes.array,
  /**
   * 搜索栏
   */
  onSearchClick: PropTypes.func,
  /**
   * 选择器值索引变更事件
   */
  onPickerChange: PropTypes.func

};
