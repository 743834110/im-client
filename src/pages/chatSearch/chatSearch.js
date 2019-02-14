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

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

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
                  <View style={{marginTop: '8px'}} >
                  <ChatSearchBlock data={searchedChatGroup} title={'群组'} />
                </View>: ''
              }
              {
                searchedUser.length !== 0?
                  <View style={{marginTop: '8px'}} >
                    <ChatSearchBlock title={'联系人'} />
                  </View>: ''
              }
              {
                searchedMessage.length !== 0?
                  '': ''
              }
              <View style={{marginTop: '8px'}} >
                <ChatSearchBlock title={'聊天记录'} />
              </View>
            </ScrollView>
        }
      </View>
    );
  }
}
