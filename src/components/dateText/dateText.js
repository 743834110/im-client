import Taro, { Component } from '@tarojs/taro'
import {Text} from '@tarojs/components'
import PropTypes from "prop-types";

/**
 * 日期格式化组件
 */
export default class DateText extends Component{

  static defaultProps = {
    date: Date.now(),
    type: 'full'
  };


  render() {
    let date = new Date(this.props.date);
    let {type} = this.props;
    console.log(type)
    return (
      <Text>
        {
          type === 'full'? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`:
            type === 'time'? `${date.getHours()}:${date.getMinutes()}`:null

        }
      </Text>
    )
  }
}

DateText.propTypes = {
  /**
   * 自1970年到现今的毫秒数
   */
  date: PropTypes.number,
  /**
   * 显示的时间格式
   */
  type: PropTypes.oneOf(['full', 'time'])
};
