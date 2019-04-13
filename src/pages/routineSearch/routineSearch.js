import Taro, {PureComponent} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SearchBar from "../../components/searchBar/searchBar";
import {getSystemInfo} from "../../utils/display";
import RoutineList from "../../components/routineList/routineList";
import SQL from "../../utils/query";

/**
 * 搜索组件的容器组件
 */
@connect(({routine: {entities, pagination, mappings: {current}}}) => {
  return {
    routine: {
      list: new SQL()
        .select(current)
        .from(entities)
        .exec(),
      pagination
    },
  }
})
export default class RoutineSearch extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };

  state = {
    windowHeight: 640,
    searchBarValue: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getSystemInfo()
      .then(value => {
        this.setState({
          windowHeight: value.windowHeight
        })
      });


  }

  /**
   * 点击搜索事件
   * @param event
   */
  handleOnKeywordSearch = (value) => {
    const {dispatch} = this.props;
    if (!value) {
      return;
    }
    this.setState({
      searchBarValue: value
    });
    Taro.showLoading({
      title: 'loading',
      mask: true
    });
    dispatch({
      type: 'routine/fetch',
      payload: {
        pager: {
          or: {
            title: value,
            content: value,
            orgName: value,
          },
          
        },
        callback: () => {
          Taro.hideLoading();
        }
      }
    })
  };

  /**
   * 底部刷新事件
   */
  handleOnLowerRefresh = () => {
    const {searchBarValue} = this.state;
    if (!searchBarValue) {
      return;
    }
    const {dispatch, routine: {pagination}} = this.props;
    if (pagination.total <= pagination.current * pagination.pageSize) {
      return;
    }
    Taro.showLoading({
      title: 'loading',
      mask: true
    });
    dispatch({
      type: 'routine/fetchLatter',
      payload: {
        pager: {
          or: {
            title: searchBarValue,
            content: searchBarValue,
            orgName: searchBarValue,
          },
          offset: pagination.current
        },
        callback: () => {
          Taro.hideLoading();
        }
      }
    })
  };


  handleRoutineClick = (target) => {
    let {routine} = target.props;
    Taro.navigateTo({
      url: '/pages/routineDetail/routineDetail' + '?routine=' + JSON.stringify(routine),
    })
  };


  render() {
    let {windowHeight} = this.state;
    let {routine} = this.props;

    return (
      <View className='container'>
        <View>
          <SearchBar
            onKeywordSearch={this.handleOnKeywordSearch}
          />
        </View>

        <View className='flex-1'>
          <RoutineList
            routineList={routine.list}
            scrollHeight={(windowHeight - 42) + 'px'}
            onLowerRefresh={this.handleOnLowerRefresh}
            onRoutineClick={this.handleRoutineClick}
            useUpperRefresh={false}
          />
        </View>
      </View>
    );
  }


}
