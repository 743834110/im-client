import Taro,{ Component } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import StringList from "../../components/stringList/stringList";

const mapStateToProps = (state) => {

  return {
    currentUser: state.users.entities[state.currentUser]
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
        note: '15软件服务外包1班',
        extraText: '2015874136',
        arrow: "right"
      },
      {
        id: '002',
        thumb: 'http://www.runoob.com/wp-content/uploads/2015/07/5a7d00514af1e464221c677c15e8e990.png',
        title: '行者孙',
        note: '15软件服务外包1班',
        extraText: '2015874136',
      }
    ]
  };

  render() {
    let {data} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'账号'} />
        </View>
        <View className='flex-1' >
          <StringList data={data} />
        </View>
      </View>
    );
  }
}
