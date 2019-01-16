import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {View, ScrollView, Checkbox} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {AtCheckbox} from 'taro-ui'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CheckboxList from "../../components/checkboxList/checkboxList";


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
export default class BuildGroup extends Component{
export default class BuildGroup extends Component {

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {
  static defaultProps = {};

  };
  handleChange(value) {
    this.setState({
      checkedList: value
    })
    console.log(value)
  }


  render() {
    this.checkboxOption = [{
      value: 'list1',
    }, {
      value: 'list2',
    }, {
      value: 'list3',
    }, {
      value: 'list4',
    }]

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='创建工作群' isBack />
        </View>
        <ScrollView scrollY className='flex-1' >

        <ScrollView scrollY className='flex-1'>
          <View>
            <AtCheckbox
              options={this.checkboxOption}
              selectedList={this.state.checkedList}
              onChange={this.handleChange.bind(this)}
            />
          </View>
          <Checkbox
            value='选中'
            checked
            color='#fff'
            className=' border-circle'
          >
            选中
          </Checkbox>
          <CheckboxList />
        </ScrollView>
      </View>
    )
  }



}
