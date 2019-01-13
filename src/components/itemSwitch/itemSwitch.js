import Taro, { Component } from '@tarojs/taro'
import {AtListItem} from "taro-ui";
import PropTypes from 'prop-types'

/**
 * ListItem的Switch封装组件，用来简化表单的提交
 * @author LTF
 * Created on 2019/1/13
 */
export default class ItemSwitch extends Component {

  static defaultProps = {
    title: '消息横幅'
  };

  state = {
    value: false
  };

  handleSwitchChange = (event) => {
    this.setState({
      value: event.detail.value
    })
  };

  render() {
    let {title} = this.props;
    let {value} = this.state;
    return (
      <AtListItem isSwitch title={title} onSwitchChange={this.handleSwitchChange} switchIsCheck={value} />
    );
  }
}

ItemSwitch.propTypes = {
  /**
   * 选项标题
   */
  title: PropTypes.string,
  /**
   * 单选按钮改变事件
   */
  handleSwitchChange: PropTypes.func

};
