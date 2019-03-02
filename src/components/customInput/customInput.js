import { Component } from '@tarojs/taro'
import { AtInput }  from 'taro-ui'
import PropTypes from 'prop-types'
import {Text} from "@tarojs/components";

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
    type: null,
    style: {
      marginLeft: 0
    },
    mode: "plain",
    onAuthClick: () => {},
  };

  state = {
    value: '',
    send: false,
  };


  handleChange = (value) => {
    this.setState({
      value: value
    })
  };

  handleTextClick = () => {
    let {onAuthClick} = this.props;
    this.setState({
      send: true,
      sendingNumber: 10,
    });
    onAuthClick();
    let interval = setInterval(() => {
      this.setState(prevState => {
        let prevSendingNumber = prevState.sendingNumber;
        let result = {};
        if (prevSendingNumber !== 0) {
          result.sendingNumber = prevSendingNumber - 1;

        } else {
          clearInterval(interval);
          result.send = false;
        }
        return result;

      })
    }, 1000);

  };


  render() {
    let {value, send, sendingNumber} = this.state;
    let {placeholder, title, type, style, mode} = this.props;
    return (
      <AtInput
        title={title}
        customStyle={style}
        type={type === null? 'text': type}
        placeholder={placeholder === null? '占位符': placeholder}
        value={value}
        onChange={this.handleChange}
      >
        {
          mode === 'plain'? '':
            mode === 'auth'? send?
              <Text style={{color: '#999999', minWidth: '90px', textAlign: 'center'}}>
                {sendingNumber}秒
              </Text>: <Text style={{maxWidth: '90px'}} onClick={this.handleTextClick} >发送验证码</Text>:
              mode === 'image'? '': ''
        }
      </AtInput>
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
  /**
   * 输入框样式
   */
  style: PropTypes.object,
  /**
   * 输入框模式: plain, auth, image
   */
  mode: PropTypes.string

};
