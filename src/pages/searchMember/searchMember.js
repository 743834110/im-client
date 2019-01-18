import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import SearchBar from "../../components/searchBar/searchBar";
import SelectionButton from "../../components/selectionButton/selectionButton";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
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

  render() {

    return (
      <View className='container'>
        <View>
          <SearchBar />
        </View>
        <ScrollView
          scrollY
          className='flex-1'
        >

        </ScrollView>
        <View>
          <SelectionButton  />
        </View>
      </View>
    )
  }
}
