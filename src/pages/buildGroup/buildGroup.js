import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {AtSearchBar} from "taro-ui";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CheckboxList from "../../components/checkboxList/checkboxList";
import CommonList from "../../components/commonList/commonList";
import SelectionButton from "../../components/selectionButton/selectionButton";



const mapStateToProps = (state) => {
  return {
    selectedMembers: [
      ...new Set([
        ...state.selectedMembers,
        state.currentUser
      ])
    ],
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeSelected: (selectedList) => dispatch.selectedMembers.changeSelected(selectedList),
});

/**
 * 创建工作群页面
 * @author LTF
 * Created on 2019/1/15
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class BuildGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {};

  commonListData = [
    {
      title: '面对面建群'
    }
  ];

  constructor(props) {
    super(props);
  }


  /**
   * 多选事件
   * @param selectedList
   */
  handleCheckboxItemClick = (selectedList) => {
    console.log(selectedList)
  };

  /**
   * 点击创建工作群事件
   * @param event
   */
  handleButtonClick = (event) => {

    console.log(event)
  };

  /**
   * 已选择工作群事件
   * @param event
   */
  handleNumberClick = (event) => {
    Taro.navigateTo({
      url: ""
    })
  };

  /**
   * 跳转至成员搜索界面
   *
   */
  handleSearchBarFocus = () => {
    Taro.navigateTo({
      url: '/pages/searchMember/searchMember'
    })
  };

  render() {
    let {selectedMembers, currentUser, changeSelected} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'创建工作群'} isBack />
          <View onClick={this.handleSearchBarFocus}>
            <AtSearchBar
              fixed={false}
              placeholder={'可批量搜索，以逗号隔开'}
              customStyle={{backgroundColor: '#f5f5f9'}}
            />
          </View>
        </View>
        <ScrollView scrollY className='scroll-view-flex-1' >
          <View className='margin-top-24'>
            <CommonList data={this.commonListData} />
          </View>
          <View className='margin-top-24'>
            <Text className='common-desc-text'>部门联系人</Text>
            <CheckboxList onCheckboxItemClick={changeSelected} defaultIds={[currentUser]} excludeIds={[currentUser]} />
          </View>
        </ScrollView>
        <View>
          <SelectionButton number={selectedMembers.length} />
        </View>
      </View>
    )
  }


}
