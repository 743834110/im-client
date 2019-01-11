import { Component } from '@tarojs/taro'
import { AtInput }  from 'taro-ui'
import PropTypes from 'prop-types'

/**
 * 封装版输入框组件
 * @author litianfeng
 * Created on 2019/1/10
 *
 */
export default class CustomInput extends Component{

  static defaultProps = {
    placeholder: null,
    title: null,
    type: null
  };

  state = {
    value: ''
  };


  handleChange = (value) => {

    this.setState({
      value: value
    })
  };



  render() {
    let {value} = this.state;
    let {placeholder, title, type} = this.props;
    return (
      <AtInput
        title={title}
        type={type === null? 'text': type}
        placeholder={placeholder === null? '占位符': placeholder}
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

CustomInput.propTypes = {
  /**
   * 占位字符
   */
  placeholder: PropTypes.string,
  /**
   * 标题
   */
  title: PropTypes.string,
  /**
   * 类型
   */
  type: PropTypes.string,

};
