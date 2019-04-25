import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CommonList from "../../components/commonList/commonList";
import SQL from "../../utils/query";

const mapStateToProps = ({organization: {entities, mappings: {current}}}) => {
  return {
    organization: {
      list: new SQL().select(current).from(entities).exec()
    }
  };
};
/**
 * @description 群管理界面容器组件
 * @author LTF
 * Created on 2019/1/31
 */
@connect(mapStateToProps)
export default class ManagerGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  state = {
    data: [
      {title: '简介', url: '/pages/singleFieldEdit/singleFieldEdit', arrow: 'right', data: {
          title: '简介',
          ref: 'orgDescription',
          type: 'organization',
          keyName: 'orgId',
          keyValue: '',
          value: '',
        }},
      {title: '公告', url: '/pages/singleFieldEdit/singleFieldEdit', arrow: 'right', data: {
          title: '公告',
          ref: 'orgAnnounce',
          type: 'organization',
          keyName: 'orgId',
          keyValue: '',
          value: ''
        }},
      {title: '成员调整', url: '/pages/editMember/editMember', arrow: 'right', data: {}},
      {title: '反馈信息', url: '/pages/feedbackGroup/feedbackGroup', arrow: 'right', data: {}},
    ]
  };


  /**
   * 此处应该请求后台数据，
   * 保证数据的一致性。
   */
  componentDidMount() {
    const {dispatch} = this.props;
    Taro.showLoading({
      title: 'loading',
      mask: true
    });
    dispatch.organization.fetchOne({
      orgId: this.$router.params.orgId,
      callback:() => {
        Taro.hideLoading();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {organization} = this.props;
    this.setState(prevState => ({
      data: prevState.data.map(item => {
        return {
          ...item,
          data: {
            ...item.data,
            keyName: 'orgId',
            keyValue: this.$router.params.orgId,
            value: organization.list[0]? organization.list[0][item.data.ref]: undefined,
            orgType: this.$router.params.orgType,
            orgName: this.$router.params.orgName
          }
        }
      })
    }))
  }

  componentDidShow() {
    const {dispatch} = this.props;
    dispatch.organization.refresh();
  }


  handleOnClick = (value) => {
    let params = JSON.stringify(value.data);
    let url = encodeURI(value.url + "?params=" + params);
    Taro.navigateTo({
      url: url
    })
  };

  render() {
    let {data} = this.state;
    let {organization} = this.props;
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
