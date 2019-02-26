import Taro,{ Component } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import InfoList from "../../components/infoList/infoList";

const mapStateToProps = (state) => {
  let currentUser = state.users.entities[state.currentUser];
  let humanity = state.users.mappings.humanity;
  let properties = Object.getOwnPropertyNames(humanity);
  let data = properties.map((value, index) => {
    return {
      id: index,
      title: humanity[value].alias,
      extraText: currentUser[value],
      extraThumb: value === 'userImageUrl'? currentUser[value]: undefined,
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
    data: [
      {
        id: '001',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        extraText: '2015874136',
        arrow: "right"
      },
      {
        id: '002',
        title: '行者孙',
        extraText: '2015874136',
        arrow: "right"
      }
    ]
  };

  render() {
    let {data} = this.props;
    console.log(data);
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
