import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import './customText.scss'

/**
 * @author LTF
 * @description 提供复制粘贴功能和基本表情包解析功能的文本组件，
 * 解析为的emoji表情的格式信息为：[表情编码]
 * 将要被显示的文本将会以属性的value值传进来（children方式有解析的限制）
 * Created on 2019/2/18
 */
export default class CustomText extends Component{

  static defaultProps = {
    value: '',
    onClick: () => {},
  };

  pattern = /\[\w{4,5}\]/ig;

  value = "";

  constructor(props) {
    super(props)
    let {value} = this.props;
    this.value = this.findEscapeCharCode(value);
  }

  componentWillReceiveProps(newProps) {
    let newValue = newProps.value;
    this.value = this.findEscapeCharCode(newValue);
  }

  /**
   * 寻找需要转义的字符
   * @param string
   * @returns {*}
   */
  findEscapeCharCode(string) {

    string = string.replace(this.pattern, (value) => {
      let result = '0x' + value.slice(1, -1);
      if (result.length === 6) {
        return String.fromCharCode(result);
      }

      let pair = this.findSurrogatePair(result);
      pair[0] = '0x' + pair[0];
      pair[1] = '0x' + pair[1];
      return String.fromCharCode(pair[0], pair[1]);
    });
    return string;
  }

  /**
   * 查找unicode对象的表情代码数组
   * @param point
   * @returns {string[]}
   */
  findSurrogatePair(point) {
    // assumes point > 0xffff
    var offset = point - 0x10000,
      lead = 0xd800 + (offset >> 10),
      trail = 0xdc00 + (offset & 0x3ff);
    return [lead.toString(16), trail.toString(16)];
  }


  render() {
    let {onClick, value} = this.props;
    return (
      <View
        className='custom-text-container'
        onClick={onClick.bind(this, {
          value,
          showValue: this.value
        })}
      >
        <Text className='text' style={{userSelect: 'text'}}>
          {this.value}
        </Text>
      </View>
    );
  }
}

CustomText.propTypes = {
  /**
   * 将要被显示的文本
   */
  value: PropTypes.string,
  /**
   * 文本点击事件
   */
  onClick: PropTypes.func
};
