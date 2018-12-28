import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import PropTypes from 'prop-types'
import {AtActionSheet, AtActionSheetItem, AtIcon} from "taro-ui";
import './frequentAsk.scss'

/**
 * FAQ组件:包含一问与一答
 *
 */
export default class FrequentAsk extends Component {

  static defaultProps = {
    discussionList: [
      {
        discussionId: 1,
        content: '什么时候上学？',
      },
      {
        discussionId: 2,
        content: '什么时候上学？',
      },
      {
        discussionId: 3,
        content: '什么时候上学心里没有一点b数吗？',
        parentId: 1
      },
      {
        discussionId: 4,
        content: '什么时候上学心里没有一点b数吗？',
        parentId: 2
      },
      {
        discussionId: 5,
        content: '什么时候上学心里没有一点b数吗？',
      }
    ]
  };


  state = {};



  render() {
    let {discussionList} = this.props;
    let askList = discussionList.filter(value => !value.parentId);
    let answerList = discussionList.filter(value => value.parentId);

    return (
      <View className='sub-container'>
        <View className='icon-container'>
          <AtIcon value='volume-plus' size='24' color='#FBBE93' />
          <Text className='icon-desc'>
            常见问题
          </Text>
        </View>
        <View className='discuss-container'>

          {
            askList.map((askValue, index) => (
              <View className='discuss' key={askValue.discussionId}>
                <View className='discuss-ask'>
                  <Text className='prefix'>
                    问：
                  </Text>
                  <Text>
                    {askValue.content}
                  </Text>
                </View>
                <View className='discuss-answer' >
                <AtIcon value='chevron-right' size={20} color='#FBBE93' className='prefix' />
                {
                  answerList
                    .filter(answerValue => answerValue.parentId === askValue.discussionId)
                    .map((answerValue) => (

                      <Text key={answerValue.discussionId}>
                        {answerValue.content}
                      </Text>
                  ))
                }
                </View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

FrequentAsk.propTypes = {
  /**
   * 有关于日常活动的问答数据
   */
  discussionList: PropTypes.object,


};
