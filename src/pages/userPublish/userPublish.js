import Taro,{ PureComponent} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect,} from "@tarojs/redux";
import {AtSearchBar} from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import RoutineList from "../../components/routineList/routineList";
import SQL from "../../utils/query";

const mapStateToProps = ({user, routine: {entities, pagination, mappings: {current}}}) => {
  return {
    currentUser: user.entities[user.currentUser],
    routine: {
      list: new SQL().select(current).from(entities).exec(),
      pagination
    }
  }
};
/**
 * @author LTF
 * @description 我的发布页面容器组件
 * Created on 2019/2/23
 */
@connect(mapStateToProps)
export default class UserPublish extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };

  state = {
    searchBarValue: ''
  };




  componentDidMount() {
    let query;
    if (process.env.TARO_ENV === 'h5') {
      query = Taro.createSelectorQuery().in(this)
    } else {
      query = Taro.createSelectorQuery().in(this.$scope)
    }

    query.select("#scrollView")
      .boundingClientRect(rect => {
        this.setState({
          scrollHeight: rect.height
        })
      })
      .exec();

    // 查询个人发布信息
    const {dispatch, currentUser} = this.props;
    Taro.showLoading({
      title: 'loading...',
      mask: true
    });
    dispatch({
      type: 'routine/fetch',
      payload: {
        pager: {
          param: {
            userId: currentUser.userId
          }
        },
        callback: () => {
          Taro.hideLoading();
        }
      }
    })
  }

  handleOnSearchBarChange = (value) => {
    this.setState({
      searchBarValue: value
    })
  };

  /**
   * 日常活动搜索事件
   * @param event
   */
  handleOnSearchBarActionClick = () => {
    const {dispatch, currentUser} = this.props;
    let {searchBarValue} = this.state;
    if (!searchBarValue) {
      return;
    }
    Taro.showLoading({
      title: 'loading...',
      mask: true,
    });
    dispatch({
      type: 'routine/fetch',
      payload: {
        pager: {
          and: {
            userId: currentUser.userId,
          },
          or: {
            title: searchBarValue,
            content: searchBarValue,
            orgName: searchBarValue,
          }
        },
        callback: () => {
          Taro.hideLoading();
        }
      }
    })
  };

  /**
   * 下一页显示
   */
  handleLowerRefresh = () => {
    const {dispatch, currentUser, routine: {pagination}} = this.props;
    if (pagination.total <= pagination.current * pagination.pageSize) {
      return;
    }
    let {searchBarValue} = this.state;
    if (!searchBarValue) {
      return;
    }
    dispatch({
      type: 'routine/fetchLatter',
      payload: {
        pager: {
          and: {
            userId: currentUser.userId,
          },
          or: {
            title: searchBarValue,
            content: searchBarValue,
            orgName: searchBarValue,
          },
          offset: pagination.current
        },
      }
    })
  };

  /**
   * routine显示栏点击事件
   * 调转进入详情页面
   */
  handleRoutineClick = (target) => {
    let {routine} = target.props;
    Taro.navigateTo({
      url: '/pages/routineDetail/routineDetail' + '?routine=' + JSON.stringify(routine),
    })
  };



  render() {
    let {searchBarValue, scrollHeight} = this.state;
    let {routine} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'我的发布'} />
          <AtSearchBar
            value={searchBarValue}
            onChange={this.handleOnSearchBarChange}
            actionName={'搜索'}
            onActionClick={this.handleOnSearchBarActionClick}
          />
        </View>
        <View id='scrollView' className='flex-1'>
          <RoutineList routineList={routine.list} onRoutineClick={this.handleRoutineClick} onLowerRefresh={this.handleLowerRefresh} scrollHeight={scrollHeight} useUpperRefresh={false} />
        </View>
      </View>
    );
  }
}
