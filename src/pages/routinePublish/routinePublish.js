import Taro, { Component } from '@tarojs/taro'
import {View, Input} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import {AtForm, AtButton, AtInput, AtImagePicker} from 'taro-ui'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomInput from "../../components/customInput/customInput";
import {getSubmitObject} from "../../utils/common";
import CustomTextarea from "../../components/customTextarea/customTextarea";
import CustomImagePicker from "../../components/customImagePicker/customImagePicker";


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
    let object = getSubmitObject(this.refs);
    console.log(object)
  };

  handleReSet = (event) => {
    console.log(event)
  };

  render() {

    return (
      <View className='container white'>
        <View>
          <SimpleNavBar title='消息发布' />
        </View>
        <View className='flex-1'>
          <View className='default-padding-left '>
            <CustomInput ref='title' placeholder='标题' />
          </View>
          <View className='margin-top-24'>
            <CustomTextarea ref='content' placeholder='基本内容' maxLength={400} />
          </View>
          <View className='margin-top-24'>
            <CustomImagePicker ref='files' />
          </View>
          <View className='margin-top-24'>
          <AtButton type='primary' onClick={this.handleSubmit}>提交</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
