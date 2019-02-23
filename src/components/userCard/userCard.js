import Taro, {Component} from '@tarojs/taro'
import {Text, View} from '@tarojs/components'
import PropsTypes from 'prop-types'
import {AtAvatar} from "taro-ui";
import './userCard.scss'

/**
 * @author LTF
 * @description 用户名片展示组件
 */
export default class UserCard extends Component{

  static defaultProps = {
    name: "",
    url: "",
    onClick: () => {}
  };

  state = {

  };

  render() {
    let {name, url, onClick} = this.props;
    return (
      <View className='user-card-container' onClick={onClick}>
        <AtAvatar
          customStyle={{backgroundColor: '#eee'}}
          text={name}
          size='large'
          circle
          image={url}
          openData={{ type: 'userAvatarUrl'}}
        />
        <Text className='text' >
          {name}
        </Text>
      </View>
    );
  }
}

UserCard.propTypes = {
  /**
   * 用户姓名
   */
  name: PropsTypes.string,
  /**
   * 用户图像
   */
  url: PropsTypes.string,
  /**
   * 头像点击事件
   */
  onClick: PropsTypes.func
};
