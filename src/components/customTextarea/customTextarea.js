import Taro, { PureComponent } from '@tarojs/taro'
import PropTypes from 'prop-types'
import {AtTextarea} from "taro-ui";

/**
 * 自定义文本域
 * @author　LTF
 * Created on 2019/1/11
 */
export default class CustomTextarea extends PureComponent {

  static defaultProps = {
    placeholder: null,
    maxLength: null
  };

  state = {
    value: ""
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.setState({
      value
    })
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  };

  render() {
    let {value} = this.state;
    let {placeholder, maxLength} = this.props;
    return (
      <AtTextarea
        value={value}
        onChange={this.handleChange}
        maxlength={maxLength}
        placeholder={placeholder}
      />
    )
  }
}

CustomTextarea.propTypes = {
  /**
   * 占位符
   */
  placeholder: PropTypes.string,
  /**
   * 字符最大长度
   */
  maxLength: PropTypes.number,
  /**
   * 字符串值
   */
  value: PropTypes.string
};

