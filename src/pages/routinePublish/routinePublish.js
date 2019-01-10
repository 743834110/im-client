import Taro, { Component } from '@tarojs/taro'
import {View, Form, Switch, Button} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import {AtForm, AtButton, AtInput} from 'taro-ui'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomInput from "../../components/customInput/customInput";



const mapStateToProps = ({tabPage}) => ({
  tabPage
});

const mapDispatchToProps = ({tabPage: {switchTab}}) => ({
  dispatchSwitchTab: (props) => {
    switchTab(props)
  }
});

/**
 * 消息发布界面
 * @author litianfeng
 * Created on 2019/1/9
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class RoutinePublish extends Component{
  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  handleSubmit = (event) => {
    console.log(event)
    console.log(this.refs)
    console.log(Object.getOwnPropertyNames(this.refs))
  };

  handleReSet = (event) => {
    console.log(event)
  };

  render() {

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='消息发布' />
        </View>
        <View className='flex-1'>
          <AtForm
            reportSubmit
            onSubmit={this.handleSubmit}
            onReset={this.handleReSet}
          >
            <CustomInput ref='input' />
            <AtButton formType='submit' onClick={this.handleSubmit}>提交</AtButton>
            <AtButton formType='reset'>重置</AtButton>
          </AtForm>
        </View>
      </View>
    )
  }
}
