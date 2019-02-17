import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import SearchBar from "../../components/searchBar/searchBar";
import ChatHint from "../../components/chatHint/chatHint";
import ChatSearchBlock from "../../components/chatSearchBlock/chatSearchBlock";

const mapStateToProps = (state) => {
  let searchedChatGroup = state.searched.chatGroup.map(value => {
    let object = state.chatGroup.entities[value];
    return {
      id: object.groupId,
      title: object.name,
      thumb: object.avatar
    }
  });
  return {
    searchedChatGroup: searchedChatGroup,
    searchedUser: state.searched.user,
    searchedMessage: state.searched.message
  }
};

const mapDispatchToProps = (dispatch) => {

  return {
    test: dispatch.searched.test
  }
};

/**
 * @author LTF
 * @description 聊天内容搜索页面容器组件
 * Created on 2019/2/13
 */
@connect(mapStateToProps, mapDispatchToProps)
export default class ChatSearch extends Component{

  static defaultProps = {

  };

  state = {
    isHide: false,
  };

  constructor(props) {
    super(props);

  }


  handleKeywordSearch = (value) => {
    console.log(value)
  };

  handleSearchBarFocus = (event) => {
   if (event.detail.value) {
     return;
   }
    this.setState({
      isHide: true
    })
  };

  handleSearchBarBlur = (event) => {
    if (event.detail.value) {
      return;
    }
    this.setState({
      isHide: false
    })
  };

  handleChatGroupClick = (value) => {
    let {test} = this.props;

  };

  handleMessageClick = (value) => {

  };

  handleUserClick = (value) => {

  };

  handleLoadMoreClick = (index) => {

  };

  render() {
    let {isHide} = this.state;
    let {searchedChatGroup, searchedUser, searchedMessage} = this.props;
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'通讯'} />
          <SearchBar onKeywordSearch={this.handleKeywordSearch} onBlur={this.handleSearchBarBlur} onFocus={this.handleSearchBarFocus} />
        </View>
        {
          !isHide? <View style={{marginTop: '8px'}}><ChatHint /></View>:
            <ScrollView scrollY className='flex-1 display-flex-column'>
              {
                searchedChatGroup.length !== 0?
                  <View style={{marginTop: '8px', width: '100%'}} >
                  <ChatSearchBlock data={searchedChatGroup} title={'群组'} onListItemClick={this.handleChatGroupClick} onLoadMoreClick={this.handleLoadMoreClick.bind(this, 0)} />
                </View>: ''
              }
              {
                searchedUser.length !== 0?
                  <View style={{marginTop: '8px'}} >
                    <ChatSearchBlock title={'联系人'} onListItemClick={this.handleUserClick} onLoadMoreClick={this.handleLoadMoreClick.bind(this, 1)} />
                  </View>: ''
              }
              {
                searchedMessage.length !== 0?
                  '': ''
              }
              <View style={{marginTop: '8px'}} >
                <ChatSearchBlock title={'聊天记录'} onListItemClick={this.handleMessageClick} onLoadMoreClick={this.handleLoadMoreClick.bind(this, 2)} />
              </View>
            </ScrollView>
        }
      </View>
    );
  }
}
