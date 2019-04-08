import Taro, {PureComponent} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import VerticalTabGrid from "../../components/verticalTabGrid/verticalTabGrid";

const mapStateToProps = ({organization: {response = []}}) => {
  return {
    organization: {
      list: {
        school: response.map(item => item.school),
        studentAgencies: response.map(item => item.studentAgencies)
      }
    }
  };
};
/**
 * @author litianfeng
 * Created on 2018/12/31
 * 院校级机构预览组件
 * 用户选择想要参考的机构
 */
@connect(mapStateToProps)
export default class OrgReview extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch.organization.fetchOrganizationTree({
      pager: {
        param: {
          orgType: 'SCHOOL_AGENCY'
        },
        limit: 99
      }
    })
  }

  handleGridElementClick = (value) => {
    console.log(value);
    Taro.navigateTo({
      url: `/pages/orgHome/orgHome?orgId=${value.orgId}`
    })
  };

  render() {
    const {organization} = this.props;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title={'校园级机构'}  />
        </View>
        <View className='flex-1' style={{
          height: '10px'
        }}
        >
          <VerticalTabGrid onGridElementClick={this.handleGridElementClick}  instituteList={organization.list.school} orgList={organization.list.studentAgencies}  />
        </View>
      </View>
    )
  }
}
