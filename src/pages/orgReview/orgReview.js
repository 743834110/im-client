import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux/types/index";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 * 院校级机构预览组件
 * 用户选择想要参考的机构
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class OrgReview extends Component {

  config = {
    navigationBarTitleText: ''
  };

  componentWillMount() {

  }

  render() {

  }



}
