import Taro,{ Component } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CommonList from "../../components/commonList/commonList";

const  mapStateToProps = (state) => {

  let setting = state.setting.entities;
  let humanity = state.setting.mappings.humanity;
  let properties = Object.getOwnPropertyNames(humanity);
  let commonListData = properties.map((value, id) => {
    let temp = setting[value];
    let returnResult = {id};
    let key;
    switch (typeof temp) {
      case 'boolean':
        key = 'check';
        returnResult.switch = true;
        break;
      case 'string':
        key = 'extraText';
        break;
    }
    returnResult[key] = temp;
    returnResult.title = humanity[value];
    return returnResult;
  });
  return {
    commonListData
  }
};

const mapDispatchToProps = (dispatch) => ({

});
/**
 * @author LTF
 * @description 用户设置容器组件
 * Created on 2019/2/23
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class UserSetting extends Component{

  config = {
    navigationBarTitleText: ''
  };

  state = {
  };

  componentWillMount() {

  }

  handleSwitchChange = (index, event) => {
    let {commonListData} = this.state;
    commonListData[index].check = !commonListData[index].check;
    this.setState({
      commonListData
    })
  };

  render() {
    let {commonListData} = this.props;
    console.log(commonListData)
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'设置'} />
        </View>
        <View className='flex-1'>

          <CommonList onSwitchChange={this.handleSwitchChange} data={commonListData} />
        </View>
      </View>
    );
  }
}
