import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import RoutineDesc from "../../components/routineDesc/routineDesc";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import FrequentAsk from "../../components/frequentAsk/frequentAsk";
import MediaInput from "../../components/mediaInput/mediaInput";
import SQL from "../../utils/query";

/**
 * 日常活动详情页面
 */
@connect(({discussion: {entities, mappings: {current}},  loading}) => ({
  discussion: {
    list: new SQL()
      .select(current)
      .from(entities)
      .exec()
  },
  loading: loading.global
}))
export default class RoutineDetail extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };



  constructor(props) {
    super(props)
  }

  componentDidMount() {
   let param = decodeURIComponent(this.$router.params.routine).trim();
    let routine = JSON.parse(param);
    this.setState({
      routine: routine
    });
    // 获取有关评论信息
    const {dispatch} = this.props;
    dispatch.discussion.fetch({
      pager: {
        param: {
          routineId: routine.routineId
        },
        sorter: {
          createTime: 'asc'
        }
      }
    })
  }

  /**
   * 发布评论
   * @param value
   */
  handleOnClick = (value) => {
    if (!value) {
      Taro.showToast({
        title: '请填写信息',
        icon: 'none'
      });
      return;
    }
    const {dispatch} = this.props;
    const {routine, parentId} = this.state;
    dispatch.discussion.add({
      content: value,
      userId: routine.userId,
      parentId: parentId,
      routineId: routine.routineId,
      callback: () => {
        // 发送完成, 手动刷新该页面数据,并清空state
        dispatch.discussion.fetch({
          pager: {
            param: {
              routineId: routine.routineId
            },
            sorter: {
              createTime: 'asc'
            }
          }
        });
        this.setState({
          placeHolder: undefined,
          parentId: undefined
        })
      }
    })
  };

  /**
   * @param askValue {object}
   * @param answerList {array}
   */
  handleContentClick = (askValue, answerList) => {

    const temp = answerList
      .filter(answerValue => typeof askValue !==  "undefined" && answerValue.parentId === askValue.discussionId);
    if (temp.length === 0) {
      this.setState({
        placeHolder: `@${askValue.content}`,
        parentId: askValue.discussionId
      })
    } else {
      this.setState({
        placeHolder: undefined,
        parentId: undefined
      })

    }
  };




  render() {
    let {routine, placeHolder} = this.state;
    let {discussion, loading} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title='详情' backToPath='' />
        </View>
        <View>
          <RoutineDesc routine={routine} />
        </View>
        <ScrollView
          className='flex-1'
          style={{
            height: '10px'
          }}
          scrollY
        >
          <View>
            <FrequentAsk discussionList={discussion.list} onContentClick={this.handleContentClick} />
          </View>
        </ScrollView>
        <View>
          <MediaInput
            onButtonClick={this.handleOnClick}
            mediaEnabled={false}
            placeHolder={placeHolder}
            loading={loading}
          />
        </View>
      </View>
    )
  }
}


