import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {AtButton, AtDivider} from 'taro-ui'
import PropTypes from 'prop-types'
import './feedbackListItem.scss'
import DateText from "../../dateText/dateText";

/**
 * @author LTF
 * @default 反馈组件块
 * Created on 2019/2/5
 */
export default class FeedBackListItem extends Component {

  static defaultProps = {
    data: {
      feedbackId: '001',
      content: '党支部统一要求围绕话题一“习近平总书记视察广东重要讲话精神”撰写文章，然后私发到邮箱到邮箱412730497@qq.com',
      imageUrlOne: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
      imageURlTwo: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
      read: 'Y',
      createTime: new Date().getTime()
    },
    onButtonClick: () => {},
    onImageClick: () => {},
    onContentClick: () => {},
  };

  state = {

  };

  render() {
    let {data, onButtonClick, onImageClick, onContentClick} = this.props;
    return (
      <View className='feedback-list-block-wrapper'>
        <View className='feedback-list-block-container'>
          <View className='text' onClick={onContentClick.bind(this, data)}>
            {data.content}
          </View>
          <View className='image-container'>
            {
              data.imageUrlOne?
                <Image  src={data.imageUrlOne} className='image' onClick={onImageClick.bind(this, data, 0)} />: undefined
            }
            {
              data.imageUrlTwo?
                <Image src={data.imageURlTwo} className='image' onClick={onImageClick.bind(this,data, 1)} />: undefined
            }
          </View>
          <View className='footer'>

            <View style={{
              flex: 1
            }}
            >
              <DateText />
            </View>
            {
              data.read !== 'Y' &&
              <AtButton type='primary' size='small' onClick={onButtonClick.bind(this, data)}>
                查阅
              </AtButton>
            }

          </View>
        </View>
      </View>
    );
  }
}

FeedBackListItem.propTypes = {
  /**
   * 反馈信息组件块
   */
  data: PropTypes.object,
  /**
   * 图像点击事件
   */
  onImageClick: PropTypes.func,
  /**
   * 反馈内容点击事件
   */
  onContentClick: PropTypes.func,
  /**
   * 点击查阅事件
   */
  onButtonClick: PropTypes.func,
};
