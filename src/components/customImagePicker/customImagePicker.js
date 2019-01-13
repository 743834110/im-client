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
    value: [
      {
        url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
      }
    ]
  };

  handleChange = (files, type, index) => {
    Taro.showToast({
      title: "fdfd",
      icon: 'success',
      duration: 2000
    })
    this.setState({
      value: files
    })
  };

  handleFail = (message) => {
    Taro.showToast({
      title: message + "fdfd",
      icon: 'success',
      duration: 2000
    })
  };

  render() {
    let {value} = this.state;
    return (
      <AtImagePicker
        multiple
        files={value}
        onChange={this.handleChange}
        onFail={this.handleFail}
      />
    )
  }

}
