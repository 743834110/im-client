import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import { AtNoticebar } from 'taro-ui'
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import OrgHomeTab from "../../components/orgHomeTab/orgHomeTab";
import SQL from "../../utils/query";

const mapStateToProps = ({
                           organization: {entities, pagination, mappings: {current}},
                           loading,
                           selected,
                           routine,
                           userOrg: {userOrgStructure}, chatGroup}) => {
  return {
    org: {
      list: new SQL()
        .select(current)
        .from(entities)
        .exec(),
      pagination
    },
    chatGroup: {
      list: new SQL()
        .select(chatGroup.mappings.current)
        .from(chatGroup.entities)
        .exec()
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

  state = {
    popUpList: [
      {iconType: 'message', title: '发布消息', url: '/pages/routinePublish/routinePublish'},
      {iconType: 'link', title: '创建工作群', url: '/pages/buildGroup/buildGroup'},
      {iconType: 'settings', title: '管理', url: '/pages/manageGroup/manageGroup'},
      {iconType: 'help', title: '反馈', url: '/pages/addFeedback/addFeedback'},
    ]
  };

  constructor(props) {
    super(props)
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
   * 利用当前组织和用户所在的组织进行比较
   * 当用户在当前组织当中，则可以进行更多的操作，
   * 以达到限制用户更多的操作的目的
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {chatGroup, org: {list}} = nextProps;
    console.log(list);
    if (chatGroup.list.some(item => this.$router.params.orgId === item.orgId)) {
      this.setState({
        popUpList: [
          {iconType: 'message', title: '发布消息', url: '/pages/routinePublish/routinePublish'},
          {iconType: 'link', title: '创建工作群', url: '/pages/buildGroup/buildGroup'},
          {iconType: 'settings', title: '管理', url: '/pages/manageGroup/manageGroup'},
          {iconType: 'help', title: '反馈', url: '/pages/addFeedback/addFeedback'},
        ]
      })
    }
    else {
      this.setState({
        popUpList: [
          {iconType: 'help', title: '反馈', url: '/pages/addFeedback/addFeedback'},
        ]
      })
    }
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
   * 切换到聊天界面
   * 请求的组织架构数据还没有加载到userOrgState当中
   * 可能用户信息还没有刷新到user的state当中，需要将userId，userName信息刷新到聊天界面当中
   * @param value
   */
  handleAccordionClick = (value) => {
    const {dispatch} = this.props;
    console.log(dispatch, value);
    dispatch.user.saveEntities([{userId: value.userId, userName: value.userName}]);
    dispatch.selected.changeChatRoomSelected(2, value.userId);
    Taro.navigateTo({
      url: "/pages/chatRoom/chatRoom"
    })
  };

  render() {
    let {org, routine, userOrg: {userOrgStructure}} = this.props;
    let {popUpList} = this.state;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar popUpList={popUpList} title={org.list[0]? org.list[0].orgName: ''}  onPopUpBlockClick={this.handlePopUpBlockClick} />
        </View>
        <View className='flex-1 display-flex-column'>
          {
            org.list[0] && org.list[0].orgAnnounce?
              <AtNoticebar icon='volume-plus' close>
                {org.list[0].orgAnnounce}
              </AtNoticebar>: null
          }
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
