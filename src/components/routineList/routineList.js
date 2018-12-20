import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView} from "@tarojs/components";
import {AtActivityIndicator, AtDivider, AtLoadMore} from "taro-ui";
import './routineList.scss'
import RoutineBlock from "../routineBlock/routineBlock";



export default class RoutineList extends Component {

  // 触摸屏幕的开始位置
  startPos;
  // 顶部刷新
  upperRefresh = false;
  // 底部刷新
  lowerRefresh = true;

  constructor(props) {
    super(props);
    this.state = {
      scrollStyle: {

      },
      upperLoading: false
    }
  }

  componentWillReceiveProps() {
    this.setState({
      upperLoading: false,
      scrollStyle: {
        transition: "transform 0.5s ease 1s",
        transform: "translateY(0px)"
      }
    })

  }


  handleTouchStart = (event) => {
    this.startPos = event.touches["0"].pageY;
    this.setState({
      scrollStyle: {
        transition: "transform 0s"
      }
    })
  };
  handleTouchMove = (event) => {
    let transitionHeight = event.touches["0"].pageY - this.startPos;
    // 顶部刷新事件
    if (transitionHeight > 0 && transitionHeight <= 60) {
      console.log("调用中。。。。。。" + transitionHeight)
      this.setState({
        scrollStyle: {
          transition: "transform 0s",
          transform: "translateY(" + transitionHeight + "px)"
        }
      });

      if (transitionHeight > 50) {
        // 更改刷新阈值
        this.upperRefresh = true
      }
    }

    // 底部刷新事件
    if (transitionHeight < 0 && transitionHeight >= -60) {
      this.setState({
        scrollStyle: {
          transition: "transform 0s",
          transform: "translateY(" + transitionHeight + "px)"
        }
      });

      if (transitionHeight < -50) {
        // 更改刷新阈值
        this.lowerRefresh = true

      }
    }
  };


  handleTouchEnd = () => {
    let {onUpperRefresh, onLowerRefresh} = this.props;
    onUpperRefresh = onUpperRefresh || (() => {});
    onLowerRefresh = onLowerRefresh || (() => {});

    // 更新loadMore的显示：我怎么知道有没有更多？？？
    if (this.upperRefresh || this.lowerRefresh) {
      this.setState({
        upperLoading: true
      })
    }
    if (this.upperRefresh) {
      this.upperRefresh = false;
      onUpperRefresh(this);

    }
    if (this.lowerRefresh) {
      this.lowerRefresh = false;
      onLowerRefresh.call(this);
    }
  };






  render() {
    let {scrollStyle, upperLoading} = this.state;
    let {routineList} = this.props;
    routineList = routineList || [];

    return (
      <ScrollView
        style={scrollStyle}
        scrollWithAnimation
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        scrollY
        upperThreshold='50'
        scrollTop='10'
        enableBackToTop
        className='routine-list'
      >
        {upperLoading === true?
          <View className='indicator-container'>
            <AtActivityIndicator
              content='加载中...'
              mode='normal'
              size={32}
              className='activity-indicator'
            />
          </View>: ''

        }
        {routineList.map((routine, index) => {
          return (
            <View key={index} className='routine-list-element'>
              <RoutineBlock />
            </View>
          )
          })
        }
        <View className='routine-list-element'>
          <RoutineBlock />
        </View>

        <AtLoadMore
          status='noMore'
        />
      </ScrollView>
    )
  }
}
