import Taro,{ Component } from '@tarojs/taro';
import {View} from '@tarojs/components';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import CommonList from "../../components/commonList/commonList";

/**
 * @author LTF
 * @description 用户设置容器组件
 * Created on 2019/2/23
 */
export default class UserSetting extends Component{

  config = {
    navigationBarTitleText: ''
  };

  state = {
    commonListData: [
      {title: '保存密码', switch: true}
      ]
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
    let {commonListData} = this.state;
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
