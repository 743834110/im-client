import Taro, {PureComponent} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import './index.scss'
import TabBar from "../../components/tabBar/tabBar";
import RoutineContainer from "../../components/routineContainer/routineContainer";
import SQL from "../../utils/query";

@connect(({routine: {entities, pagination, mappings: {current}}, loading}) => {

  return {
    routine: {
      list: new SQL()
        .select(current)
        .from(entities)
        .exec(),
      pagination
    },
    loading
  }
})
export default class Index extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  /**
   * 日常活动页面路径
   * @type {string}
   */
  routineDetailPath = '/pages/routineDetail/routineDetail';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: "routine/fetch",
      payload: {}
    })
  }

  componentDidShow() {

  }

  componentDidHide() {

  }

  /**
   * 顶部刷新事件
   */
  handleOnUpperRefresh = (target) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'routine/fetch',
      payload: {}
    })
  };

  /**
   * 底部刷新事件
   */
  handleOnLowerRefresh = (pagination) => {
    const {dispatch} = this.props;
    console.log(pagination)
    dispatch({
      type: 'routine/fetchLatter',
      payload: {
        pager: {
          offset: pagination.current - 1,
          limit: pagination.pageSize,
        }
      }
    })
  };

  /**
   * 日常活动点击事件
   * @param target
   */
  handleRoutineClick = (target) => {
    let {routine} = target.props;
    Taro.navigateTo({
      url: this.routineDetailPath + '?routine=' + JSON.stringify(routine),
    })
  };

  /**
   * 日常活动长按事件
   * @param target
   */
  handleRoutinePress = (target) => {
  };


  render() {
    let {routine} = this.props;
    return (
      <View className='container'>

        <View className='flex-1'>
          <RoutineContainer
            onLowerRefresh={this.handleOnLowerRefresh}
            onUpperRefresh={this.handleOnUpperRefresh}
            routine={routine}
            onRoutineClick={this.handleRoutineClick}
            onRoutineLongPress={this.handleRoutinePress}
          />
        </View>

        <View>
          <TabBar />
        </View>
      </View>
    )
  }
}

