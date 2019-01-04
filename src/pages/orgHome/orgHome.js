import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {connect} from "@tarojs/redux"
import PopUpNavBar from "../../components/popUpNavBar/popUpNavBar";
import OrgHomeTab from "../../components/orgHomeTab/orgHomeTab";

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
    org: {}
  };

  componentWillMount() {
    let orgString = decodeURIComponent(this.$router.params.param);
    console.log(orgString)
    let org = JSON.parse(orgString);
    this.setState({
      org: org
    })
  }

  constructor(props) {
    super(props)
  }

  /**
   * 处理点击弹窗元素事件
   * @param value
   */
  handlePopUpBlockClick(value) {
    console.log(value)
  }

  render() {
    let {org} = this.state;
    return (
      <View className='container'>
        <View>
          <PopUpNavBar  onPopUpBlockClick={this.handlePopUpBlockClick} />
        </View>
        <View className='flex-1 display-flex-column'>
          <View className='white '>
            <Image
              style={{
                height: '150px',
                width: '100vw',
              }}
              src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
            />
          </View>
          <View className='flex-1'>
            <OrgHomeTab />
          </View>

        </View>
      </View>
    )
  }

}
