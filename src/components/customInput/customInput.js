import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
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
    return (
      <AtInput
        name='value'
        title='标准五个字'
        type='text'
        placeholder='标准五个字'
        value={value}
        onChange={this.handleChange}
      />
    )
  }
}

CustomInput.propTypes = {

};
