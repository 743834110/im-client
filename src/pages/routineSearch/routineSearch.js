import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SearchBar from "../../components/searchBar/searchBar";
import {getHeightOfComponent, getSystemInfo} from "../../utils/display";
import './routineSearch.scss'
import RoutineList from "../../components/routineList/routineList";

/**
 * 搜索组件的容器组件
 */
@connect((state) => ({
  state
}), (dispatch) => ({
  dispatch
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
  handleOnKeywordSearch = (event) => {
    console.log(event)
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
    console.log(windowHeight)
    return (
      <View className='routine-search-container' style={{
        height: windowHeight + 'px',
        backgroundColor: "#F5F5F9",
      }}
      >
        <View>
          <SearchBar
            onKeywordSearch={this.handleOnKeywordSearch}
          />
        </View>

        <View style={{
          height: (windowHeight - 42) + 'px',
        }}
        >
          <RoutineList
            type='default'
            routineList={routineList}
            onUpperRefresh={this.handleOnUpperRefresh}
            onLowerRefresh={this.handleOnLowerRefresh}
          />
        </View>
      </View>
    );
  }


}
