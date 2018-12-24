import Taro, { Component } from '@tarojs/taro'
import PropTypes from "prop-types";
import { AtNavBar } from 'taro-ui'
import {View} from "@tarojs/components";

/**
 * 简单导航栏组件
 */
export default class SimpleNavBar extends Component{

  static defaultProps = {
    title: '',
    backToPath: ''
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
   * 当返回的页面为空是返回上一页
   * 不为时则返回指定的页面
   */
  handleLeftIconClick = () => {
    let {backToPath} = this.props;
    if (backToPath === '') {
      Taro.navigateBack({
        delta: 1
      })
    }
    else {
      Taro.redirectTo({
        url: backToPath
      })
    }
  };

  render() {

    let {title, backToPath} = this.props;
    let {styl} = this.state;
    return (
      <View>
        <AtNavBar
          customStyle={styl}
          color={'#2697EB'}
          title={title}
          leftText='返回'
          onClickLeftIcon={this.handleLeftIconClick}
          leftIconType='chevron-left'
        />
      </View>
    )
  }
}


SimpleNavBar.propTypes = {
  /**
   * 菜单标题
   */
  title: PropTypes.string.isRequired,
  /**
   * 返回页面路径
   */
  backToPath: PropTypes.string
};
