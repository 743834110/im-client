import Taro, {PureComponent} from '@tarojs/taro'
import {View, Text, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import InstituteSwiper from "../../components/instituteSwiper/instituteSwiper";
import CommonList from "../../components/commonList/commonList";
import TabBar from "../../components/tabBar/tabBar";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import SQL from "../../utils/query";

/**
 * 机构轮廓页面
 */

const mapStateToProps = ({userOrg, user: {currentUser}}) => {
  return {
    userOrg: {
      list: new SQL()
        .select(userOrg.mappings.current)
        .from(userOrg.entities)
        .exec(),
      pagination: userOrg.pagination
    },
    currentUser
  }
};
@connect(mapStateToProps)
export default class OrgOutline extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

// {
//   title: '15外包1班',
//   ext: {
//     path: ''
//   }
// }

  currentOrgEntrance = (array = []) => {
    return array.map(item => ({
      title: item.shortName,
      ...item,
      ext: {
        path: ''
      }
    }))
  };




  constructor(props) {
    super(props);
  }

  // 获取我的机构数据,获取我的学院入口:我的学院暂时没有载入该客户端
  componentDidMount() {
    const {dispatch, currentUser} = this.props;
    dispatch({
      type: 'userOrg/fetch',
      payload: {
        pager: {
          param: {
            userId: currentUser
          },
          filter: {
            orgType: ['CLASS', 'STUDENT_CLUB', 'STUDENT_AGENCY']
          }
        }
      }
    })


  }

  handleSwiperClick = (value) => {
    console.log(value);
  };

  /**
   * 机构选择入口点击事件
   * @param value
   */
  handleCommonListClick = (value) => {
    console.log(value);
    Taro.navigateTo({
      url: value.url
    })
  };

  // 导航到我的机构页面
  handleNavigateToOrgClick = (value) => {
    Taro.navigateTo({
      url: `/pages/orgHome/orgHome?orgId=${value.orgId}`
    })
  };



  render() {
    let {userOrg} = this.props;
    console.log(userOrg);
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'学院机构'} isBack={false} />
        </View>
        <ScrollView
          className='flex-1'
          scrollY
          style={{
            height: '10px'
          }}
        >
          <View>
            <InstituteSwiper onClick={this.handleSwiperClick} />
          </View>

          <View className='margin-top-24'>
            <CommonList onClick={this.handleCommonListClick} />
          </View>
          <View className='margin-top-24 white'>
            <Text style={{
              color: '#999999',
              fontSize: '0.68267rem',
              marginLeft: '12px'
            }}
            >
              我的机构
            </Text>
            <CommonList data={this.currentOrgEntrance(userOrg.list)} onClick={this.handleNavigateToOrgClick} />
          </View>
        </ScrollView>
        <View>
          <TabBar current={1} />
        </View>
      </View>
    )

  }

}
