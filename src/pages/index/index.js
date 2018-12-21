import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import './index.scss'
import RoutineBlock from "../../components/routineBlock/routineBlock";
import ListRoutine from "../../components/listRoutine/listRoutine";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import RoutineList from "../../components/routineList/routineList";

@connect((state) => ({
  state
}), (dispatch) => ({
  dispatch
}))
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
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



  handleOnUpperRefresh = () => {
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
          className='scroll-wrapper'
          style={{
          flex: 1
        }}
        >
          <RoutineList
            onUpperRefresh={this.handleOnUpperRefresh}
            onLowerRefresh={this.handleOnLowerRefresh}
            routineList={routineList}
          />
        </View>
        <View>
          fdfd
        </View>
      </View>
    )
  }
}

