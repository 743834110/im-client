import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomTagBar from "../../components/customTagBar/customTagBar";
import CommonList from "../../components/commonList/commonList";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});
/**
 * @description 学生社团搜索页面
 * Created on 2019/1/1
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class StudentSocietySearch extends Component{

  config = {
    navigationBarTitleText: ''
  };


  state = {

  };


  /**
   * 处理标签栏点击事件
   * 搜索标签与其他的处理标签有所不同：
   * 弹出便于用户输入的搜索框
   * 而其他的则弹出类选择器
   * @param value
   * @param event
   */
  handleTagClick = (value, index, event) => {
    console.log(value + ":" + index + event)

    if (value.tagName === '搜索') {

    }
    else {

    }
  };

  handlePickerChange = (value) => {
    console.log(value)
  };

  handleSearchClick = (value) => {
    console.log(value)
  };

  handleListClick = (value) => {
    Taro.navigateTo({
      url: '/pages/orgHome/orgHome?param=' + encodeURIComponent(JSON.stringify(value))
    })
  };

  render() {
    let {selector, disabled} = this.state;
    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title='学生社团' />
          <CustomTagBar onPickerChange={this.handlePickerChange} onSearchClick={this.handleSearchClick} />
        </View>
        <ScrollView
          className='flex-1 margin-top-24'
          scrollY
          style={{
            height: '10px'
          }}
        >
          <CommonList onClick={this.handleListClick} />
        </ScrollView>
      </View>
    );
  }
}
