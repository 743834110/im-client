import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import OrgHomeTab from "../../components/orgHomeTab/orgHomeTab";
import SQL from "../../utils/query";

const mapStateToProps = ({organization: {entities, pagination, mappings: {current}}, loading, selected, routine, userOrg: {userOrgStructure}}) => {
  return {
    org: {
      list: new SQL()
        .select(current)
        .from(entities)
        .exec(),
      pagination
    },
    routine: {
      list: new SQL()
        .select(routine.mappings.current)
        .from(routine.entities)
        .exec(),
      pagination: routine.pagination
    },
    userOrg: {
      userOrgStructure: userOrgStructure.map(item => ({
        key: item.orgId,
        name: item.orgName,
        list: item.userOrgList.map(userOrg => ({
          title: userOrg.userName,
          note: userOrg.roleName,
          ...userOrg
        }))
      }))
    },
    loading,
    selected
  }
};
/**
 * @author litianfeng
 * @description 组织主页
 * Created on 2019/1/2
 */
@connect(mapStateToProps)
export default class OrgHome extends Component{

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // let orgString = decodeURIComponent(this.$router.params.param);
    // console.log(orgString)
    // let org = JSON.parse(orgString);
    // this.setState({
    //   org: org
    // })
  }

  /**
   * 获取组织信息
   * 获取组织发布的消息
   * 获取组织内部人员
   */
  componentDidMount() {
    const {dispatch} = this.props;
    const params = this.$router.params;
    Taro.showLoading({
      title: 'loading',
      mask: true,
    });
    const promises = [];
    promises.push(dispatch({
      type: 'organization/fetchOne',
      payload: {
        ...params,
        callback: (res) => {
          dispatch({
            type: 'userOrg/fetchUserOrgStructure',
            payload: {
              pager: {
                param: {
                  ...params,
                  orgType: res.data.orgType,
                  orgName: res.data.orgName
                }
              }
            }
          })
        }
      }
    }));
   dispatch({
      type: 'routine/fetch',
      payload: {
        pager: {
          param: {
            ...params
          },
          sorter: {
            createTime: 'desc',
            endTime: 'asc'
          }
        }
      }
    });
    Promise.all(promises).then(() => Taro.hideLoading());
  }

  /**
   * 页面被重新展示时，关闭弹出对话框
   */
  componentDidShow() {

  }

  /**
   * 处理点击弹窗元素事件
   * @param value
   */
  handlePopUpBlockClick = (value) => {
    let {org: {list}} = this.props;
    Taro.navigateTo({
      url: `${value.url}?orgId=${list[0].orgId}&orgType=${list[0].orgType}&orgName=${list[0].orgName}}`
    })
  };

  handleRoutineClick = (target) => {
    let {routine} = target.props;
    Taro.navigateTo({
      url: '/pages/routineDetail/routineDetail' + '?routine=' + JSON.stringify(routine),
    })
  };

  handleLowerRefresh = () => {
    const {dispatch} = this.props;
    const params = this.$router.params;
    const {routine: {pagination}} = this.props;
    if (pagination.total <= pagination.current * pagination.pageSize) {
      return;
    }
    dispatch({
      type: 'routine/fetchLatter',
      payload: {
        pager: {
          param: {
            ...params
          },
          sorter: {
            createTime: 'desc',
            endTime: 'asc'
          },
          offset: pagination.current
        }
      }
    })
  };

  /**
   * 组织架构成员点击事件
   * @param index
   */
  handleAccordionClick = (index) => {
    const {userOrg: {userOrgStructure}, dispatch} = this.props;
    console.log(dispatch);
  };

  render() {
    let {org, routine, userOrg: {userOrgStructure}} = this.props;
    console.log(userOrgStructure);
    return (
      <View className='container'>
        <View>
          <PopUpNavBar title={org.list[0]? org.list[0].orgName: ''}  onPopUpBlockClick={this.handlePopUpBlockClick} />
        </View>
        <View className='flex-1 display-flex-column'>
          <View className='white '>
            <Image
              style={{
                height: '150px',
                width: '100vw',
              }}
              src={
                org.list[0]?
                  org.list[0].orgImageUrl:
                  'https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
              }
            />

          </View>
          <View className='flex-1'>
            <OrgHomeTab org={org.list[0]} accordionList={userOrgStructure} onAccordionItemClick={this.handleAccordionClick}  routineList={routine.list} onLowerRefresh={this.handleLowerRefresh} onRoutineClick={this.handleRoutineClick}  />
          </View>
        </View>
      </View>
    )
  }

}
