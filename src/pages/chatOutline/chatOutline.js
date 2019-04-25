import Taro, {PureComponent} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import {AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import TabBar from "../../components/tabBar/tabBar";
import ChatList from "../../components/chatList/chatList";
import AccordionList from "../../components/accordionList/accordionList";
import SQL from "../../utils/query";

const mapStateToProps = ({chatGroup: {entities, mappings: {current}}, user, messageAndChatGroup}) => {
  return {
    chatGroup: {
      list: new SQL().select(current).from(entities).exec()
        .map(item => ({
          ...item,
          list: item.users.map(userId => ({
            title: user.entities[userId].userName,
            ...user.entities[userId]
          }))
        }))
    },
    messageAndChatGroup: {
      list: new SQL()
        .select(Array.from(messageAndChatGroup.mappings))
        .from(messageAndChatGroup.entities)
        .exec()
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeChatRoomSelected: dispatch.selected.changeChatRoomSelected,
  dispatch
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ChatOutline extends PureComponent {

  config = {
    navigationBarTitleText: ''
  };

  state = {
    current: 0,
    tabList: [{
      title: '消息'
    }, {
      title: '联系人'
    }],
  };

  // 标签页切换
  handleTabsClick = (value) => {
    this.setState({
      current: value
    })
  };

  //
  handleSearchBarClick = () => {
    Taro.navigateTo({
      url: "/pages/chatSearch/chatSearch"
    })
  };

  /**
   * 联系人点击事件
   * 更新store中选中的数据
   * @param index
   * @param value
   */
  handleChatListItemClick = (index, value) => {
    let {changeChatRoomSelected} = this.props;
    console.log(value);
    // 设定当前聊天窗口的用户。
    changeChatRoomSelected(value.chatType, value.key);
    Taro.navigateTo({
      url: "/pages/chatRoom/chatRoom"
    })
  };

  /**
   * 点击进入私聊页面
   * @param value
   */
  handleAccordionItemClick = (value) => {
    let {changeChatRoomSelected} = this.props;
    console.log(value);
    changeChatRoomSelected(2, value.userId);
    Taro.navigateTo({
      url: "/pages/chatRoom/chatRoom"
    })
    
  };


  render() {
    const {current, tabList} = this.state;
    const {chatGroup, messageAndChatGroup} = this.props;
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
              <ChatList data={messageAndChatGroup.list} onListItemClick={this.handleChatListItemClick} />
            </AtTabsPane>
            <AtTabsPane className='overflow-y-auto' current={current} index={1}>
              <AccordionList data={chatGroup.list} onListItemClick={this.handleAccordionItemClick}  />
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
