import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import {AtTabBar} from "taro-ui";
import {connect} from "@tarojs/redux";
import './index.scss'
import RoutineList from "../../components/routineList/routineList";
import TabBar from "../../components/tabBar/tabBar";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import RoutineContainer from "../../components/routineContainer/routineContainer";

@connect((state) => ({
  state
}), (dispatch) => ({
  dispatch
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: ''
  };

  constructor(props) {
    super(props)
    this.state = {
      routineList: []
    }
  }

  componentWillMount() {
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

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
    let {routineList} = this.state;
    return (
      <View className='index' style={{
        "backgroundColor": "#F5F5F9",
        "height": "100vh",
        "width": "100vw",
        display: "flex"
      }}
      >

        <View
          style={{
          flex: 1
        }}
        >
          <RoutineContainer
            onLowerRefresh={this.handleOnLowerRefresh}
            onUpperRefresh={this.handleOnUpperRefresh}
            routineList={routineList}
          />
        </View>

        <View className='tab-bar-container'>
          <TabBar />
        </View>
      </View>
    )
  }
}

