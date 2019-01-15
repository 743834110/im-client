import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";


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

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  render() {

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='创建工作群' isBack />
        </View>
        <ScrollView scrollY className='flex-1' >
          
        </ScrollView>
      </View>
    )
  }



}
