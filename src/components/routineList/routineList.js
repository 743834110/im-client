import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView} from "@tarojs/components";
import {AtDivider} from "taro-ui";
import './routineList.scss'
import RoutineBlock from "../routineBlock/routineBlock";



export default class RoutineList extends Component {

  scrollUpperFlag = false;

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  handleScrollUpper = (event) => {
    console.log("fdfddddddddddd")
    console.log(event)
  };
  handleTouchStart = (event) => {
    console.log("handleTouchStart")
  }
  handleTouchMove = (event) => {
    console.log("handleTouchMove")
    console.log(event)
  }

  render() {


    return (
      <ScrollView
        scrollWithAnimation
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        scrollY
        upperThreshold='50'
        scrollTop='10'
        enableBackToTop
        className='routine-list'
        onScrollToUpper={this.handleScrollUpper}
      >
        <View className='routine-list-element'>
          <RoutineBlock />
        </View>
        <View className='routine-list-element'>
          <RoutineBlock />
        </View>
        <View className='routine-list-element'>
          <RoutineBlock />
        </View>
        <View className='routine-list-element'>
          <RoutineBlock />
        </View>
        <AtDivider content='分割线' />
      </ScrollView>
    )
  }
}
