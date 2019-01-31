import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import SearchBar from "../../components/searchBar/searchBar";
import SelectionButton from "../../components/selectionButton/selectionButton";
import CheckboxList from "../../components/checkboxList/checkboxList";

const mapStateToProps = (state) => {
  return {
    selectedMembers: state.selectedMembers,
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeSelected: (selectedList) => dispatch.selectedMembers.changeSelected(selectedList),
});

/**
 * @author LTF
 * @description 创建工作群时的成员搜索界面
 * Created on 2019/1/18
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class SearchMember extends Component {

  config = {
    navigationBarTitleText: ''
  };

  handleKeywordSearch = (value) => {
    console.log(value)
  };

  render() {
    let {selectedMembers, currentUser, changeSelected} = this.props;
    return (
      <View className='container'>
        <View>
          <SearchBar placeholder={'可批量搜索，以逗号隔开'} onKeywordSearch={this.handleKeywordSearch} />
        </View>
        <ScrollView
          scrollY
          className='flex-1'
        >
          <Text className='common-desc-text'>搜索结果</Text>
          <CheckboxList onCheckboxItemClick={changeSelected} defaultIds={[currentUser]} excludeIds={[currentUser]} />
        </ScrollView>
        <View>
          <SelectionButton number={selectedMembers.length}  />
        </View>
      </View>
    )
  }
}
