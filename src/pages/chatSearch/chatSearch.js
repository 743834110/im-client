import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import SearchBar from "../../components/searchBar/searchBar";
import ChatHint from "../../components/chatHint/chatHint";

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

/**
 *
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
    this.setState({
      isHide: true
    })
  };

  render() {
    let {isHide} = this.state;

    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'通讯'} />
          <SearchBar onKeywordSearch={this.handleKeywordSearch} onFocus={this.handleSearchBarFocus} />
        </View>
        <ChatHint />
        <ScrollView scrollY className='flex-1'>

        </ScrollView>
      </View>
    );
  }
}
