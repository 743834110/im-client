import Taro, { Component } from '@tarojs/taro'
import {AtImagePicker} from "taro-ui";
import PropTypes from 'prop-types'

/**
 * 自定义文件上传组件
 * @author LTF
 * Created on 2018/1/11
 */
export default class CustomImagePicker extends Component{

  static defaultProps = {
    length: 4,
    limit: 999,
  };

  state = {
    value: [

    ],
    showAddButton: true
  };

  handleChange = (files, type, index) => {
    let {limit} = this.props;
    let showAddButton = true;
    if (limit === files.length) {
      showAddButton = false;
    }
    this.setState({
      value: files,
      showAddButton
    })
  };

  handleFail = (message) => {
  };

  render() {
    let {value, showAddButton} = this.state;
    let {length} = this.props;
    return (
      <AtImagePicker
        showAddBtn={showAddButton}
        length={length}
        files={value}
        onChange={this.handleChange}
        onFail={this.handleFail}
      />
    )
  }
}

CustomImagePicker.propTypes = {
  /**
   * 每行显示的图片的数量
   */
  length: PropTypes.number,
  /**
   * 显示上传的图片数量
   */
  limit: PropTypes.number
};
