import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CheckboxList from "../../components/checkboxList/checkboxList";
import CommonList from "../../components/commonList/commonList";
import SelectionButton from "../../components/selectionButton/selectionButton";
import {AtSearchBar} from "taro-ui";


const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
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

  handleCheckboxItemClick = (selectedList) => {
    console.log(selectedList)
  };

  handleButtonClick = (event) => {
    console.log(event)
  };

  handleNumberClick = (event) => {
    console.log(event)
  };

  handleSearchBarFocus = (event) => {
    console.log(event)
  };

  render() {

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='创建工作群' isBack />
          <AtSearchBar
            onFocus={this.handleSearchBarFocus}
            placeholder='可批量搜索，以逗号隔开'
            customStyle={{backgroundColor: '#f5f5f9'}}
          />
        </View>
        <ScrollView scrollY className='scroll-view-flex-1' >
          <View className='margin-top-24'>
            <CommonList data={this.commonListData} />
          </View>
          <View className='margin-top-24'>
            <Text className='common-desc-text'>部门联系人</Text>
            <CheckboxList onCheckboxItemClick={this.handleCheckboxItemClick} />
          </View>
        </ScrollView>
        <View>
          <SelectionButton onButtonClick={this.handleButtonClick} onNumberClick={this.handleNumberClick} />
        </View>
      </View>
    )
  }


}
