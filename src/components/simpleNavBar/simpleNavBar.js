import Taro, { Component } from '@tarojs/taro'
import PropTypes from "prop-types";
import { AtNavBar } from 'taro-ui'

/**
 * 简单导航栏组件
 */
export default class SimpleNavBar extends Component{

  static defaultProps = {

  };

  /**
   * 处理左边按钮点击事件：
   * 返回上一页
   */
  handleLeftIconClick = () => {
    Taro.navigateBack({
      delta: 1
    })
  };

  render() {

    let {title} = this.props;
    return (
      <AtNavBar
        color={'#2697EB'}
        title={title}
        leftText='返回'
        onClickLeftIcon={this.handleLeftIconClick}
        leftIconType='chevron-left'
        fixed
        className='fixed'
      />
    )
  }
}


SimpleNavBar.propTypes = {
  title: PropTypes.string.isRequired
};
