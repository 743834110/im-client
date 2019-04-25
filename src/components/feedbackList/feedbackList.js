import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import PropTypes from 'prop-types'
import FeedBackListItem from "./block/feedbackListItem";

/**
 * @author LTF
 * @default 反馈信息列表组件
 * Created on 2019/2/5
 */
export default class FeedbackList extends Component {

  static defaultProps = {
    list: [
      {}, {}, {}
    ],
    onButtonClick: () => {},
    onImageClick: () => {},
    onContentClick: () => {},
  };




  render() {
    let {list, onButtonClick, onContentClick, onImageClick} = this.props;
    return (
      <View>
        {
          list.map(value => (
            <View
              key={value.feedbackId}
              style={{
                marginTop: '24px'
              }}
            >
              <FeedBackListItem data={value} onButtonClick={onButtonClick} onContentClick={onContentClick} onImageClick={onImageClick} />
            </View>
          ))
        }
      </View>
    );
  }
}

FeedbackList.propTypes = {
  /**
   * 反馈信息里列表数据
   */
  list: PropTypes.array,
  /**
   * 按钮点击事件
   */
  onButtonClick: PropTypes.func,
  /**
   * 反馈内容点击事件
   */
  onContentClick: PropTypes.func,
  /**
   * 图片点击事件
   */
  onImageClick: PropTypes.func
};
