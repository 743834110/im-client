import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import SearchBar from "../../components/searchBar/searchBar";
import SelectionButton from "../../components/selectionButton/selectionButton";
import CheckboxList from "../../components/checkboxList/checkboxList";
import LoadMore from "../../components/loadMore/loadMore";
import SQL from "../../utils/query";
import {REFRESH_STATUS} from "../../utils/config";

const mapStateToProps = ({selectedMembers, user: {entities, currentUser}, userOrg}) => {
  return {
    selectedMembers,
    currentUser: entities[currentUser],
    userOrg: {
      list: new SQL()
        .select(userOrg.mappings.current).
        from(userOrg.entities).
        exec().map(item => ({
          ...item,
          thumb: item.userImageUrl,
          title: item.userName,
          note: item.orgName,
          extraText: item.userAccount
        })),
      pagination: userOrg.pagination
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeSelected: (selectedList) => dispatch.selectedMembers.changeSelected(selectedList),
  dispatch
});

/**
 * @author LTF
 * @description 创建工作群时的成员搜索界面
 * Created on 2019/1/18
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class SearchMember extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  state = {
    loadMoreStatus: REFRESH_STATUS.NORMAL,
    searchValue: null
  };

  componentWillReceiveProps(nextProps) {
    const {userOrg: {pagination}} = nextProps;
    this.setState({
      loadMoreStatus: pagination.default.current * pagination.default.pageSize >= pagination.default.total?
        REFRESH_STATUS.NO_MORE_DATA: REFRESH_STATUS.NORMAL,
    })
  }

  /**
   * 发出搜索用户请求：搜索用户类型：student和teacher
   * @param value
   */
  handleKeywordSearch = (value) => {
    console.log(value)
    const {dispatch} = this.props;
    this.setState({
      searchValue: value,
      loadMoreStatus: REFRESH_STATUS.REFRESHING
    });
    // 暂时不支持批量搜索
    dispatch({
      type: 'userOrg/fetch',
      payload: {
        pager: {
          or: {
            userAccount: value,
            userName: value,
            orgName: value,
            roleName: value,
          },
          filter: {
            orgType: ['CLASS', '']
          }
        }
      }
    })

  };

  /**
   * scrollView查看下一页事件
   */
  handleOnScrollToLower = () => {
    const {dispatch} = this.props;
    const {searchValue, loadMoreStatus} = this.state;
    if (loadMoreStatus === REFRESH_STATUS.NO_MORE_DATA) {
      return;
    }
    this.setState({
      loadMoreStatus: REFRESH_STATUS.REFRESHING,
    })
    dispatch({
      type: 'userOrg/fetchLatter',
      payload: {
        pager: {
          or: {
            userAccount: searchValue,
            userName: searchValue,
            orgName: searchValue,
            roleName: searchValue,
          },
          filter: {
            orgType: ['CLASS', '']
          }
        }
      }
    })

  };



  render() {
    let {selectedMembers, currentUser, changeSelected, userOrg: {list}} = this.props;
    const {loadMoreStatus} = this.state;
    return (
      <View className='container'>
        <View>
          <SearchBar placeholder={'可批量搜索，以逗号隔开'} onKeywordSearch={this.handleKeywordSearch} />
        </View>
        <ScrollView
          scrollY
          className='flex-1'
          onScrollToLower={this.handleOnScrollToLower}
        >
          <Text className='common-desc-text'>搜索结果</Text>
          {
            list.length !== 0?
              <CheckboxList data={list} onCheckboxItemClick={changeSelected} defaultIds={[currentUser]} excludeIds={[currentUser]} />
              : ''
          }
          <LoadMore status={loadMoreStatus} />
        </ScrollView>
        <View>
          <SelectionButton number={selectedMembers.length}  />
        </View>
      </View>
    )
  }
}
