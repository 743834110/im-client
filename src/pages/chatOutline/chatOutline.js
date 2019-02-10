import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtSearchBar} from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import TabBar from "../../components/tabBar/tabBar";
import SearchBar from "../../components/searchBar/searchBar";
import ChatList from "../../components/chatList/chatList";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatOutline extends Component {

  config = {
    navigationBarTitleText: ''
  };

  state = {

  };

  handleSearchBarClick = () => {
    Taro.navigateTo({
      url: "/pages/chatSearch/chatSearch"
    })
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'通讯'} isBack={false}  />
          <View onClick={this.handleSearchBarClick}>
            <AtSearchBar
              fixed={false}
              customStyle={{backgroundColor: '#f5f5f9'}}
            />
          </View>
        </View>
        <ScrollView scrollY className='flex-1'>
          <ChatList />
        </ScrollView>
        <View>
          <TabBar current={2} />
        </View>
      </View>
    );
  }
}
