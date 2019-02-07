import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

/**
 * @description 操作状态容器组件，从效率至上出发，与原型有所冲突。
 * @author LTF
 * Created on 2019/2/7
 */
export default class OperateStatus extends Component{

  config = {
    navigationBarTitleText: ''
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'操作状态'} isBack={false} />
        </View>
        <View className='flex-1'>
          
        </View>
      </View>
    );
  }
}
