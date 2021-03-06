import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import SelectionButton from "../../components/selectionButton/selectionButton";
import SearchBar from "../../components/searchBar/searchBar";
import CheckboxList from "../../components/checkboxList/checkboxList";

const mapStateToProps = (state) => ({
  state
});
@connect(mapStateToProps)
export default class AddMember extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  handleButtonClick = () => {
    Taro.navigateTo({
      url: "/pages/operateStatus/operateStatus"
    })
  };

  handleNumberClick = () => {

  };

  handleKeywordSearch =  (value) => {
    console.log(value)
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SearchBar placeholder={'可批量搜索，以逗号隔开'} showModal onKeywordSearch={this.handleKeywordSearch}  />
        </View>
        <ScrollView scrollY className='flex-1 margin-top-24'>
          <Text className='common-desc-text'>搜索结果</Text>
          <CheckboxList  />
        </ScrollView>
        <View>
          <SelectionButton buttonDescription={'保存'} onButtonClick={this.handleButtonClick} onNumberClick={this.handleNumberClick} />
        </View>
      </View>
    );
  }
}
