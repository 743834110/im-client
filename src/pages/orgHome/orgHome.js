import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";

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

  handleExtraClick = (event) => {
    console.log(event)
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar
            title='机构简称'
            rightFirstIconType='add-circle'
            onRightFirstIconClick={this.handleExtraClick}
          />
        </View>
      </View>
    )
  }

}
