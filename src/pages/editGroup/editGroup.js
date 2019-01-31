import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtButton} from 'taro-ui';
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CustomImagePicker from "../../components/customImagePicker/customImagePicker";
import CustomInput from "../../components/customInput/customInput";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 * @author LTF
 * @description 编辑群资料界面容器组件
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class EditGroup extends Component{

  config = {
    navigationBarTitleText: ''
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'编辑群资料'} />
        </View>
        <View className='flex-1 display-center'>
          <View style={{width: '25%'}}>
            <CustomImagePicker length={1} limit={1} />
          </View>
          <View className='margin-top-24' style={{width: '100%'}}>
            <CustomInput placeholder={'填写群名称（限15字）'} />
          </View>
          <View className='margin-top-24'>
            <AtButton full type='primary'>完成创建</AtButton>
          </View>
        </View>
      </View>
    );
  }
}
