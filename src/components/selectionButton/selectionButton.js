import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import PropTypes from 'prop-types'
import './selectionButton.scss'

/**
 * @description 带有按钮和被将被提交的数据组件
 * @author LTF
 * Created on 2019/1/17
 */
export default class SelectionButton extends Component{

  static defaultProps = {
    number: 1,
    onButtonClick: () => {
      Taro.navigateTo({
        url: "/pages/editGroup/editGroup"
      })
    },
    onNumberClick: () => {

      Taro.navigateTo({
        url: "/pages/selectedMember/selectedMember"
      })
    },
    buttonDescription: '创建'
  };

  state = {

  };

  handleNumberClick = () => {
    Taro.navigateTo({
      url: "/pages/selectedMember/selectedMember"
    })
  };

  handleButtonClick = () => {
    Taro.navigateTo({
      url: "/pages/editGroup/editGroup"
    })
  };

  render() {
    let {number, onNumberClick, onButtonClick, buttonDescription} = this.props;

    // 在小程序端不支持支持执行默认的函数, 因此写成这样，让组件有默认的执行行为和支持外部参数函数
    onButtonClick = onButtonClick || this.handleButtonClick;
    onNumberClick = onNumberClick || this.handleNumberClick;
    return (
      <View className='selection-button-container' >
        <View className='text' onClick={onNumberClick}>
          已选择：{number}
        </View>
        <AtButton className='button' size='small' type='primary' onClick={onButtonClick} >{buttonDescription}</AtButton>
      </View>
    )
  }
}

SelectionButton.propTypes = {
  /**
   * 将要显示的数量
   */
  number: PropTypes.number,
  /**
   * 按钮点击事件
   */
  onButtonClick: PropTypes.func,
  /**
   * 数量区域点击事件
   */
  onNumberClick: PropTypes.func,
  /**
   * 按钮描述信息
   */
  buttonDescription: PropTypes.string
};
