import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text, RichText} from '@tarojs/components'
import PropTypes from "prop-types";
import DateText from "../dateText/dateText";
import {AtAvatar, AtDivider} from "taro-ui";
import './routineDesc.scss'


if (process.env.TARO_ENV === 'weapp') {
  require('taro-ui/dist/weapp/css/index.css')
} else if (process.env.TARO_ENV === 'h5') {
  require('taro-ui/dist/h5/css/index.css')
}
/**
 * 日常活动描述组件
 * @author litianfeng
 * Created on 2018/12/24
 */
export default class RoutineDesc extends Component {

  static defaultProps = {
    routine: {},
    discussion: {}
  };

  state = {};

  constructor(props) {
    super(props)
  }

  render() {
    let {routine, discussion} = this.props;
    console.log(routine);
    console.log(discussion);
    return (
      <View className='container at-article'>
        <View className='at-article__h1'>
          {routine.title}
        </View>
        <View className='article-info at-article__info '>
          <View className='visiting-card'>
            <View>
              <AtAvatar image={routine.orgImageUrl} size='small' />
            </View>
            <View className='org-name'>
              <Text>
                {routine.orgName}
              </Text>
            </View>
          </View>
          <View>
            <DateText date={routine.createTime} />
          </View>
        </View>
        <View className='at-article__content content'>
          <View className='at-article__p'>
            <RichText nodes={routine.content} />
          </View>

          <View className='ending-info'>
            <Text style={{color: 'red'}}>
              {
                routine.end === 'Y'? "已截止": ""
              }
            </Text>
          </View>
          <View className='author'>
            <Text>
              编辑人：{routine.userName}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

RoutineDesc.propTypes = {
  /**
   * 日常活动数据
   */
  routine: PropTypes.object,
  /**
   * 讨论数据
   */
  discussion: PropTypes.object
}


