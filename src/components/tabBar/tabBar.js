import Taro, {Component} from '@tarojs/taro'
import PropTypes from "prop-types";
import {AtTabBar} from "taro-ui";

/**
 * 自带页面调转机能的标签栏组件
 */
export default class TabBar extends Component {

  static defaultProps = {
    tabList: [
      {title: '校园资讯', iconPrefixClass: 'fa', iconType: 'folder', text: 'new', path: '/pages/index/index'},
      {title: '机构', iconType: 'camera', path: '/pages/orgOutline/orgOutline'},
      {title: '通讯', iconType: 'folder', text: '100', max: '99', path: '/pages/chatOutline/chatOutline'},
      {title: '我的', iconType: 'folder', text: '100', max: '99', path: '/pages/userHome/userHome'}
    ],
    current: 0
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  /**
   * 标签栏点击事件
   */
  handleClick = (selectedTab) => {
    let {tabList, current} = this.props;
    if (current === selectedTab) {
      return;
    }
    Taro.redirectTo({
      url: tabList[selectedTab].path + '?id=55'
    })

  };


  render() {

    let {tabList, current} = this.props;

    return (
      <AtTabBar
        tabList={tabList}
        onClick={this.handleClick}
        current={current}
      />
    )
  }
}

TabBar.propTypes = {
  /**
   * 当前标签栏索引
   */
  current: PropTypes.number
}
