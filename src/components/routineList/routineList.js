import Taro, { Component } from '@tarojs/taro'
import {View, ScrollView} from "@tarojs/components";
import {AtActivityIndicator, AtDivider, AtLoadMore, AtToast} from "taro-ui";
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
        height: '100px'
      }
    }
  }

  componentDidMount() {
    let query = Taro.createSelectorQuery();
    query = query
      .select(".scroll-wrapper");
    query.boundingClientRect(rect => {
      this.setState({
        styl: {
          height: rect.height + 'px'
        }
      })
    }).exec()
  }

  componentWillReceiveProps(props) {
    let {lowerLoading} = props;
    let {routineList} = this.props;

    if (props.routineList.length <= routineList.length) {
      lowerLoading = 'noMore'
    }
    else {
      lowerLoading = 'more'
    }

    this.setState(prevState => {
      return {
        upperLoading: false,
        lowerLoading: lowerLoading,
        styl: {
          height: prevState.styl.height,
          transition: "transform 0.5s ease 1s",
          transform: "translateY(0px)"
        }
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
    if (lowerLoading === 'loading') {
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
    let {routineList} = this.props;
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

        <AtLoadMore
          status={lowerLoading}
        />
      </ScrollView>
    )
  }
}

