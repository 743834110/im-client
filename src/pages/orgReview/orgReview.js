import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import VerticalTabGrid from "../../components/verticalTabGrid/verticalTabGrid";
import {getSystemInfo} from "../../utils/display";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 * @author litianfeng
 * Created on 2018/12/31
 * 院校级机构预览组件
 * 用户选择想要参考的机构
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class OrgReview extends Component {

  config = {
    navigationBarTitleText: ''
  };

  componentWillMount() {
  }


  render() {

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'校园级机构'}  />
        </View>
        <View className='flex-1' style={{
          height: '10px'
        }}
        >
          <VerticalTabGrid />
        </View>
      </View>
    )
  }
}
