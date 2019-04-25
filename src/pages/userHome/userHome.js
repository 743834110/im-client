import Taro,{ PureComponent } from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtButton} from "taro-ui";
import {connect} from "@tarojs/redux";
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import TabBar from "../../components/tabBar/tabBar";
import CommonList from "../../components/commonList/commonList";
import UserCard from "../../components/userCard/userCard";
import {setToken} from "../../utils/request";


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
      // {title: '反馈', url: '/pages/orgReview/orgReview', arrow: 'right'},
      {title: '关于', url: '/pages/orgReview/orgReview', arrow: 'right'},
    ]
  };

  handleCommonListClick = (data, index) => {
    if (index === 1) {
      Taro.showModal({
        content: '该功能正在开发中...',
        showCancel: false
      })
    }
    else if (index !== 3) {
      Taro.navigateTo({
        url: data.url
      })
    }
    else {
      Taro.showModal({
        content: '校园发布助手alpha版',
        showCancel: false
      })
    }
  };

  /**
   * 退出登录,跳转到登录界面
   */
  handleOnButtonClick = () => {
    const {dispatch} = this.props;
    Taro.showModal({
      content: '是否要退出登录'
    }).then(res => {
      if (res.confirm) {
        dispatch.socketTask.close();
        setToken(null);
        Taro.redirectTo({
          url: '/pages/login/login'
        })
      }
    })
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
