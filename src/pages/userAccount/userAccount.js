import Taro,{ Component } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import InfoList from "../../components/infoList/infoList";

const mapStateToProps = ({user: {entities, currentUser, mappings: {humanity}}}) => {
  currentUser =entities[currentUser];
  let properties = Object.getOwnPropertyNames(humanity);
  let data = properties.map((value, index) => {
    return {
      id: index,
      title: humanity[value].alias,
      extraText: currentUser? currentUser[value]: undefined,
      extraThumb: value === 'userImageUrl' && currentUser? currentUser[value]: undefined,
      arrow: 'right',
      ...humanity[value].operate
    }
  });
  return {
    currentUser,
    data
  }
};
const mapDispatchToProps = (dispatch) => ({
  changeChatRoomSelected: dispatch.selected.changeChatRoomSelected,
});
/**
 * @author LTF
 * @description 用户账号信息容器组件
 * Created on 2019/2/25
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class UserAccount extends Component{

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  render() {
    let {data} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'账号'} />
        </View>
        <View className='flex-1' >
          <InfoList data={data} />
        </View>
      </View>
    );
  }
}
