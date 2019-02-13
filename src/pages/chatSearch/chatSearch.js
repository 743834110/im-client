import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import SearchBar from "../../components/searchBar/searchBar";
import ChatHint from "../../components/chatHint/chatHint";
import ChatSearchBlock from "../../components/chatSearchBlock/chatSearchBlock";

const mapStateToProps = (state) => ({
  state
});

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

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'通讯'} />
          <SearchBar onKeywordSearch={this.handleKeywordSearch} onBlur={this.handleSearchBarBlur} onFocus={this.handleSearchBarFocus} />
        </View>
        {
          !isHide? <View style={{marginTop: '8px'}}><ChatHint /></View>:
            <ScrollView scrollY className='flex-1'>
              <View style={{marginTop: '8px', width:'100%'}} >
                <ChatSearchBlock title={'群组'} />
              </View>
              <View style={{marginTop: '8px'}} >
                <ChatSearchBlock title={'联系人'} />
              </View>
              <View style={{marginTop: '8px'}} >
                <ChatSearchBlock title={'聊天记录'} />
              </View>
            </ScrollView>
        }
      </View>
    );
  }
}
