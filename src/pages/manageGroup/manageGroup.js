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

  state = {
    data: [
      {title: '简介', url: '/pages/singleFieldEdit/singleFieldEdit', arrow: 'right', data: {
          title: '简介',
          ref: 'orgDescription',
          url: '',
          keyName: 'orgId',
          keyValue: ''
        }},
      {title: '公告', url: '/pages/singleFieldEdit/singleFieldEdit', arrow: 'right', data: {
          title: '公告',
          ref: 'orgAnnounce',
          url: '',
          keyName: 'OrgId',
          keyValue: ''
        }},
      {title: '成员调整', url: '/pages/editMember/editMember', arrow: 'right'},
      {title: '反馈信息', url: '/pages/feedbackGroup/feedbackGroup', arrow: 'right'},
    ]
  };



  handleOnClick = (value) => {
    let params = JSON.stringify(value.data);
    let url = encodeURI(value.url + "?params=" + params);
    Taro.navigateTo({
      url: url
    })
  };

  render() {
    let {data} = this.state;
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
