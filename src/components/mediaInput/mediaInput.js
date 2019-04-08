import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtInput, AtIcon, AtButton } from "taro-ui";
import './mediaInput.scss'
import EmojiSwiper from "../emojiSwiper/emojiSwiper";

/**
 * @author LTF
 * @description 多媒体聊天输入展示组件
 * Created on 2019/2/21
 */
export default class MediaInput extends Component {


  static defaultProps = {
    deleteSymbol: "[274E]",
    onButtonClick: () => {},
    mediaEnabled: true,
    placeHolder: undefined,
    loading: false,
  };

  state = {
    value: '',
    inputValue: '',
    selectedIconIndex: -1
  };

  /**
   * 匹配emoji字符编码
   * @type {RegExp}
   */
  emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;


  handleEmojiClick = (object) => {

    let {deleteSymbol} = this.props;
    // 删除字符
    if (object.value === deleteSymbol) {
      this.setState(prevState => {
        let inputValue = prevState.inputValue.replace(/(\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|[\u4E00-\u9FA5]|\w)$/, "");
        return {
          inputValue
        }
      });
      return;
    }
    // 新增
    this.setState(prevState => ({
      inputValue: prevState.inputValue + object.showValue
    }));
  };

  handleOnChange = (value) => {

    this.setState({
      inputValue: value
    })
  };

  handleIconClick = (selectedIconIndex) => {
    console.log(selectedIconIndex)
    this.setState(prevState => ({
      selectedIconIndex: prevState.selectedIconIndex === selectedIconIndex? '': selectedIconIndex
    }))
  };

  handleButtonClick = () => {
    let {onButtonClick} = this.props;
    let {inputValue} = this.state;
    inputValue = inputValue.replace(this.emojiPattern, substring => {
      return '[' + substring.codePointAt(0).toString(16) + ']';
    });

    onButtonClick(inputValue);
  };


  render() {
    let {inputValue, selectedIconIndex} = this.state;
    const {mediaEnabled, placeHolder, loading} = this.props;
    return (
      <View className='media-input-container'>
        <View className='media-input'>
          <View className='input-wrapper'>
            <AtInput
              name=''
              className='input'
              value={inputValue}
              onChange={this.handleOnChange}
              placeholder={placeHolder}
              maxLength={999}
            />
          </View>
          {mediaEnabled?
            <View className='icon-container'>
              <AtIcon value='streaming' size={30} className='icon' onClick={this.handleIconClick.bind(this, 0)}/>
              {
                inputValue === '' ?
                  <AtIcon value='add-circle' size={30} className='icon' onClick={this.handleIconClick.bind(this, 1)}/> :
                  <AtButton disabled={loading} size='small' type='primary' className='icon' onClick={this.handleButtonClick}>发送</AtButton>
              }
            </View>:
            <View className='icon-container'>
              <AtButton disabled={loading}  size='small' type='primary' className='icon' onClick={this.handleButtonClick}>发送</AtButton>
            </View>
          }
        </View>
        {
          selectedIconIndex === 0?
            <EmojiSwiper onEmojiClick={this.handleEmojiClick} />: ''
        }
      </View>
    );
  }
}

MediaInput.propTypes = {
  /**
   * 发送按钮点击事件
   */
  onButtonClick: PropTypes.func,
  /**
   * 是否使用表情
   */
  mediaEnabled: PropTypes.bool,
  /**
   * 占位符
   */
  placeHolder: PropTypes.string,
  /**
   * 是否在读取中
   */
  loading: PropTypes.bool
};
