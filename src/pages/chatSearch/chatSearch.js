import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {connect} from '@tarojs/redux';
import SimpleNavBar from "../../components/simpleNavBar/simpleNavBar";
import SearchBar from "../../components/searchBar/searchBar";

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


  handleKeywordSearch = (value) => {
    console.log(value)
  };

  render() {
    return (
      <View className='container'>
        <View>
          <SimpleNavBar title={'通讯'} />
          <SearchBar onKeywordSearch={this.handleKeywordSearch}/>
        </View>
        <ScrollView scrollY className='flex-1'>

        </ScrollView>
      </View>
    );
  }
}
