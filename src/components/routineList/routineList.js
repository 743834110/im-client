import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView} from "@tarojs/components";
import PropTypes from "prop-types";
import {AtActivityIndicator, AtLoadMore} from "taro-ui";
import './routineList.scss'
import RoutineBlock from "../routineBlock/routineBlock";

/**
 * 滚动加载和下拉刷新被设置为互斥
 * 日常活动列表组件
 */
export default class RoutineList extends Component {

  // 顶部刷新
  upperRefresh = false;


  stateUpdateFinish = true;

  static defaultProps = {
    onRoutineClick: () => {},
    onRoutineLongPress: () => {},
    // 是否能够进行下拉刷新
    useUpperRefresh: true,
    routineList: [],
    onLowerRefresh: () => {},
    onUpperRefresh: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      upperLoading: false,
      lowerLoading: 'more',
      styl: {
        height: '10px'
      }
    }
  }


  componentWillReceiveProps(props) {
    let {lowerLoading, scrollHeight} = props;
    let {routineList} = this.props;
    console.log(scrollHeight)
    if (props.routineList.length <= routineList.length) {
      lowerLoading = 'noMore'
    }
    else {
      lowerLoading = 'more'
    }

    this.setState({
        upperLoading: false,
        lowerLoading: lowerLoading,
        styl: {
          height: scrollHeight,
          transition: "transform 0.5s ease 1s",
          transform: "translateY(0px)"
        }
      })

  }

  handleTouchStart = (event) => {
    this.startPos = event.touches["0"].pageY;
    this.setState(prevState => {
      return {
        styl: {
          height: prevState.styl.height,
          transition: "transform 0s"
        }
      }
    })
  };

  handleTouchMove = (event) => {
    let {lowerLoading} = this.state;
    let {useUpperRefresh} = this.props;
    if (lowerLoading === 'loading' || useUpperRefresh === false) {
      return;
    }

    let transitionHeight = event.touches["0"].pageY - this.startPos;
    // 顶部刷新事件
    if (transitionHeight > 0 && transitionHeight <= 60 && this.stateUpdateFinish) {
      this.stateUpdateFinish = false;
      this.setState(prevState => {
        return {
          styl: {
            height: prevState.styl.height,
            transition: "transform 0.3s",
            transform: "translateY(" + transitionHeight + "px)"
          }

        }
      }, () => {
        this.stateUpdateFinish = true;
      });


      if (transitionHeight > 20) {
        // 更改刷新阈值
        this.upperRefresh = true
      }
    }
  };


  handleTouchEnd = () => {
    let {onUpperRefresh} = this.props;
    if (this.upperRefresh) {
      this.setState({
        upperLoading: true
      });
      onUpperRefresh(this);
      this.upperRefresh = false;
    }
    else {
      this.setState(prevState => {
        return {
          upperLoading: false,
          styl: {
            height: prevState.styl.height,
            transition: "transform 0.5s ease 1s",
            transform: "translateY(0px)"
          }
        }
      })
    }
  };

  /**
   * 限制滚动加载事件触发次数
   */
  handleScrollToLower = () => {
    let {lowerLoading} = this.state;
    if (lowerLoading === 'loading') {
      return;
    }

    // 与顶部事件刷新互斥
    let {onLowerRefresh} = this.props;
    if (this.upperRefresh === true) {
      return;
    }
    this.setState({
      lowerLoading: 'loading'
    });
    onLowerRefresh(this);


  };




  render() {
    let {upperLoading, styl, lowerLoading} = this.state;
    let {routineList, useUpperRefresh, type, onRoutineClick, onRoutineLongPress} = this.props;

    return (
      <ScrollView
        style={styl}
        scrollWithAnimation
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onScrollToLower={this.handleScrollToLower}
        scrollY
        scrollTop='0'
        enableBackToTop
        className='routine-list'
      >

        {(upperLoading === true && useUpperRefresh === true)?
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
              <RoutineBlock
                onRoutineClick={onRoutineClick}
                onRoutineLongPress={onRoutineLongPress}
              />
            </View>
          )
        })
        }

        <AtLoadMore
          status={lowerLoading}
        />
      </ScrollView>
    )
  }
}

RoutineList.propTypes = {
  /**
   * 日常活动类型
   */
  type: PropTypes.string,
  /**
   * 日常数据
   */
  routineList: PropTypes.array,
  /**
   * 滚动列表的高度
   */
  scrollHeight: PropTypes.string,
  /**
   * 底部刷新事件
   */
  onLowerRefresh: PropTypes.func,
  /**
   * 底部刷新事件
   */
  onUpperRefresh: PropTypes.func,
  /**
   * 是否开启顶部刷新事件
   */
  useUpperRefresh: PropTypes.bool,
  /**
   * 日常活动点击事件
   */
  onRoutineClick: PropTypes.func,
  /**
   * 日常活动长按事件
   */
  onRoutineLongPress: PropTypes.func
}

