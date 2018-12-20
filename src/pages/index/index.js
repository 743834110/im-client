import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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



  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleOnclick = (value) => {
    console.log(value)
  };

  handleUpperRefresh = () => {
    setTimeout(() => {
      console.log("刷新状态")
      this.setState({
        routineList: [
          {

          },
          {

          },
          {

          }
        ]
      })
    }, 2000)
  }

  render () {
    let {routineList} = this.state;
    console.log(routineList)
    return (
      <View className='index' style={{
        "backgroundColor": "#F5F5F9",
        "height": "100vh",
        "width": "100vw",
        display: "flex"
      }}
      >
        {/*<BannerNavBar onClick={this.handleOnclick}>*/}
        {/*</BannerNavBar>*/}
        <RoutineList
          routineList={routineList}
          onUpperRefresh={this.handleUpperRefresh}
        />
      </View>
    )
  }
}

