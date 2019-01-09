import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux/types/index";

const mapStateToProps = ({tabPage}) => ({
  tabPage
});

const mapDispatchToProps = ({tabPage: {switchTab}}) => ({
  dispatchSwitchTab: (props) => {
    switchTab(props)
  }
});

/**
 * 消息发布界面
 * @author litianfeng
 * Created on 2019/1/9
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class RoutinePublish extends Component{
  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };
}
