import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SearchBar from "../../components/searchBar/searchBar";
import {getSystemInfo} from "../../utils/display";
import RoutineList from "../../components/routineList/routineList";

/**
 * 搜索组件的容器组件
 */
@connect((state) => ({
  state
}))
export default class RoutineSearch extends Component{

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {
    routineList: []
  };

  state = {
    windowHeight: 640,
    routineList: []
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


  };

  /**
   * 顶部刷新事件
   */
  handleOnUpperRefresh = (target) => {
    let {type} = target.props;
    console.log(type)
    setTimeout(() => {
      this.setState(prevState => {
        return {
          routineList: [
            ...prevState.routineList,
            {}, {}, {}
          ]
        }
      })
    }, 1000)
  };

  /**
   * 底部刷新事件
   */
  handleOnLowerRefresh = () => {
    console.log("滚动加载")
    setTimeout(() => {
      this.setState(prevState => {
        return {
          routineList: [
            ...prevState.routineList,
          ]
        }
      })
    }, 1000)
  };


  render() {
    let {windowHeight, routineList} = this.state;
    return (
      <View className='container'>
        <View>
          <SearchBar
            onKeywordSearch={this.handleOnKeywordSearch}
          />
        </View>

        <View className='flex-1'>
          <RoutineList
            type='default'
            routineList={routineList}
            scrollHeight={(windowHeight - 42) + 'px'}
            onUpperRefresh={this.handleOnUpperRefresh}
            onLowerRefresh={this.handleOnLowerRefresh}
          />
        </View>
      </View>
    );
  }


}
