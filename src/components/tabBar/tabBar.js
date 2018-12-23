import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from "@tarojs/components";
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
      {title: '通讯', iconType: 'folder', text: '100', max: '99', path: 'C'},
      {title: '我的', iconType: 'folder', text: '100', max: '99', path: 'D'}
    ],
    currentPath: 'D'
  };

  constructor(props) {
    super(props);

    let {tabList, currentPath} = this.props;
    let current = 0;
    for (let i = 0; i < tabList; i++) {
      if (currentPath === tabList[i].path) {
        current = i;
        break;
      }
    }

    this.state = {
      current: current
    }
  }

  componentWillMount() {

  }

  /**
   * 标签栏点击事件
   */
  handleClick = (selectedTab) => {
    let {tabList} = this.props;
    Taro.navigateTo({
      url: tabList[selectedTab].path + '?id=55'
    })

  };


  render() {

    let {current} = this.state;
    let {tabList} = this.props;

    return (
      <AtTabBar
        tabList={tabList}
        onClick={this.handleClick}
        current={current}
      />
    )
  }
}
