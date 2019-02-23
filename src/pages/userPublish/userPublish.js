import Taro,{ Component } from '@tarojs/taro';
import {View, ScrollView} from '@tarojs/components';
import {connect,} from "@tarojs/redux";
import {AtSearchBar} from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import RoutineList from "../../components/routineList/routineList";

const mapStateToProps = (state) => {

  return {
    currentUser: state.users.entities[state.currentUser]
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeChatRoomSelected: dispatch.selected.changeChatRoomSelected,
});
/**
 * @author LTF
 * @description 我的发布页面容器组件
 * Created on 2019/2/23
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class UserPublish extends Component{

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
  }

  handleOnSearchBarChange = (value) => {
    this.setState({
      searchBarValue: value
    })
  };
  handleOnSearchBarActionClick = (event) => {
    console.log(event)
  }

  render() {
    let {searchBarValue, scrollHeight} = this.state;
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
          <RoutineList scrollHeight={scrollHeight} />
        </View>
      </View>
    );
  }
}
