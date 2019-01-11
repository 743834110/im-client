import Taro, { Component } from '@tarojs/taro'
import {AtImagePicker} from "taro-ui";

/**
 * 自定义文件上传组件
 * @author LTF
 * Created on 2018/1/11
 */
export default class CustomImagePicker extends Component{

  static defaultProps = {

  };

  state = {
    value: []
  };

  handleChange = (files) => {
    this.setState({
      value: files
    })
  };

  render() {
    let {value} = this.state;
    return (
      <AtImagePicker
        multiple
        files={value}
        onChange={this.handleChange}
      />
    )
  }

}
