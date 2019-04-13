import Taro,{ PureComponent } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtButton} from "taro-ui";
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import TabBar from "../../components/tabBar/tabBar";
import CommonList from "../../components/commonList/commonList";
import UserCard from "../../components/userCard/userCard";


const mapStateToProps = ({user: {entities, currentUser}}) => {

  return {
    currentUser: entities[currentUser]
  }
};
/**
 * @author LTF
 * @description 用户主页容器组件
 * Created on 2019/2/23
 */
@connect(mapStateToProps)
export default class UserHome extends PureComponent{

  config = {
    navigationBarTitleText: ''
  };

  state = {
    operateList: [
      {title: '我的发布', url: '/pages/userPublish/userPublish', arrow: 'right'},
      {title: '我的收藏', url: '/pages/orgReview/orgReview', arrow: 'right'},
      {title: '设置', url: '/pages/userSetting/userSetting', arrow: 'right'},
      {title: '反馈', url: '/pages/orgReview/orgReview', arrow: 'right'},
      {title: '关于', url: '/pages/orgReview/orgReview', arrow: 'right'},
    ]
  };

  handleCommonListClick = (data) => {
    Taro.navigateTo({
      url: data.url
    })
  };

  handleOnButtonClick = () => {

  };

  handleOnUserCardClick = () => {
    Taro.navigateTo({
      url: "/pages/userAccount/userAccount"
    })
  };

  render() {
    let {currentUser} = this.props;
    let {operateList} = this.state;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar isBack={false} title={'我的主页'} />
        </View>
        <View className='flex-1'>
          <UserCard onClick={this.handleOnUserCardClick} name={currentUser.userName} url={currentUser.userImageUrl} />
          <View className='operate'>
            <CommonList data={operateList} onClick={this.handleCommonListClick} />
            <View style={{marginTop: '24px'}}>
              <AtButton type='primary' full onClick={this.handleOnButtonClick}>退出登录</AtButton>
            </View>
          </View>
        </View>
        <View>
          <TabBar current={3} />
        </View>
      </View>
    );
  }
}
