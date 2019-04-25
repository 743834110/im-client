import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CommonList from "../../components/commonList/commonList";
import AccordionList from "../../components/accordionList/accordionList";
import SQL from "../../utils/query";

const mapStateToProps = ({userOrg: {userOrgStructure}, role: {entities, mappings: {current}}, loading}) => {

  return {
    role: {
      list: new SQL().select(current).from(entities).exec()
    },
    loading: loading.effects.userOrg.batchUpdate,
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
    }
  }
};
@connect(mapStateToProps)
export default class EditMember extends Component{
  config = {
    navigationBarTitleText: ''
  };

  state = {
    commonListData: [
      {
        title: '添加成员',
        url: '/pages/addMember/addMember',
        arrow: 'right',

      }
    ],
    options: [
      {
        title: '转职',
        range: ['干事', '部长', '副会长', '会长']
      },
      '移除'
    ],
  };

  componentWillMount() {
    const {params} = this.$router.params;
    this.setState({
      ...JSON.parse(decodeURI(params))
    })
  }

  // 注意：当前组织机构数据是直接向state
  // 根据组织类型请求与组织相关的组织职位
  componentDidMount() {
    const {dispatch} = this.props;
    const {orgType} = this.state;
    Taro.showLoading({
      title: 'loading...',
      mask: true
    });
    dispatch({
      type: 'role/fetch',
      payload: {
        pager: {
          param: {
            roleType: `ROLE_${orgType}`
          },
          limit: 9999
        },
        callback: () => {
          Taro.hideLoading();
        }
      }
    })
  }

  // 根据orgType显示弹出选项的类型
  componentWillReceiveProps(nextProps) {
    const {role: {list}} = nextProps;
    const {orgType} = this.state;
    // 班级类型
    if (orgType === 'CLASS') {
      this.setState({
        options: [
          {
            title: '转职',
            range: [
              ...list.map(item => item.roleName),
              '解除'
            ],
          },
          '移除'
        ]
      })
    }
    // 其他类型角色暂时不处理
    else {

    }
  }


  /**
   * picker选择器事件
   */
  handleOnChange = (outerIndex, value, innerIndex, optionIndex, event) => {
    const {dispatch, role: {list}} = this.props;
    const {orgType} = this.state;
    const selectedIndex = event.detail.value[0];
    // class类型数据处理,修改指定序号的人员的roleId和roleName
    // 用method来标注执行的更新模式，暂时不使用optionIndex
    if (orgType === 'CLASS') {
      dispatch({
        type: 'userOrg/updateUserOrgStructure',
        payload: {
          outerIndex,
          innerIndex,
          _userOrg: {
            roleId: selectedIndex < list.length? list[selectedIndex].roleId: "",
            roleName: selectedIndex < list.length? list[selectedIndex].roleName: "",
            method: 'update',
          },
        }
      })
    }
    else {

    }
  };

  /**
   * 类型选项改变事件
   * 进行删除操作或者其他定义的操作
   * @param optionIndex option中第几类型数据
   * @param value data的所在值
   * @param index data的索引
   */
  handleButtonItemClick = (outerIndex, value, innerIndex, optionIndex) => {
    const {dispatch} = this.props;
    let method = 'delete';
    if (value.method === 'delete') {
      method = null;
    }
    // 删除
    if (optionIndex === 1) {
      dispatch({
        type: 'userOrg/updateUserOrgStructure',
        payload: {
          outerIndex,
          innerIndex,
          _userOrg: {
            method
          },
        }
      })
    }
  };

  // 保存按钮点击事件,整理更新的信息，并将其发送至后台服务器
  handleOnClick = () => {
    const {dispatch, userOrg: {userOrgStructure}} = this.props;
    const update = [];
    const _delete = [];
    const insert = []

    // 寻找相匹配的操作结果
    userOrgStructure.forEach(item => {
      item.list.forEach(userOrg => {
        switch (userOrg.method) {
          case 'update':
            update.push(userOrg);
            break;
          case 'insert':
            insert.push(userOrg);
            break;
          case 'delete':
            _delete.push(userOrg);
            break;
          default:
        }
      })
    });

    // 发布事件，更新到服务器
    Taro.showLoading({
      title: '正在提交, 请稍后...',
      mask: true,
    });
    dispatch.userOrg.batchUpdate({
      inputBean: {
        update,
        insert,
        delete: _delete
      },
      callback: (res) => {
        Taro.hideLoading();
        const status = res.status >= 200 && res.status <= 300;
        Taro.navigateTo({
          url: `/pages/operateStatus/operateStatus?status=${status}`
        })
      }
    })
  };

  // 页面跳转
  handleCommonListClick = (value, event) => {
    Taro.navigateTo({
      url: value.url
    })
  };

  render() {
    let {userOrg: {userOrgStructure}, loading} = this.props;
    let {options, commonListData} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'成员调整'} />
        </View>
        <View className='flex-1'>
          <View className='margin-top-24'>
            <CommonList data={commonListData} onClick={this.handleCommonListClick}  />
          </View>
          <View className='margin-top-24'>
            <AccordionList data={userOrgStructure} onPickerChange={this.handleOnChange} options={options} onButtonItemClick={this.handleButtonItemClick} />
          </View>
          <View className='margin-top-24'>
            <AtButton type='primary' full onClick={this.handleOnClick} disabled={loading} loading={loading}>
              保存
            </AtButton>
          </View>
        </View>
      </View>
    );
  }
}
