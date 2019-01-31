import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CommonList from "../../components/commonList/commonList";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 * @description 群管理界面容器组件
 * @author LTF
 * Created on 2019/1/31
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ManagerGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {
    data: [
      {title: '简介', url: '/pages/orgReview/orgReview', arrow: 'right'},
      {title: '公告', url: '/pages/orgReview/orgReview', arrow: 'right'},
      {title: '成员调整', url: '/pages/orgReview/orgReview', arrow: 'right'},
      {title: '反馈信息', url: '/pages/orgReview/orgReview', arrow: 'right'},
    ]
  };

  handleOnClick = (value) => {
    console.log(value)
  };

  render() {
    let {data} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title={'管理'} />
        </View>
        <View className='flex-1 margin-top-24'>
          <CommonList data={data} onClick={this.handleOnClick} />
        </View>
      </View>
    );
  }
}
