import Taro, {Component} from '@tarojs/taro'
import {AtTabs, AtTabsPane} from 'taro-ui';
import PropTypes from 'prop-types'
import FeedbackList from "../feedbackList/feedbackList";

/**
 * @author LTF
 * @description 自定义标签页组件
 * 注：目前taro框架的特性不支持本组件
 */
export default class CustomTabs extends Component{

  static defaultProps = {
    tabList: [
      {title: '待查阅', data: [{}, {}, {}, {}]},
      {title: '未查阅', data: [{}, {}, {}]}
    ],
    renderBody: undefined
  };

  state = {
    current: 0
  };

  handleOnClick = (value, event) => {
    this.setState({
      current: value
    })
  };

  render() {
    let {tabList} = this.props;
    let {current} = this.state;
    return (
      <AtTabs current={current} tabList={tabList} onClick={this.handleOnClick}>
        {
          tabList.map((value, index) => (
            <AtTabsPane current={current} index={index}>
              {this.props.renderBody}
            </AtTabsPane>
          ))
        }
      </AtTabs>
    );
  }
}

CustomTabs.propTypes = {
  /**
   * 标签栏题目等信息，包含了需要被内部使用到的组件的数据
   */
  tabList: PropTypes.array,
  /**
   * 需要被渲染的组件
   */
  renderBody: PropTypes.element
};
