import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import TabBar from "../../components/tabBar/tabBar";
import ChatList from "../../components/chatList/chatList";
import AccordionList from "../../components/accordionList/accordionList";

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
    current: 0,
    tabList: [{
      title: '消息'
    }, {
      title: '联系人'
    }]
  };

  handleTabsClick = (value) => {
    this.setState({
      current: value
    })
  };

  handleSearchBarClick = () => {
    Taro.navigateTo({
      url: "/pages/chatSearch/chatSearch"
    })
  };

  render() {
    let {current, tabList} = this.state
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
          <AtTabs className='overflow-y-auto' current={current} tabList={tabList} onClick={this.handleTabsClick}>
            <AtTabsPane current={current} index={0}>
              <ChatList />
            </AtTabsPane>
            <AtTabsPane className='overflow-y-auto' current={current} index={1}>
              <AccordionList />
            </AtTabsPane>
          </AtTabs>
        </ScrollView>
        <View>
          <TabBar current={2} />
        </View>
      </View>
    );
  }
}
