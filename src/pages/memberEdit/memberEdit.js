import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import {connect} from "@tarojs/redux/types/index";


const mapStateToProps = ({tabPage}) => ({
  tabPage
});

const mapDispatchToProps = ({tabPage: {switchTab}}) => ({
  dispatchSwitchTab: (props) => {
    switchTab(props)
  }
});

/**
 * 成员调整界面
 * @author litianfeng
 * Created on 2019/1/9
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class MemberEdit extends Component{

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  render() {

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title='成员调整' />
        </View>
        <View className='flex-1'>

        </View>
      </View>
    )
  }
}
