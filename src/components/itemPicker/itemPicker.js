import Taro, {Component} from '@tarojs/taro'
import {Picker} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtListItem} from "taro-ui";
/**
 * 列表选项选择器组件
 * @author LTF
 * Created on 2019/1/13
 */
export default class ItemPicker extends Component{

  static defaultProps = {
    mode: "selector",
    handleChange: () => {},
    range: ["本部门", "本机构", "本学院", "不限"],
    title: "可见范围"
  };

  state = {
    extraText: null,
    value: null
  };

  /**
   * onChange选项改变选项事件
   * @param event
   */
  handleChange = (event) => {
    let {range, handleChange, mode} = this.props;
    let value = mode === 'date'? event.detail.value: range[event.detail.value];

    this.setState({
      extraText: value,
      value: value
    });
    handleChange(event.detail.value);

  };

  render() {
    let {extraText} = this.state;
    let {title, mode, range, iconInfo} = this.props;
    return (
      <Picker mode={mode} onChange={this.handleChange} range={range} >
        <AtListItem title={title} extraText={extraText} iconInfo={iconInfo} />
      </Picker>
    );
  }
}

ItemPicker.propTypes = {
  /**
   * 选项选择器
   */
  mode: PropTypes.string,
  /**
   * 选择器选项改变事件
   */
  onChange: PropTypes.func,
  /**
   * 选择期数据
   */
  range: PropTypes.string,
  /**
   * 组件显示标题
   */
  title: PropTypes.string,
  /**
   * 缩略图信息
   */
  iconInfo: PropTypes.object
};

