import Taro, { Component } from '@tarojs/taro'
import PropTypes from "prop-types";
import { AtNavBar } from 'taro-ui'

/**
 * 简单导航栏组件
 */
export default class SimpleNavBar extends Component{

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  componentWillMount() {
  }

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
    let {styl} = this.state;
    return (
      <AtNavBar
        customStyle={styl}
        color={'#2697EB'}
        title={title}
        leftText='返回'
        onClickLeftIcon={this.handleLeftIconClick}
        leftIconType='chevron-left'
        rightFirstIconType='bullet-list'
        rightSecondIconType='user'
      />
    )
  }
}


SimpleNavBar.propTypes = {
  title: PropTypes.string.isRequired
};
