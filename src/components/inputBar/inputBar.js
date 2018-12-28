import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtButton, AtInput} from "taro-ui";
import './inputBar.scss'

/**
 * 输入栏封装组件
 * @author litianfeng
 * Created on 2018/12/28
 */
export default class InputBar extends Component{

  static defaultProps = {
    onClick: () => {}
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
    let {onClick} = this.props;
    return (
      <View className='input-bar-container'>
        <AtInput
          clear
          type='text'
          placeholder='提问的内容'
          value={value}
          onChange={this.handleChange}
        >
          <Text className='input-bar-button' onClick={onClick.bind(this, value)}>
            提问
          </Text>
        </AtInput>
      </View>
    )
  }

}

InputBar.propTypes = {
  /**
   * 提问点击事件
   */
  onClick: PropTypes.func
};
