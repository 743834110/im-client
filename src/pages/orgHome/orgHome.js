import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import PopUpBar from "../../components/popUpBar/popUpBar";
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 * @author litianfeng
 * @description 组织主页
 * Created on 2019/1/2
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class OrgHome extends Component{

  config = {
    navigationBarTitleText: ''
  };

  static defaultProps = {

  };

  state = {

  };



  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View className='container'>
        <View>
          <PopUpNavBar />
        </View>
        <View className='flex-1'>
          fdfdfdf
        </View>
      </View>
    )
  }

}
